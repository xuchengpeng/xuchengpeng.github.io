---
title: "刚体变换"
date: "2024-09-10"
categories: ["Computer Science"]
tags: ["Computer Vision"]
summary: 刚体变换的矩阵表示，以及逆变换的计算方法。
showMath: true
---

三维空间坐标的刚体变换可分为旋转和平移两个步骤，用 \\(R_{A}^{B} = \begin{bmatrix} u_{x}  & v_{x} & w_{x} \newline u_{y}  & v_{y} & w_{y} \newline u_{z}  & v_{z} & w_{z} \end{bmatrix}\\) 表示旋转矩阵，用 \\(t_{A}^{B} = \begin{bmatrix} t_{x} \newline t_{y} \newline t_{z} \end{bmatrix}\\) 表示平移矩阵。

坐标系A到B刚体变换形式为：

$$\begin{bmatrix} x^{'} \newline y^{'} \newline z^{'} \end{bmatrix} = R_{A}^{B} \ast \begin{bmatrix} x \newline y \newline z \end{bmatrix} + t_{A}^{B}$$

用齐次变换矩阵 \\(T_{A}^{B}\\) 的表示形式为：

$$\begin{bmatrix} x_{'} \newline y_{'} \newline z_{'} \newline 1 \end{bmatrix} = T_{A}^{B} \ast \begin{bmatrix} x \newline y \newline z \newline 1 \end{bmatrix} = \begin{bmatrix} R_{A}^{B} & t_{A}^{B} \newline 0 & 1 \end{bmatrix} \ast \begin{bmatrix} x \newline y \newline z \newline 1 \end{bmatrix}$$

那么坐标系B到A的齐次变换矩阵就是求逆的过程。

旋转矩阵的逆等于其转置：

$$\left ( R_{A}^{B} \right ) ^ {-1} = \left ( R_{A}^{B} \right ) ^ T$$

于是：

$$
\begin{split}
\begin{aligned}
T_{B}^{A} &= \left ( T_{A}^{B} \right ) ^ {-1} \newline
&= \begin{bmatrix} R_{A}^{B} & t_{A}^{B} \newline 0 & 1 \end{bmatrix} ^ {-1} \newline
&= \left ( \begin{bmatrix} E & t_{A}^{B} \newline 0 & 1 \end{bmatrix} \ast \begin{bmatrix} R_{A}^{B} & 0 \newline 0 & 1 \end{bmatrix} \right ) ^ {-1} \newline
&= \begin{bmatrix} R_{A}^{B} & 0 \newline 0 & 1 \end{bmatrix} ^ {-1} \ast \begin{bmatrix} E & t_{A}^{B} \newline 0 & 1 \end{bmatrix} ^ {-1} \newline
&= \begin{bmatrix} \left ( R_{A}^{B} \right ) ^ {-1}  & 0 \newline 0 & 1 \end{bmatrix} \ast \begin{bmatrix} E & -t_{A}^{B} \newline 0 & 1 \end{bmatrix} \newline
&= \begin{bmatrix} \left ( R_{A}^{B} \right ) ^ {T}  & 0 \newline 0 & 1 \end{bmatrix} \ast \begin{bmatrix} E & -t_{A}^{B} \newline 0 & 1 \end{bmatrix} \newline
&= \begin{bmatrix} \left ( R_{A}^{B} \right ) ^ {T}  & -\left ( R_{A}^{B} \right ) ^ {T} t_{A}^{B} \newline 0 & 1 \end{bmatrix}
\end{aligned}
\end{split}
$$

在已知 \\(T_{A}^{B}\\) 和 \\(T_{B}^{C}\\) 时，可求解 \\(T_{A}^{C}\\) :

$$
\begin{split}
\begin{aligned}
T_{A}^{C} &= T_{B}^{C} \ast T_{A}^{B} \newline
&= \begin{bmatrix} R_{B}^{C} & t_{B}^{C} \newline 0 & 1 \end{bmatrix} \ast \begin{bmatrix} R_{A}^{B} & t_{A}^{B} \newline 0 & 1 \end{bmatrix} \newline
&= \begin{bmatrix} R_{B}^{C}R_{A}^{B} & R_{B}^{C}t_{A}^{B} + t_{B}^{C} \newline 0 & 1 \end{bmatrix}
\end{aligned}
\end{split}
$$
