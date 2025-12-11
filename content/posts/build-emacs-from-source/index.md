---
title: "Build Emacs From Source"
date: "2024-03-08"
categories: ["Emacs"]
tags: ["Emacs", "Linux", "WSL"]
summary: A guide to build emacs from source on Linux.
---

Windows 11 features [built-in support for running Linux GUI applications](https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps). Emacs 29 has became a real GTK application, gone with the blurry fonts problem.

## Install Essential Packages

Firstly, install essential packages in WSL2 Ubuntu 24.04.
Native compilation support is enabled by default with Emacs 30, install `libgccjit0` and `libgccjit-xx-dev` to build this feature.

```shell
apt-get update
apt-get install build-essential libgtk-3-dev libgnutls28-dev libtiff5-dev libgif-dev libjpeg-dev libpng-dev libxpm-dev libncurses-dev texinfo sqlite3 libsqlite3-dev libjansson4 libjansson-dev librsvg2-dev libxml2-dev autoconf
apt-get install libgccjit0 libgccjit-13-dev
```

## Tree-sitter Support

And in Emacs 29, tree-sitter support is built-in. Now build tree-sitter from source code, tree-sitter library will be installed into `/usr/local/lib`.

```shell
git clone https://github.com/tree-sitter/tree-sitter.git
cd tree-sitter
git checkout v0.25.10
make
make install
export LD_LIBRARY_PATH=/usr/local/lib/
```

## Install Emacs

Now build emacs with pgtk and tree-sitter.

```shell
git clone https://git.savannah.gnu.org/git/emacs.git
cd emacs
./autogen.sh
./configure --prefix=/usr/local/emacs --with-native-compilation=aot --with-pgtk --with-tree-sitter --without-compress-install --without-pop
make -j 8
make install
```

## Install libvterm

Build [libvterm](https://www.leonerd.org.uk/code/libvterm/) if you need to use [vterm](https://github.com/akermu/emacs-libvterm) on Linux.

```shell
tar -zxf libvterm-0.3.3.tar.gz
cd libvterm-0.3.3
make
make install
```

## FAQs

When run emacs with WSL Ubuntu 24.04, [Ubuntu 24.04 Wayland falling back to X11](https://github.com/microsoft/wslg/issues/1244).

Due to a bug of systemd fixed in 24.04, you must do :
```shell
ln -sf  /mnt/wslg/runtime-dir/wayland-* $XDG_RUNTIME_DIR/
```

Or use an autostart conf: https://github.com/viruscamp/wslg-links
