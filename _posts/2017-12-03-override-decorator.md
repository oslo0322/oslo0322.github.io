---
layout: post
title: Using another decorator inherit the decorator in python.
author: oslo0322
---

最近碰到一個有趣的問題，導致想要做一個很奇怪的事情，想要在用一個 Decorator 去繼承另一個 Decorator，並加上一些東西。

# 起因

最近在寫的 `Unit test` 需要 Freeze time，例如我想要每次在 `datetime.now()` 的時候都是回傳一樣的時間。

之前用一個 lib 叫做 [Freezegun](https://github.com/spulec/freezegun) 他可以利用 `decorator` 或 `contextmanager` 的方法去使用，非常的方便。

但是，在跑跟資料庫相關的 test cases 的時候發現了一個奇怪的錯誤。

> sqlalchemy.exc.ProgrammingError: (mysql.connector.errors.ProgrammingError) Failed processing pyformat-parameters; Python 'fakedate' cannot be converted to a MySQL type [SQL: 'SELECT kpi.time, kpi.level, kpi.ninety_fill \nFROM kpi \nWHERE kpi.time >= %(time_1)s AND kpi.time <= %(time_2)s AND kpi.level = %(level_1)s AND kpi.ship_mode = %(ship_mode_1)s'] [parameters: {'time_1': FakeDate(2017, 7, 1), 'ship_mode_1': 'all', 'level_1': 'p', 'time_2': FakeDate(2017, 7, 31)}]

查看了一下MySQL lib原始碼內實作時間轉換的程式

``` python
class MySQLConverter(MySQLConverterBase):
    ...(省略)...
    def to_mysql(self, value):
        """Convert Python data type to MySQL"""
        type_name = value.__class__.__name__.lower()
        try:
            return getattr(self, "_{0}_to_mysql".format(type_name))(value)
        except AttributeError:
            raise TypeError("Python '{0}' cannot be converted to a "
                            "MySQL type".format(type_name))
    ...(省略)...
    def _datetime_to_mysql(self, value):
        """
        Converts a datetime instance to a string suitable for MySQL.
        The returned string has format: %Y-%m-%d %H:%M:%S[.%f]

        If the instance isn't a datetime.datetime type, it return None.

        Returns a bytes.
        """
        if value.microsecond:
            fmt = '{0:d}-{1:02d}-{2:02d} {3:02d}:{4:02d}:{5:02d}.{6:06d}'
            return fmt.format(
                value.year, value.month, value.day,
                value.hour, value.minute, value.second,
                value.microsecond).encode('ascii')

        fmt = '{0:d}-{1:02d}-{2:02d} {3:02d}:{4:02d}:{5:02d}'
        return fmt.format(
            value.year, value.month, value.day,
            value.hour, value.minute, value.second).encode('ascii')

    def _date_to_mysql(self, value):
        """
        Converts a date instance to a string suitable for MySQL.
        The returned string has format: %Y-%m-%d

        If the instance isn't a datetime.date type, it return None.

        Returns a bytes.
        """
        return '{0:d}-{1:02d}-{2:02d}'.format(value.year, value.month,
                                              value.day).encode('ascii')
```

發現轉換的實作方式是把 object 的 class name 轉成相對應的 method

``` python
type_name = value.__class__.__name__.lower()
try:
    return getattr(self, "_{0}_to_mysql".format(type_name))(value)
```

而當我們使用 `Freezegun` 的時候，他會重新把 datetime 的 object 變成 FakeDate/FakeDatetime，所以 class name 會跟相對應的 method 會對不起來(沒有 _fakedate_to_mysql 這個method)，因為此時 class name 變成了 FakeDate/FakeDatetime。

所以就會造成錯誤了。

# 解法

其實知道原因之後解法還蠻簡單的。

1. 換 lib 。

2. 掛完 decorator 之後就把 FakeDate/FakeDatetime 的 class name 改成 date/datetime。

我選擇 `2.` ，因為換了 lib 說不定又會碰到其他坑。

所以程式改起來會像是

``` python
class MyTestCases(unittest):

    @freeze_time("2017-12-03")
    def test_case_1(self):
        datetime.now().__class__.__name__ = "datetime"
        datetime.now().date().__class__.__name__ = "date"
        do_test_here()
```

但是這樣還有一個問題，就是你每個會查詢 MySQL 的 test case 都要加上這兩行，實在有夠麻煩。

所以衍伸出了像是用另一個decorator去繼承decorator的想法(從 class 繼承的概念衍伸出來的)。

實作出來會像是下面這樣

``` python
def hijack_freeze_time(*hijack_args, **hijack_kwargs):
    """
    Fixed MySQL Lib type converter's issue
    TypeError: Python 'fakedate' cannot be converted to a MySQL type
    """
    def outer(func):
        @freeze_time(*hijack_args, **hijack_kwargs)
        def wrapper(*args, **kwargs):
            datetime.now().__class__.__name__ = "datetime"
            datetime.now().date().__class__.__name__ = "date"
            return func(*args, **kwargs)
        return wrapper
    return outer
```


實際用起來就會像是

``` python
class MyTestCases(unittest):

    @hijack_freeze_time("2017-12-03")
    def test_case_1(self):
        do_test_here()
```

跟原本方式一樣，簡單多了(名字變了，更甚者，可以連名字都一樣，改 import 路徑就好)。
