---
layout: single
title: Bash Script 的一些簡單範例
author: oslo0322
toc: true
toc_label: "Unique Title"
toc_icon: "heart"
---

Bash Script 是 Unix 系統內最好也最實用的內建語言，常常有些意想不到的 function

## grep + awk
Example : `ls -al`

```
-rw-r--r--   1 oslo  staff   327 Jun  7 23:44 404.md
-rw-r--r--   1 oslo  staff     1 Jun  7 23:44 CNAME
-rw-r--r--   1 oslo  staff  1077 Jun  7 23:44 LICENSE
-rw-r--r--   1 oslo  staff  7939 Jun  7 23:44 README.md
-rw-r--r--   1 oslo  staff  2509 Jun  7 23:53 _config.yml
drwxr-xr-x   6 oslo  staff   204 Jun  7 23:44 _includes
drwxr-xr-x   5 oslo  staff   170 Jun  7 23:44 _layouts
drwxr-xr-x   6 oslo  staff   204 Jun  8 00:10 _posts
drwxr-xr-x   6 oslo  staff   204 Jun  7 23:44 _sass
drwxr-xr-x  14 oslo  staff   476 Jun  8 00:10 _site
```

如果說我想要找某些字串，例如 `drwxr-xr-x`，可以利用 `grep`

Example : `ls -al | grep "drwxr"`

```
drwxr-xr-x   6 oslo  staff   204 Jun  7 23:44 _includes
drwxr-xr-x   5 oslo  staff   170 Jun  7 23:44 _layouts
drwxr-xr-x   6 oslo  staff   204 Jun  8 00:10 _posts
drwxr-xr-x   6 oslo  staff   204 Jun  7 23:44 _sass
drwxr-xr-x  14 oslo  staff   476 Jun  8 00:10 _site
```

若我這時候還想要，某幾欄顯示的東西，例如第三欄這個 file 的 owner，就可以利用 `awk`

Example : `ls -al | grep "drwxr" | awk '{print $2}'`

```
oslo
oslo
oslo
oslo
oslo
```

---

## if else

判斷式，判斷是有分一行還是多行

一行就是在

* `&&` 之前為條件
* `&&` 和 `||` 之間，是成立的時候要做啥
* `||` 之後，是不成立的時候要做啥

Example:

```
[[ $(ls -al | grep "oslo") = "" ]] && echo "not found" || echo "found it"
```

多行的範例

> 如果怕一行太多的話，可以最後面使用跳脫字元 `\`

```
VARIABLE=$(ls -al | grep "oslo");
if [[ "$VARIABLE" == "" ]];
    then
        echo "not found"
    else
        echo "found it"
fi

```

[參考](http://stackoverflow.com/questions/13781216/bash-meaning-of-too-many-arguments-error-from-if-square-brackets)

## find

find 是我覺得真的非常好用的功能，可以找整個資料夾下的所有特定檔案，真的超方便的

```
find . -type f -name "*.png"
```

* `.` 代表當前目錄
* `-type f` 搜尋的類型是檔案
* `-name "*.png"` 搜尋副檔名是 png

> 如果要刪掉檔案可以加上 -delete

最後提醒大家，如果想看說明文件的話可以用

```
man <你要的內建指令>
```

Example:

```
man ls
```

> 離開的話按 q 即可
