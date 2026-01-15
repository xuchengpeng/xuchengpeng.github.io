---
title: "在WSL中使用emacs-rime"
date: 2026-01-15T13:04:37+08:00
categories: ["Emacs"]
tags: ["Emacs", "WSL", "RIME"]
---

在WSL中使用Emacs时，无法直接使用Windows安装的RIME输入法，当前比较好的方案是在WSL中安装[librime](https://github.com/rime/librime)，在Emacs中使用[emacs-rime](https://github.com/DogLooksGood/emacs-rime)作为前端，使用体验比较贴近原生RIME输入法。
<!--more-->

首先在WSL中安装librime：`apt install librime-dev rime-data-double-pinyin`。

然后在Emacs中安装和配置emacs-rime：

```emacs-lisp
(use-package rime
  :ensure t
  :custom
  (default-input-method "rime")
  (rime-user-data-dir "~/.emacs.d/.local/rime")
  (rime-emacs-module-header-root "/usr/local/emacs/include")
  (rime-show-candidate 'posframe)
  (rime-posframe-properties (list :font "LXGW WenKai-13.5"
                                  :border-width 1
                                  :left-fringe 5
                                  :right-fringe 5))
  (rime-cursor "\u2038")
  :init
  (defun +rime-custom-faces (&rest _)
    (modus-themes-with-colors
      (custom-set-faces
       `(rime-default-face ((,c :background ,bg-dim :foreground ,fg-main)))
       `(rime-code-face ((,c :foreground ,blue-warmer)))
       `(rime-highlight-candidate-face ((,c :foreground ,blue-cooler)))
       `(rime-comment-face ((,c :foreground ,comment)))
       `(rime-preedit-face ((,c :foreground ,fg-main :underline (:style dots)))))))
  (add-hook 'modus-themes-after-load-theme-hook #'+rime-custom-faces)
  :config
  (keymap-set rime-mode-map "C-`" #'rime-send-keybinding)
  (defun +rime-finalize ()
    (when rime--lib-loaded
      (rime-lib-finalize)))
  (add-hook 'kill-emacs-hook #'+rime-finalize))
```

自定义配置文件`default.custom.yaml`还有其他输入方案的配置文件，存放在`rime-user-data-dir`目录下。

执行`toggle-input-method`来激活使用rime输入法，默认快捷键为`C-\`。

