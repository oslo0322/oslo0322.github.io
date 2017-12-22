---
layout: single
title: AWS 的 ELB 與 Nginx 的愛恨糾葛
author: oslo0322
---

### 當AWS ELB 碰到 Nginx，剛開始總是那麼地美好，但時間久了，總是會有些不是盡善盡美的地方...

* ELB
    * 我們先來談談 ELB 的 IP 機制，之所以 ELB 給你 DNS (註1) 是因為他每過數個小時之後會更換 IP，而且一個 DNS ，至少會有兩個以上的 IP，就是這樣才會使用好用的 DNS (DNS可以幹嘛？有空的話我再發文介紹吧～)

    > 這種機制不管是在 internal 或者 public ELB 上都是一樣的唷

* Nginx
    * Nginx 在使用 pass_proxy，如果後面直接給予一個 DNS name 的話，他會先去 Query IP，然後把它儲存起來，而儲存的期限為...一萬年(其實是重新啟動就會更新了)，鑽石恆久遠，IP永流傳，不會自動地更新

---
聰明的客官們發現了這兩者的愛恨糾葛了嗎？

> Nginx 當你使用 pass_proxy 的時候，如果你後面直接使用 ELB 給你的 DNS (不管你後面有沒有把 DNS 做改寫)，過了數小時之後，你會發現很多 request 會開始轉發失敗而導致 502，因為 ELB 的 IP 變了...，不更新就無法轉送了

> 舉個有趣的例子，Nginx 好比一個木訥男，AWS ELB 好比一個時尚女人，木訥男要到時尚女的電話就死背著不忘，但時尚女三天兩頭就換個電話號碼，木訥男，大概也只有前幾天能連絡到時尚女吧(煙...  


解法其實蠻簡單的，將轉向的網址設成變數，這樣每次 Nginx(木訥男) 的 [Cache 只會儲存 5 分鐘](http://serverfault.com/questions/240476/how-to-force-nginx-to-resolve-dns-of-a-dynamic-hostname-everytime-when-doing-p)(變成記憶力好比金魚的健忘男(誤..)

```
resolver 10.0.0.0+2/16 # 可以參考 AWS DNS (註2);
set $upstream_endpoint http://xxxx.elb.amazonaws.com;
location / {
    proxy_pass $upstream_endpoint;
}
```

Nginx pass_roxy 裡面有提到

```
A server name, its port and the passed URI can also be specified using variables:

proxy_pass http://$host$uri;
or even like this:

proxy_pass $request;
In this case, the server name is searched among the described server groups, and, if not found, is determined using a resolver.
```

註1. [Domain Name System](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)

註2. [AWS DNS](http://docs.aws.amazon.com/zh_cn/AmazonVPC/latest/UserGuide/VPC_DHCP_Options.html#AmazonDNS)

參考 http://tenzer.dk/nginx-with-dynamic-upstreams/
