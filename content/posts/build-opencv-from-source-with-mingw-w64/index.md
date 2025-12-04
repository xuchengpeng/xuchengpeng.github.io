---
title: "Build OpenCV From Source With mingw-w64"
date: 2025-12-04T12:47:17+08:00
categories: ["Computer Vision"]
tags: ["Computer Vision", "OpenCV", "Windows", "mingw-w64"]
summary: A guide to build OpenCV on Windows with mingw-w64 toolchains.
---

OpenCV (Open Source Computer Vision Library: http://opencv.org) is an open-source library that includes several hundreds of computer vision algorithms.

```bash
git clone --depth 1 --branch 4.12.0 https://github.com/opencv/opencv.git
cd opencv
mkdir build && cd build
cmake -G "MinGW Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=./install -DBUILD_TESTS=OFF -DBUILD_PERF_TESTS=OFF -DBUILD_EXAMPLES=OFF -DBUILD_opencv_apps=OFF -DBUILD_JAVA=OFF -DBUILD_FAT_JAVA_LIB=OFF -DBUILD_opencv_python2=OFF -DBUILD_opencv_python3=OFF -DWITH_LAPACK=OFF ..
make -j 8
make install
```
