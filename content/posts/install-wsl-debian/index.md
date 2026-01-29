---
title: "Install WSL Debian"
date: 2026-01-28T16:44:01+08:00
categories: ["Linux"]
tags: ["Linux", "WSL", "Debian"]
---

官方的WSL分发版中，Debian的版本已经更新到13（代号trixie），大量的软件包得到了更新，可以长期稳定使用。
<!--more-->

安装Debian分发版到指定的位置：`wsl --install Debian --location D:\WSL\Debian --name Debian` 。

使用命令 `wsl -d Debian --cd ~` 启动，首次启动时需要创建新的用户；如果后续需要默认使用 `root` 用户登录，则在 `/etc/wsl.conf` 中添加以下内容：

```bash
[user]
default=root
```

默认情况下，WSL可以调用运行Windows已安装的软件，并将Windows的PATH追加到Debian中，可以添加以下配置禁用：

```bash
[interop]
enabled=false
appendWindowsPath=false
```

Debian官方为HTTP源，如果要使用HTTPS源，需要先安装 `apt install apt-transport-https ca-certificates` ，然后修改 `/etc/apt/sources.list` 使用HTTPS源。

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free non-free-firmware
```

上面是传统格式的修改方法，如果是DEB822格式，则修改 `/etc/apt/sources.list.d/debian.sources` 文件内容为：

```bash
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.tuna.tsinghua.edu.cn/debian
# Suites: trixie trixie-updates trixie-backports
# Components: main contrib non-free non-free-firmware
# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

# Types: deb-src
# URIs: https://mirrors.tuna.tsinghua.edu.cn/debian-security
# Suites: trixie-security
# Components: main contrib non-free non-free-firmware
# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

最后，就可以更新和安装新的软件包了：

```bash
apt update
apt upgrade
apt dist-upgrade
```
