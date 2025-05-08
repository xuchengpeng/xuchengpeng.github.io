---
title: "Clangd Configuration With Eglot"
date: 2024-01-29T08:11:30+08:00
categories: ["Emacs"]
tags: ["Emacs", "Eglot", "C++"]
---

[Eglot](https://joaotavora.github.io/eglot)是Emacs内置的[LSP](https://microsoft.github.io/language-server-protocol/)客户端。Eglot内置已支持大量的LSP服务端。以C++语言为例，Eglot支持clangd和ccls两种服务端模式。
<!--more-->

以我常用的clangd来说，Eglot默认启动clangd不附带任何参数[^1]，对于clangd来说，最重要的参数莫过于 `CompilationDatabase` ，即 `compile_commands.json` 文件所在的目录，默认情况下，clangd会查找源代码文件所在目录的所有父目录。

当前C/C++工程代码很流行使用[CMake](https://cmake.org/)替代之前的Makefile作为编译构建的工程文件，通常使用CMake命令对代码工程进行配置时，会将生成的中间文件统一在一个目录下管理（比如代码工程根目录下的cmake-build目录），而不是默认生成在代码工程根目录，这样造成一个问题就是clangd无法找到此目录下的 `compile_commands.json` 文件。

解决这个问题的办法就需要在clangd启动时指定 `compile_commands.json` 所在的目录，方法有很多种。

```emacs-lisp
(with-eval-after-load 'eglot
  (add-to-list 'eglot-server-programs
               `((c-mode c-ts-mode c++-mode c++-ts-mode objc-mode)
                 . ("clangd" "--compile-commands-dir=cmake-build"))))
```

可以在emacs的配置中，修改默认LSP服务端的启动参数，但是每个工程所对应的目录可能不一样，这里无法做到统一。

此时就可以使用 `.dir-locals.el`[^2] 文件来对每个工程来配置。

```emacs-lisp
((nil . ((eglot-server-programs
          . (((c-mode c-ts-mode c++-mode c++-ts-mode objc-mode)
              . ("clangd"
                 "--compile-commands-dir=cmake-build")))))))
```

还有一种配置方法，就是clangd自身对应的配置文件，可以是clangd的全局配置文件 `config.yaml` ，也可以是每个工程对应的配置文件 `.clangd` 。一般我们会针对工程进行个性化配置。

```yaml
CompileFlags:
  CompilationDatabase: "cmake-build"
```

[^1]: 详细的参数配置参考[eglot-server-programs](https://joaotavora.github.io/eglot/)。
[^2]: 本地变量配置参考[Directory Variables](https://www.gnu.org/software/emacs/manual/html_node/emacs/Directory-Variables.html)。
