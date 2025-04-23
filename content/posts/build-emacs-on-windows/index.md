---
title: "Build Emacs On Windows"
date: "2024-04-01"
categories: ["Emacs"]
tags: ["Emacs", "Windows", "MSYS2"]
summary: We can build Emacs with MSYS2 and MinGW-W64 on Windows.
---

On Windows, we can build GNU Emacs with [MSYS2](https://www.msys2.org/) and [MinGW-w64](https://www.mingw-w64.org/).

First, install some necessary packages. The packages include the base developer tools, the compiler toolchain, several image libraries, and XML library, the GnuTLS library, zlib for decompressing text, HarfBuzz for use as the shaping engine, libgccjit for native-compilation support, SQLite3 for accessing SQL databases, and the tree-sitter library used by some major modes. You can select only part of the libraries if you don't need them all.

```shell
pacman --noconfirm -S --needed \
    base-devel \
    mingw-w64-x86_64-toolchain \
    mingw-w64-x86_64-xpm-nox \
    mingw-w64-x86_64-gmp \
    mingw-w64-x86_64-gnutls \
    mingw-w64-x86_64-libtiff \
    mingw-w64-x86_64-giflib \
    mingw-w64-x86_64-libpng \
    mingw-w64-x86_64-libjpeg-turbo \
    mingw-w64-x86_64-librsvg \
    mingw-w64-x86_64-libwebp \
    mingw-w64-x86_64-lcms2 \
    mingw-w64-x86_64-libxml2 \
    mingw-w64-x86_64-zlib \
    mingw-w64-x86_64-harfbuzz \
    mingw-w64-x86_64-libgccjit \
    mingw-w64-x86_64-sqlite3 \
    mingw-w64-x86_64-libtree-sitter
```

Then, use git to clone the repository, we also need autotools to generate the configure script.

```shell
pacman --noconfirm -S git autotools
git config --global core.autocrlf false
```

You now have a complete build environment for Emacs.

```shell
mkdir /c/emacs
cd /c/emacs
git clone --depth=1 https://git.savannah.gnu.org/git/emacs.git emacs-master
install_dir=/c/programs/emacs
cd /c/emacs/emacs-master
./autogen.sh
./configure --prefix=${install_dir} --with-native-compilation=aot --with-tree-sitter --without-dbus --without-pop
NPROC=$(nproc)
make -j${NPROC}
make install
```

After building and installing, we need to copy necessary DLLs into Emacs's bin directory if we run Emacs outside the mingw64 shell.

```shell
cp -v /mingw64/bin/libbrotlicommon.dll ${install_dir}/bin
cp -v /mingw64/bin/libbrotlidec.dll ${install_dir}/bin
cp -v /mingw64/bin/libbrotlienc.dll ${install_dir}/bin
cp -v /mingw64/bin/libbz*.dll ${install_dir}/bin
cp -v /mingw64/bin/libcairo-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libdatrie-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libdeflate.dll ${install_dir}/bin
cp -v /mingw64/bin/libexpat-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libffi-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libfontconfig-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libfreetype-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libfribidi-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgcc_s_seh-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgdk_pixbuf-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgif-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgio-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libglib-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgmodule-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgmp-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgnutls-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgobject-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libgraphite*.dll ${install_dir}/bin
cp -v /mingw64/bin/libharfbuzz-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libhogweed-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libiconv-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libidn*.dll ${install_dir}/bin
cp -v /mingw64/bin/libintl-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libisl-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libjbig-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libjpeg-*.dll ${install_dir}/bin
cp -v /mingw64/bin/liblcms*.dll ${install_dir}/bin
cp -v /mingw64/bin/libLerc.dll ${install_dir}/bin
cp -v /mingw64/bin/liblzma-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libmpc-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libmpfr-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libnettle-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libp11-kit-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpango-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpangocairo-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpangoft*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpangowin32-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpcre*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpixman-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libpng*.dll ${install_dir}/bin
cp -v /mingw64/bin/librsvg*.dll ${install_dir}/bin
cp -v /mingw64/bin/libsharpyuv-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libsqlite*.dll ${install_dir}/bin
cp -v /mingw64/bin/libstdc++-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libtasn1-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libthai-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libtiff-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libtree-sitter-*.dll ${install_dir}/bin/libtree-sitter.dll
cp -v /mingw64/bin/libunistring-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libwebp-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libwebpdemux-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libwinpthread-*.dll ${install_dir}/bin
cp -v /mingw64/bin/libxml*.dll ${install_dir}/bin
cp -v /mingw64/bin/libXpm*.dll ${install_dir}/bin
cp -v /mingw64/bin/libzstd.dll ${install_dir}/bin
cp -v /mingw64/bin/wasmtime.dll ${install_dir}/bin
cp -v /mingw64/bin/zlib*.dll ${install_dir}/bin

cp -v /mingw64/bin/libgccjit*.dll ${install_dir}/bin
mkdir -p ${install_dir}/lib/gcc
cp -v /mingw64/lib/{crtbegin,crtend,dllcrt2}.o ${install_dir}/lib/gcc
cp -v /mingw64/lib/lib{advapi32,gcc_s,kernel32,mingw32,mingwex,moldname,msvcrt,pthread,shell32,user32}.a ${install_dir}/lib/gcc
cp -v /mingw64/lib/gcc/x86_64-w64-mingw32/14.2.0/libgcc.a ${install_dir}/lib/gcc
cp -v /mingw64/bin/{ld,as}.exe ${install_dir}/lib/gcc
cp -v /mingw64/bin/libzstd.dll ${install_dir}/lib/gcc
cp -v /mingw64/bin/zlib*.dll ${install_dir}/lib/gcc
```
