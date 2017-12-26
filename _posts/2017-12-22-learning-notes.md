---
layout: single
title: Learning Notes.
author: oslo0322
toc: true
toc_icon: "heart"
---
這次想寫一下[上一篇]中查到的東西。

## Copy on Write
Copy on Write 是一種節省資源的做法，當你需要複製(duplicate)一個物件的時候，如果還沒進行修改(Write)的時候，會指向同一個記憶體空間，當需要修改的時候才進行真正的copy.

[Wiki上的Sample] 是個蠻不錯的例子
```
std::string x("Hello");

std::string y = x;  // x and y use the same buffer

y += ", World!";    // now y uses a different buffer
                    // x still uses the same old buffer
```

[上一篇]: /interview-questions
[Wiki上的Sample]: https://en.wikipedia.org/wiki/Copy-on-write

## Pass by Value/Reference
這也是個常見的面試題目，[這裏] 解釋得很好，我覺得先用個例子可能會比較好懂。

假設現在我要分享給你一個網頁的內容：

如果是 Pass by Reference

> 我給你網址，你會跟我看到一樣的內容，如果我變更了內容，你也會看到變化後的內容，如果我把網頁刪除了，我們兩個就都看不到了。

如果是 Pass by Value

> 我給你網址，你把內容整個複製(Copy/Duplicat)下來，如果我變更了內容，你還是舊的，如果我把網頁刪除了，你的依然存在。

[這裏]: https://stackoverflow.com/questions/373419/whats-the-difference-between-passing-by-reference-vs-passing-by-value

## [Python] Late Binding

## [Python] Duck Typing

## [Python] Namedtuple

## [Python] List comprehension

## [Python] Chaining phenomenon
What 's the answer when execute (1 == 2 != 3)?
[Here] https://stackoverflow.com/questions/47900237/why-does-1-2-3-evaluate-to-false-in-python
[Here]: https://docs.python.org/3/reference/expressions.html#comparisons