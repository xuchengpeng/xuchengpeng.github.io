---
title: "Debian 安装 Google Chrome"
date: 2026-02-06T09:25:02+08:00
categories: ["Linux"]
tags: ["Linux", "Debian"]
---

在 Debian 系列的 Linux 发行版如 Ubuntu, Debian, Kali 等安装 Google Chrome 的方法如下。
<!--more-->

首先下载安装包，并通过命令执行安装，会自动安装依赖。

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
```

安装完 Chrome 时，会自动将 Chrome 仓库添加到包管理器，使用以下命令可以进行 Chrome 更新。

```bash
sudo apt install google-chrome-stable
```

如果想要卸载 Chrome 则执行以下命令。

```bash
sudo apt purge google-chrome-stable
```
