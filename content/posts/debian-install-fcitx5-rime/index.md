---
title: "Debian 安装 fcitx5-rime 输入法"
date: 2026-02-06T14:31:13+08:00
categories: ["Linux"]
tags: ["Linux", "Debian", "RIME"]
---

在 Windows 或 WSL Debian 中都是通过小狼毫和 emacs-rime 来使用 RIME 输入法的，笔记本电脑的 Debian 13 KDE 桌面环境中，就使用当前很流行的 fcitx5-rime 输入法。
<!--more-->

首先通过以下命令进行安装：

```bash
sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-rime rime-data-double-pinyin kde-config-fcitx5
```

fcitx5-rime 的输入法配置文件目录为 `$HOME/.local/share/fcitx5/rime`，这里面存放自定义的输入方案配置。

打开系统虚拟键盘设置，选择 fcitx5 。

打开 fcitx5 配置，添加 RIME 到当前输入法中，全局配置中可以设置切换中英文输入法的快捷键，附件组件中还可以选择不同的主题。

重新启动，就可以使用 RIME 输入法了，经过测试终端、Emacs、 Chrome中都可以正常使用。
