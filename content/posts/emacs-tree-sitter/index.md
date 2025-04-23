---
title: "Emacs tree-sitter"
date: "2024-12-18"
categories: ["Emacs"]
tags: ["Emacs", "tree-sitter"]
---

[tree-sitter](https://tree-sitter.github.io/tree-sitter/)是一个解析器生成工具和增量解析库。它可以为源文件构建语法树，当源文件修改时可以高效的更新语法树。

<!--more-->

自Emacs 29开始，内置treesit模块实现了对tree-sitter的支持。

## 安装语言解析器

为某一个编程语言添加tree-sitter支持时，运行`M-x treesit-install-language-grammar`命令，会先clone语言解析器的仓库，然后在进行编译安装。

通过设定`treesit-language-source-alist`变量来定义每种语言解析器的仓库地址，这样在进行命令安装时就不需要再输入仓库地址。

```elisp
;; M-x `treesit-install-language-grammar` to install language grammar.
(setq treesit-language-source-alist
      '((bash . ("https://github.com/tree-sitter/tree-sitter-bash"))
        (c . ("https://github.com/tree-sitter/tree-sitter-c"))
        (cpp . ("https://github.com/tree-sitter/tree-sitter-cpp"))
        (css . ("https://github.com/tree-sitter/tree-sitter-css"))
        (cmake . ("https://github.com/uyha/tree-sitter-cmake"))
        (csharp     . ("https://github.com/tree-sitter/tree-sitter-c-sharp.git"))
        (dockerfile . ("https://github.com/camdencheek/tree-sitter-dockerfile"))
        (elisp . ("https://github.com/Wilfred/tree-sitter-elisp"))
        (elixir "https://github.com/elixir-lang/tree-sitter-elixir" "main" "src" nil nil)
        (go . ("https://github.com/tree-sitter/tree-sitter-go"))
        (gomod      . ("https://github.com/camdencheek/tree-sitter-go-mod.git"))
        (haskell "https://github.com/tree-sitter/tree-sitter-haskell" "master" "src" nil nil)
        (html . ("https://github.com/tree-sitter/tree-sitter-html"))
        (java       . ("https://github.com/tree-sitter/tree-sitter-java.git"))
        (javascript . ("https://github.com/tree-sitter/tree-sitter-javascript"))
        (json . ("https://github.com/tree-sitter/tree-sitter-json"))
        (lua . ("https://github.com/Azganoth/tree-sitter-lua"))
        (make . ("https://github.com/alemuller/tree-sitter-make"))
        (markdown . ("https://github.com/MDeiml/tree-sitter-markdown" nil "tree-sitter-markdown/src"))
        (ocaml . ("https://github.com/tree-sitter/tree-sitter-ocaml" nil "ocaml/src"))
        (org . ("https://github.com/milisims/tree-sitter-org"))
        (python . ("https://github.com/tree-sitter/tree-sitter-python"))
        (php . ("https://github.com/tree-sitter/tree-sitter-php"))
        (typescript . ("https://github.com/tree-sitter/tree-sitter-typescript" nil "typescript/src"))
        (tsx . ("https://github.com/tree-sitter/tree-sitter-typescript" nil "tsx/src"))
        (ruby . ("https://github.com/tree-sitter/tree-sitter-ruby"))
        (rust . ("https://github.com/tree-sitter/tree-sitter-rust"))
        (sql . ("https://github.com/m-novikov/tree-sitter-sql"))
        (scala "https://github.com/tree-sitter/tree-sitter-scala" "master" "src" nil nil)
        (toml "https://github.com/tree-sitter/tree-sitter-toml" "master" "src" nil nil)
        (vue . ("https://github.com/merico-dev/tree-sitter-vue"))
        (kotlin . ("https://github.com/fwcd/tree-sitter-kotlin"))
        (yaml . ("https://github.com/ikatyang/tree-sitter-yaml"))
        (zig . ("https://github.com/GrayJack/tree-sitter-zig"))))
```

Emacs会先在`treesit-extra-load-path`目录查找语言解析器，然后在`~/.emacs.d/tree-sitter/`目录查找语言解析器。

## 使用预编译的语言解析器

[tree-sitter-langs](https://github.com/emacs-tree-sitter/tree-sitter-langs)包提供了预编译的语言解析器，在release页面下载对应操作系统的语言解析器，将包内的库文件解压到`~/.emacs.d/tree-sitter/`目录下。

需要将所有的`<LANGUAGE>.so`重命名为`libtree-sitter-<LANGUAGE>.so`，批量重命名的快捷命令如下：

```bash
for f in * ; do mv -- "$f" "libtree-sitter-$f" ; done
```

## 检查语言解析器是否可用

```elisp
Eval: (treesit-language-available-p 'python)
t
Eval: (treesit-language-available-p 'klingon)
nil
```

## 使用tree-sitter

首先判断当前版本Emacs是否内置treesit支持。

```elisp
(and (fboundp 'treesit-available-p)
     (treesit-available-p))
```

Emacs内置了一些语言解析器，通过`<LANGUAGE>-ts-mode`可以打开tree-sitter支持。

```elisp
(setq major-mode-remap-alist
      '((c-mode . c-ts-mode)
        (c++-mode . c++-ts-mode)
        (conf-toml-mode . toml-ts-mode)
        (csharp-mode . csharp-ts-mode)
        (css-mode . css-ts-mode)
        (go-mode . go-ts-mode)
        (go-mod-mode . go-mod-ts-mode)
        (java-mode . java-ts-mode)
        (javascript-mode . js-ts-mode)
        (js-mode . js-ts-mode)
        (js-json-mode . json-ts-mode)
        (ruby-mode . ruby-ts-mode)
        (sh-mode . bash-ts-mode)
        (python-mode . python-ts-mode)))
(add-to-list 'auto-mode-alist '("\\(?:CMakeLists\\.txt\\|\\.cmake\\)\\'" . cmake-ts-mode))
(add-to-list 'auto-mode-alist '("\\.rs\\'" . rust-ts-mode))
(add-to-list 'auto-mode-alist '("\\.ts\\'" . typescript-ts-mode))
(add-to-list 'auto-mode-alist '("\\.tsx\\'" . tsx-ts-mode))
(add-to-list 'auto-mode-alist '("\\.ya?ml\\'" . yaml-ts-mode))
```

还有其它很多语言没有内置支持，可以使用`treesit-parser-create`来手动开启。

```elisp
(add-hook 'emacs-lisp-mode-hook (lambda ()
                                  (when (treesit-language-available-p 'elisp)
                                    (treesit-parser-create 'elisp))))
```
