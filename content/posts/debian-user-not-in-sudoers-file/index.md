---
title: "Debian 用户不在 sudoers 文件中"
date: 2026-02-06T09:47:15+08:00
categories: ["Linux"]
tags: ["Linux", "Debian"]
---

为解决 Debian 系统中 `user not in sudoers file` 错误，可以参考以下步骤。
<!--more-->

首先以 root 用户登录。

```bash
su -
```

打开 `/etc/sudoers` 文件，在 `root    ALL=(ALL:ALL) ALL` 行下添加当前用户的配置。

```bash
xxxx    ALL=(ALL:ALL) ALL
```

保存退出后，注销重新登录，通过以下命令检查是否有 root 权限。

```bash
sudo whoami
```
