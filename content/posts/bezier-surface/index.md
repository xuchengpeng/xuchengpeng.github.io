---
title: "贝塞尔曲面"
date: 2026-02-05T08:46:01+08:00
categories: ["Computer Vision"]
tags: ["Computer Vision"]
showMath: true
---

贝塞尔曲面是[贝塞尔曲线](../bezier-curve/)向二维参数空间的扩展，通常通过两个方向的张量积（Tensor Product）定义。
<!--more-->

## 基础公式（累加形式）
给定一个 $(n+1) \times (m+1)$ 的控制点网格 $P_{i,j}$，曲面 $S(u, v)$ 定义为：
$$S(u, v) = \sum_{i=0}^{n} \sum_{j=0}^{m} B_{i,n}(u) B_{j,m}(v) P_{i,j}$$
其中：
*   $u, v \in [0, 1]$ 是参数。
*   $B_{i,n}(u)$ 和 $B_{j,m}(v)$ 是伯恩斯坦多项式。

## 矩阵展开形式
为了便于计算，通常将曲面公式展开为矩阵乘法形式：
$$S(u, v) = \mathbf{U}^T \mathbf{M}_n^T \mathbf{P} \mathbf{M}_m \mathbf{V}$$

矩阵分量说明：
*   **$\mathbf{U}$**: $u$ 的幂基向量 $[1, u, u^2, \dots, u^n]^T$。
*   **$\mathbf{V}$**: $v$ 的幂基向量 $[1, v, v^2, \dots, v^m]^T$。
*   **$\mathbf{M}_n, \mathbf{M}_m$**: 分别为 $n$ 阶和 $m$ 阶的 **Bézier 基矩阵**（即[前面推导过的上三角矩阵](../bezier-curve/)）。
*   **$\mathbf{P}$**: 控制点矩阵，每一个元素 $P_{i,j}$ 通常是一个三维坐标 $(x, y, z)$。

## 代数展开（幂基形式）
如果将伯恩斯坦多项式直接展开并代入，曲面可以表示为关于 $u$ 和 $v$ 的多项式：
$$S(u, v) = \sum_{k=0}^{n} \sum_{l=0}^{m} A_{k,l} u^k v^l$$
其中系数矩阵 $\mathbf{A}$ 的计算公式为：
$$\mathbf{A} = \mathbf{M}_n^T \mathbf{P} \mathbf{M}_m$$
在这个公式中：
*   $A_{k,l}$ 是 $u^k v^l$ 项对应的系数（同样是 3D 向量）。
*   一旦计算出 $\mathbf{A}$，对于任何 $(u, v)$，只需进行简单的幂次累加即可求点，这在实时渲染中效率很高。

## 总结
*   **物理意义**：曲面是由 $u$ 方向的贝塞尔曲线在 $v$ 方向扫掠而成的。
*   **计算关键**：先计算两个方向的基矩阵 $M$，然后通过矩阵乘法 $\mathbf{M}^T \mathbf{P} \mathbf{M}$ 预处理出系数，最后带入参数 $u, v$。
