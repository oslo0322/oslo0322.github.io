---
layout: post
title: 在 AWS Lambda python 執行帶有 C module 的 libs
author: oslo0322
---

AWS Lambda 是一個很好用(邪惡?!)的東西，很多東西都可以用 Lambda 串起來，來達成event trigger 的目的，然而有個小小的缺點就是，很難開發跟 debug ，所有執行的程式碼都放在 Lambda (可能實作上用docker?!)上。

如果你是用 Mac OSX 系統開發的話，在一般情形下，只要照 [AWS 官方文件](http://docs.aws.amazon.com/lambda/latest/dg/lambda-python-how-to-create-deployment-package.html)上建議的方法，包成zip，就可以執行了，但要用含有 C module 的 libs，像是 Matplotlib, Pandas, Numpy, Scipy 等等的，就會遇到意想不到的事情。

根據同事的解釋，雖然 Mac OSX 也算是 Unix 系統，但實際 compile C module 的方法還是有些微的不同，如果要在AWS Lambda 上執行上述的ｌibs，網路上很多文章都建議開一台 EC2 先打包好(建議是zip)再丟到 S3 上，這樣執行起來就沒什麼問題了。

> Tips：
>
> 如果想要 packaging/update 主要的程式的話，可以將上述包好的檔案(zip)檔案，下載回來再自行刪除，更新或者增加上去
