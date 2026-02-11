---
title: "Arch Linux 中从源码编译 Emacs"
date: 2026-02-09T12:22:02+08:00
categories: ["Emacs"]
tags: ["Emacs", "Linux", "Arch"]
---

这里介绍在 Arch Linux 环境中从源码编译安装 Emacs 的经验。
<!--more-->

首先，安装编译前的依赖包。

```bash
sudo pacman -Syu --needed base-devel libgccjit gnutls gtk3 giflib libjpeg-turbo libpng libtiff libwebp libxpm libsm harfbuzz libotf xcb-util libxcb libxi libxml2 sqlite3 tree-sitter
```

然后，下载 Emacs 源码进行编译。

```bash
git clone --depth 1 https://github.com/emacsmirror/emacs.git
cd emacs
./autogen.sh
./configure --prefix=/usr/local/emacs --with-native-compilation=aot --with-pgtk --with-tree-sitter --without-compress-install
make -j 4
sudo make install
```

{{< alert >}}
🔵 如果配置了 [archlinuxcn](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/) 软件仓库，可以直接安装现成的，每天都会更新。
```bash
sudo pacman -S emacs-native-comp-pgtk-git
```
{{< /alert >}}
