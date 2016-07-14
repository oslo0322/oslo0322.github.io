---
layout: post
title: 數值分析名詞紀錄
author: oslo0322
---

# Story
最近發現，之前有些 google 過的東西，但是要再拿出來用的時候，突然忘記當初的關鍵字是下什麼了，又很緊急的要用，所以這次決定要把它記下來
(畢竟母語不是英文，常常會想不到對應的單字或者關鍵字)

## Consecutive
在數據分析很常用到的名詞，是來判斷 data 的連續性。

> 原理是一個都是數字的 array，然後 duplicate 一份，原本的數值是 +1，兩個 array 再相減，大於 1 的就是不連續了。

這點在 Numpy 上會很好作業，也只要一行就可以達成了

```
def consecutive(data, step_size=1):
    """
    :param data:
    :param int step_size: split size
    :rtype: np.array
    """
    return np.array(np.split(np.array(data), np.where(np.diff(data) != step_size)[0] + 1))
```

> - `np.diff(array)` 會幫你計算 array 內，前一個與後一個的差值，回傳的結果是差值的 array
> - `np.where(condition)` 內是條件，找出條件為 True 的地方
> - `np.split(array, split_index_list)` 為切開 data， 後面的參數是要切開的 index 的 list

## Rolling Window
一樣在數值分析上很常碰到的名詞

> 我一連串的 Array 我需要計算移動平均(moving average)，就會需要用到，通常可以用來預測一些 pattern

Example:

- `[1, 2, 3, 4, 5]` 的 array 想要變成 `[[1, 2], [2, 3], [3, 4], [4, 5]]`

```
##  特別注意：如果陣列小於 window 會出現問題。
def rolling_window(data_series, window):
    """
    :param np.array data_series:
    :param int window:
    :rtype: np.array
    """
    shape = data_series.shape[:-1] + (data_series.shape[-1] - window + 1, window)
    strides = data_series.strides + (data_series.strides[-1],)
    return np.lib.stride_tricks.as_strided(data_series, shape=shape, strides=strides)
```

 - `shape` 代表 array 的 (i, j)，此段主要是表示我切好後，array 應該是要長什麼模樣
 - `strides` 代表字符的 byte 的組數

```
>>> a = np.array([1, 3, 5, 7])
>>> a.strides
(8, )
>>> b = np.array([1, 3, 5, 7], [2, 2, 3, 4])
>>> b.strides
(32, 8)
```

> 記憶體儲存這組 a array 是 8 byte(int64, 4 byte -> int32), 當變成二維陣列的時候，記憶體要跳過 32個(8*4) byte來到達鄰近的下一個區塊

個人想像成是用來描述 記憶體區塊的數值，舉個例子(int64為例子)

each array have 3 elements

```
1D array shape (3,) strides (8, )
2D array shape (2, 3) strides (24, 8)
3D array shape (4, 2, 3) strides (48, 24, 8)
```

公式

```
1D array 8
2D array 8 * 3 shape(x, 3) = (24, 8)
3D array 8 * 3 * 2 shape(y, 2, 3) = (48, 24, 8)
```

想成數學式子算是我的另一種見解吧XD


  - `np.lib.stride_tricks.as_strided` 則是將其重組

rolling_window我們預期想要的結果是將結果多一個維度，以一維陣列來說

```
>>> a = np.array([1,2,3,4])
>>> rolling_window(a, 2)  #  兩個元素為一組來切
[[1,2], [2,3], [3,4]]   #  預期結果
```

所以

- 第一行，表示我想要將一維 `(4, )` 轉成 `(3, 2)`
- 第二行，表示我要將一維 byte `(8, )` 轉成 `(8, 8)`

有沒有好奇，為啥不是 `(16, 8)`

是因為原本只有 4 個數值，最後要變成 6 個數值，如果是 (16, 8) 組的話會變成

```
Out[66]:
array([[         1,          2],
       [         3,          4],
       [4459105896, 4459105896]])
```

就會變成 `(8, )` 組，會變成 reshape 直接對半切開，少的用 int64 最大值補上

而 `(8, 8)` 組，則會 shift 一組 byte 而達到 rolling_window 的目的。

> 這裡相當的抽象，用文字可能很難打，一開始建議以一維配上少量的元素來試試看在程式碼內玩，或許會比較好理解。


Reference:
 [numpy.ndarray.strides](http://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.strides.html)
