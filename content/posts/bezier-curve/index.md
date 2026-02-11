---
title: "贝塞尔曲线"
date: 2026-02-04T16:19:27+08:00
categories: ["Computer Vision"]
tags: ["Computer Vision"]
showMath: true
---

在数学的数值分析领域中，贝塞尔曲线是计算机图形学中相当重要的参数曲线。
<!--more-->

{{< columns >}}

- 
  {{< figure
    src="./bezier_curve_1.svg"
  >}}

- 
  {{< figure
    src="./bezier_curve_2.svg"
  >}}

{{< /columns >}}

{{< figure
  src="./bezier_curve_3.png"
>}}

n 阶贝塞尔曲线的一般表示形式为：

$$
B(t) = \sum_{i=0}^{n} P_i b_{i,n}(t), t \in [0, 1]
$$

其中 $b_{i,n}(t)$ 为 n 阶的伯恩斯坦多项式，$P_i$ 为控制点。

$$
\begin{split}
b_{i,n}(t) &= (1 - t)b_{i,n-1}(t) + tb_{i-1,n-1}(t) \newline
&= \binom{n}{i} t^i (1 - t)^{n - i} \newline
\binom{n}{i} &= \frac{n!}{i!(n - i)!}
\end{split}
$$

为了将其展开为关于 $t$ 的幂级数（即转换为幂基形式 $t^j$），我们需要对 $(1-t)^{n-i}$ 使用**二项式定理**展开。

1.  展开 $(1-t)^{n-i}$：
    
    根据二项式定理 $(a+b)^k = \sum_{j=0}^k \binom{k}{j} a^{k-j} b^j$，令 $a=1, b=-t, k=n-i$：
    $$(1-t)^{n-i} = \sum_{k=0}^{n-i} \binom{n-i}{k} 1^{n-i-k} (-t)^k = \sum_{k=0}^{n-i} \binom{n-i}{k} (-1)^k t^k$$

2.  代入原式：
    
    $$b_{i,n}(t) = \binom{n}{i} t^i \left[ \sum_{k=0}^{n-i} \binom{n-i}{k} (-1)^k t^k \right]$$

3.  合并 $t$ 的幂次：

    将 $t^i$ 乘进求和符号内，令 $j = i + k$（即 $k = j - i$）：
    $$b_{i,n}(t) = \sum_{j=i}^{n} \binom{n}{i} \binom{n-i}{j-i} (-1)^{j-i} t^j$$

最终展开公式：

$$
\begin{split}
b_{i,n}(t) &= \sum_{j=i}^{n} \left[ \binom{n}{i} \binom{n-i}{j-i} (-1)^{j-i} \right] t^j \newline
&= \sum_{j=i}^{n} M_{i,j} t^j \newline
M_{i,j} &= \begin{cases} \binom{n}{i} \binom{n-i}{j-i} (-1)^{j-i} & j \geq i \\ 0 & j < i \end{cases}
\end{split}
$$
