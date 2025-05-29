---
title: "3D Rotations"
date: 2025-05-29T09:58:26+08:00
categories: ["Computer Vision"]
tags: ["Computer Vision"]
showMath: true
---

A basic 3D rotation (also called elemental rotation) is a rotation about one of the axes of a coordinate system. The following three basic rotation matrices rotate vectors by an angle θ about the x-, y-, or z-axis, in three dimensions, using the [right-hand rule](https://en.wikipedia.org/wiki/Right-hand_rule)—which codifies their alternating signs.
<!--more-->

{{< figure
  src="angle-orientation-in-rotation-matrix-around-x-y-and-z.svg"
  alt="Angle-orientation-in-rotation-matrix-around-x-y-and-z"
  width=500
>}}

$$
\begin{split}
R_x(\theta) &= \begin{bmatrix} 1 & 0 & 0 \newline 0 & \cos\theta & -\sin\theta \newline 0 & \sin\theta & \cos\theta \end{bmatrix} \newline
R_y(\theta) &= \begin{bmatrix} \cos\theta & 0 & \sin\theta \newline 0 & 1 & 0 \newline -\sin\theta & 0 & \cos\theta \end{bmatrix} \newline
R_z(\theta) &= \begin{bmatrix} \cos\theta & -\sin\theta & 0 \newline \sin\theta & \cos\theta & 0 \newline 0 & 0 & 1 \end{bmatrix}
\end{split}
$$

Other 3D rotation matrices can be obtained from these three using matrix multiplication. For example, a rotation whose yaw, pitch and roll angles are \\(\alpha\\), \\(\beta\\) and \\(\gamma\\).

$$
\begin{split}
R &= R_z(\alpha)R_y(\beta)R_z(\gamma) \newline
&= \begin{bmatrix} \cos\alpha\cos\beta & \cos\alpha\sin\beta\sin\gamma - \sin\alpha\cos\gamma & \cos\alpha\sin\beta\cos\gamma + \sin\alpha\sin\gamma \newline
\sin\alpha\cos\beta & \sin\alpha\sin\beta\sin\gamma + \cos\alpha\cos\gamma & \sin\alpha\sin\beta\cos\gamma - \cos\alpha\sin\gamma \newline
-\sin\beta & \cos\beta\sin\gamma & \cos\beta\cos\gamma \end{bmatrix}
\end{split}
$$
