---
title: "Install WSL From Image"
date: 2025-11-19T09:03:49+08:00
categories: ["Linux"]
tags: ["Linux", "WSL"]
summary: You do not need access to the Microsoft Store to use this installation method and the images can be self-hosted on an internal network.
---

Ubuntu images for WSL can be downloaded directly from [releases.ubuntu.com](https://releases.ubuntu.com/).

To download Ubuntu 24.04 LTS (Noble Numbat), go to [releases.ubuntu.com/noble](https://releases.ubuntu.com/noble) and select the WSL image. The image has a `.wsl` extension.

Run `wsl --install --from-file ubuntu-24.04.3-wsl-amd64.wsl --location D:\WSL\Ubuntu-24.04\ --name Ubuntu-24.04` to install the image.
