---
layout: single
title: Flask form data vs non-utf8 issue.
author: oslo0322
toc: true
toc_icon: "heart"
---

最近在跟台灣系統廠商對接，需要處理一些中文字碼的問題(big5)，也順便得知什麼是`許功蓋`這個有趣的名字(?。

回歸正題，相信大家在 Python 2.7 上應該最討厭處理的就是 unicode 的問題了，每次處理起來都相當惱人。

這次的問題是這樣的，這個系統廠商在文件上擺明了說我就是會用 `encoding = Big5` 來打你們的 API。
雖然相重要的資料，像是 ID 等等的東西還是英文傳送，但是在 log request 的 payload 的時候還是會出現亂碼，甚至是exception。
(log request payload 是個在跟別人API對接的小技巧，可以拿來 replay)。

Exception就會讓人覺得很討厭，看了程式碼，猜測了大部分的問題，程式碼大約是這樣的。

``` python
import flask
xml_data = request.form.get("data")

print(xml_data)
```

但是後來不管是 `xml_data.decode("big5").encode("utf8")` 還是 `xml_data.decode("big5")` 等等排列組合都嘗試過了。
怎樣就是出現亂碼不然就是 crash，相當的討厭。

後來突然靈光一閃，想說來看看 `reuqest.form` 裡面是什麼樣子，一看不得了，原來 `request.form` 已經幫我們 `decode("utf8")` 好了。
難怪不管用了什麼排列組合都無效。

解法當然也很簡單了，直接拿出原來的 data 就好了，所以修正完畢之後的 code 會變成像是這樣子。

``` python
import flask
xml_data = request.data
xml_data.decode("big5")
print(xml_data)
```
