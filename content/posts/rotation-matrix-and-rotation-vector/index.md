---
title: "Rotation Matrix and Rotation Vector"
date: 2025-05-07T11:22:02+08:00
categories: ["Computer Vision"]
tags: ["Computer Vision"]
showMath: true
---

A rotation vector is a convenient and most compact representation of a rotation matrix (since any rotation matrix has just 3 degrees of freedom).
<!--more-->

罗德里格斯公式：

\\[
R = \cos(\theta)I + (1 - \cos(\theta))rr^T + \sin(\theta)r^\wedge
\\]

其中 \\( r = \begin{bmatrix} r_x \newline r_y \newline r_z \end{bmatrix} \\) 为旋转轴单位向量，\\(\theta\\) 为旋转角度，\\(I\\) 为3x3单位矩阵， \\( r^\wedge = \begin{bmatrix} 0 & -r_z & r_y \newline r_z & 0 & -r_x \newline -r_y & r_x & 0 \end{bmatrix} \\) 为反对称矩阵。由于旋转轴上的向量在旋转后不发生改变，因此 \\(Rr = r\\) 。

等式两边进行迹运算(NxN矩阵的迹指主对角线上各元素的和，标量的迹就是其本身，矩阵的迹等于其转置的迹)求解 \\(\theta\\)：

\\[
\begin{split}
tr(R) &= \cos(\theta) tr(I) + (1 - \cos(\theta)) tr(rr^T) + \sin(\theta) tr(r^\wedge) \newline
&= 3\cos(\theta) + (1 - \cos(\theta)) \newline
&= 1 + 2\cos(\theta) \newline
\theta &= \arccos(\frac{tr(R) - 1}{2})
\end{split}
\\]

反向变换公式如下，根据 \\(\theta\\) 和 \\(R\\) 求解旋转向量 \\(r\\)：

\\[
\sin(\theta) \begin{bmatrix} 0 & -r_z & r_y \newline r_z & 0 & -r_x \newline -r_y & r_x & 0 \end{bmatrix} = \frac{R - R^T}{2}
\\]
