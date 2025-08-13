---
title: "C++ Fold Expressions"
date: 2024-07-27T07:56:08+08:00
categories: ["Programming"]
tags: ["Programming", "C++"]
---

折叠表达式(Fold Expressions)是C++17标准引入的，引入折叠表达式的主要目的是计算某个值。
<!--more-->

这个值的特殊性在于：它与可变参有关，而不是与单独某个可变参有关。换句话说，所有的可变参都参与计算，才能求出该值。在可变参函数模板中，因为展开参数比较麻烦，如果要把传递进来的所有参数加在一起，可能要写很多代码，而通过折叠表达式，只需要一行代码就可以求出所有可变参的和。

```cpp
template<typename... T>
auto add_val(T... args)
{
    return (... + args);
}
```

在上面的例子中，return语句后面的括号中就是一个折叠表达式。

折叠表达式一般有4种格式，每种格式都是用圆括号括起。所谓左折就是参数从左边开始计算，右折就是参数从右边开始计算。

## 一元左折(Unary Left Fold)

格式：(… 运算符 一包参数)

计算方式：(((参数1 运算符 参数2) 运算符 参数3)… 运算符 参数N)

运算符指的是C++语言中的运算符，绝大部分运算符都可以用在这里。

## 一元右折(Unary Right Fold)

格式：(一包参数 运算符 …)

计算方式：(参数1 运算符 (… (参数N-1 运算符 参数N)))

```cpp
template<typename... T>
auto sub_val_left(T... args)
{
    return (... - args);
}

template<typename... T>
auto sub_val_right(T... args)
{
    return (args - ...);
}

cout << sub_val_left(10, 20, 30, 40) << endl;  // (((10-20)-30))-40=-80
cout << sub_val_right(10, 20, 30, 40) << endl;  // 10-(20-(30-40))=-20
```

## 二元左折(Binary Left Fold)

格式：(init 运算符 … 运算符 一包参数)

计算方式：(((init 运算符 参数1) 运算符 参数2)… 运算符 参数N)

## 二元右折(Binary Right Fold)

格式：(一包参数 运算符 … 运算符 init)

计算方式：(参数1 运算符 (… (参数N 运算符 init)))

```cpp
template<typename... T>
auto sub_val_left_b(T... args)
{
    return (200 - ... - args);
}

template<typename... T>
auto sub_val_right_b(T... args)
{
    return (args - ... - 200);
}

cout << sub_val_left_b(10, 20, 30, 40) << endl;  // (((200-10)-20)-30)-40=120
cout << sub_val_right_b(10, 20, 30, 40) << endl;  // 10-(20-(30-(40-200)))=200

template<typename... T>
void print_val_left_b(T... args)
{
    (cout << ... << args);
}
print_val_left_b(10, "abc", 30, "def");  // 10abc30def
```
