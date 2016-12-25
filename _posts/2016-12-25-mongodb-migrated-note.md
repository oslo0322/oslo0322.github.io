---
layout: post
title: Zero downtime migrate mongodb to a larger disk space
author: oslo0322
---

好久沒寫筆記了，趁這假日的空擋，來寫寫這次遭遇的事件

# 起因

這次事件，其實是因為公司的 MongoDB 的硬碟空間減少速度比預想中來得快(就商業來說是件好事！)
但對工程師來說就是個挑戰，因為出差回來，硬碟只剩下4％(估計剩下10天的容量)

一開始想法是砍資料，因為我們會將舊的資料放在 relation database上(又是另一個故事了)
原以為這樣能釋放 disk space (如果會就不會有這篇了。)
沒想到 MongoDB storage 的方式是，將資料一筆一筆堆疊在一起，最後合併成一個檔案直到這個檔案大小變成 `2G`，就會再開下一個檔案
可想而知，這樣，砍資料並不會將空間釋放。

舉例來說：

> 今天你是大盤商，要採收橘子、哈密瓜、西瓜，你將採收的水果分開箱子放，當你發現你收了好多箱之後，
車子可能快載不下了，想將每箱之間一些較小橘子拿出來丟掉，但你的卡車還是不會因為丟掉部分的橘子，而讓你放更多的箱子。

> 橘子、哈密瓜跟西瓜 代表資料的大小，卡車代表你的硬碟空間，箱子則是上述的 `2G` 限制。

解決辦法: 是類似以前的 `磁碟重組`，就是將橘子全部倒出來重新裝箱，但這工程可想而知，一定很複雜，而且會很耗時。

#### _既然不能節流，那就開源吧_

其實有很多方法可以增加硬碟空間

1. 趁半夜人少的時候爬起來停機，然後升級
- 缺點：需要停機、沒效率、降低工程師的快樂指數、沒挑戰性、很難自動化
- 優點：快速、省錢、無腦升級、比較不會出錯

2. 新開一群機器(cluster)，寫 sync 的程式
- 缺點：耗時、花錢且會有資料上 sync 的問題
- 優點：zero-downtime、半自動化

我們其實也遭遇過一樣的問題幾次，之前都是採用 `1.` 的方法，確實在幾小時內就搞定了
但回想當工程師的初衷，不就是要很帥氣，按一個鍵就可以自動升級，還讓客戶無感嗎？

於是，這次就採用了 `2.` 的方法(也很感謝公司能給這個時間，讓我嘗試這種方法。)

# 本文開始
既然要很帥氣的挑戰 `zero-downtime` ，事前功課必不能少。
自從來了幾個很厲害的同事(*1)之後，學到了 工欲善其事，必先 google 的心法
(時間再怎麼趕，都要做好最好及最壞打算的規劃)


### 現況
1. 我們 MongoDB 採用的是 `primary + 2 * slave` 的 `replica` 架構。 
2. 每日台灣時間早上八點 (`UTC+0`) 會將資料用 `mongodump` 成 `bson` 檔案備份到 `AWS S3`
3. 每小時用 `AWS CloudWatch Event bulit-in function` 做 `Snapshot` 
4. 資料容量約 2T

### 欲改善問題
1. 原本 VPC 架構有問題，想換成用 `CloudFormation` 程式化的 `infrastructure`
2. 原本是利用 `CIDR /32` IP binding 的方法來讓公司可以直連`(for debug)`，但這樣有時候沒設定好，導致連測試資料也一起上去
3. Production and Test data in the same place
4. Cost and performance ratio too low (簡單來說，C/P值過低)
5. Increase disk capacity

### Plan
1. 換程式化後的 `Infrastructure`
2. VPN
3. 增加一台測試的 MongoDB

其實蠻有趣的，印象中當我們開始架設 MongoDB的時候，是用 AWS MarketPlace 中的 template 架設。

當時 template 給的 EBS 有幾個選項 `IOPS 1000, 2000, 4000`(type io2)，容量自訂，當時我們資料不多，所以選了 500GB 以及 `IOPS 1000` 的選項。
後來經過幾次容量升級的 events，都沒有對 `IOPS` 做特別的留意，但這樣其實是相當不划算的。

> AWS 提供一個 `gp2` 的 SSD type，其 `IOPS` 為 `3 IOPS/GB`，在低於 1T 容量下，當有尖峰時刻的時候會 boost 到 `3000 IOPS`，超過 1T 後則固定數值，所以到 `3334GB` 後，`IOPS` 則固定為 `10000`

> `io2` 的好處是，當容量小的時候也可以固定 `IOPS`，但收費則硬碟容量以及 IOPS 兩個分開收(所以 貴！)

所以我們要升級容量的時候順便將 SSD type 換成 gp2，`IOPS` 明顯提升，還更便宜。

### 執行前實驗
其實我當初已經有將 `Infrastructure` 寫成 `CloudFormation` ，所以這段時間已經省下來了(之後也會開源這塊)，重點在 migrate data 這塊

我們最初想到跟查到文件這裡都是建議使用 `mongodump + mongorestore` 來做 `migration`，但在我們公司會有個問題

> 我們公司的客戶有時候會離線操作，資料傳送並非即時，所以萬一上傳時間在備份的時間之後，還原的時候，就不會還原到新的 db 內。

後來有想說利用 `mongooplog` 這塊，但這塊經實驗之後，發現會有很高的機會會把 `server shutdown`，所以並不採用

#### 最後還是靠寫程式，來將 sync 這段做好
 
### 執行
1. CloudFormation one click open(需要注意 AWS soft limit: EIP, EBS capacity 等限制)
2. migration(`mongodump`+`mongorestore`+`self sync script`)

雖然研究以及 migrate 的過程中，我們一直在跟時間競賽(絕對不是 那美克星剩一分鐘爆炸，還有兩個禮拜可以演！)但這次的極限挑戰的經驗值卻是增加頗快的
加上之前一些基礎建設的 refactor 也間接加速這次的過程。

很感謝公司的各位同事，在這段時間的 cover ，雖然最後結果上還是發現有一些小小的問題，但以 `zero-downtime` 的挑戰來說，卻是成功的！

*1: 高手等級人物 [John](https://github.com/johnlinvc)、[Sodas](https://github.com/sodastsai)
