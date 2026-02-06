---
title: "Debian 中从源码编译 Emacs"
date: 2026-02-06T16:58:58+08:00
categories: ["Emacs", "Linux"]
tags: ["Emacs", "Linux", "Debian"]
---

以下介绍在 Debian 13 KDE 桌面环境中从源码编译 Emacs 的经验。
<!--more-->

首先，安装编译前的依赖包。

```bash
sudo apt update
sudo apt install build-essential libgtk-3-dev libgnutls28-dev libtiff5-dev libgif-dev libjpeg-dev libpng-dev libxpm-dev libncurses-dev texinfo sqlite3 libsqlite3-dev libjansson4 libjansson-dev librsvg2-dev libxml2-dev liblcms2-dev libmagickwand-dev libmagickcore-dev libmagick++-dev autoconf
# 启用 native-compilation 需要安装 libgccgit
sudo apt install libgccjit0 libgccjit-14-dev
```

其次，从源码编译安装最新的 libtree-sitter 库，也可以从仓库直接安装 libtree-sitter-dev 。

```bash
git clone --depth 1 --branch v0.26.5 https://github.com/tree-sitter/tree-sitter.git
cd tree-sitter
make
sudo make install
sudo ldconfig
```

最后，下载 Emacs 源码进行编译。

```bash
git clone --depth 1 https://github.com/emacsmirror/emacs.git
cd emacs
./autogen.sh
./configure --prefix=/usr/local/emacs --with-native-compilation=aot --with-pgtk --with-tree-sitter --with-imagemagick --without-compress-install
make -j 4
sudo make install
```
