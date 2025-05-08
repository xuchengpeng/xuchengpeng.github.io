---
title: "C++ Variadic Function Templates"
date: 2024-07-27T08:02:38+08:00
categories: ["Programming"]
tags: ["Programming", "C++"]
---

可变参模板的英文为Variadic Templates，是C++11标准引入的，可变参模板允许模板定义中含有0到多个模板参数。
<!--more-->

```cpp
template <typename... T>
void myvtfunct(T... args)
{
    cout << sizeof...(args) << endl;
    cout << sizeof...(T) << endl;
}
```

typename后面的3个点代表参数包，然后才修饰T。T后面带了3个点，所以将T称为可变参类型，实际上其中包含了0到多个不同的类型（一包类型），args成为一包或一堆参数。

可变参函数模板的展开一般是用递归函数。

```cpp
template <typename T, typename... U>
void myvtfunct(T firstarg, U... otherargs)
{
    cout << firstarg << endl;
    myvtfunct(otherargs...);
}

void myvtfunct()
{
}
```

在C++17标准中，引入了编译期间if语句，在if后面又增加了一个constexpr关键字，这个关键字代表常量或编译期求值。通过编译期间if语句，可以把上述递归终止函数省略。

```cpp
template <typename T, typename... U>
void myvtfunct(T firstarg, U... otherargs)
{
    cout << firstarg << endl;
    if constexpr (sizeof...(otherargs) > 0) {
        myvtfunct(otherargs...);
    }
}
```

可变参函数模板也可以重载。

```cpp
template <typename... T>
void myfunc(T... arg)
{
}

template <typename... T>
void myfunc(T*... arg)
{
}

void myfunc(int arg)
{
}
```

一般来讲，当调用一个普通函数和调用实例化后的函数模板都合适的时候，编译器会优先选择普通函数。
