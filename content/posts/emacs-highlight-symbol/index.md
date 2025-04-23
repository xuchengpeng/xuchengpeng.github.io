---
title: "Emacs中高亮符号"
date: "2025-02-26"
categories: ["Emacs"]
tags: ["Emacs"]
---

日常都是使用[symbol-overlay](https://github.com/wolray/symbol-overlay)包在编程时进行符号高亮，James Cherti介绍了[Emacs内置功能实现符号高亮](https://www.jamescherti.com/emacs-symbol-highlighting-built-in-functions/)的方法，核心是使用Emacs内置的[hi-lock](https://www.gnu.org/software/emacs/manual/html_node/emacs/Highlight-Interactively.html)包来实现。
<!--more-->

执行 `hi-lock-face-symbol-at-point` 可以高亮当前符号，执行 `hi-lock-unface-buffer` 可以选择需要符号来取消高亮。James Cherti实现了一个便捷开启和关闭符号高亮的函数。

```emacs-lisp
(defun simple-toggle-highlight-symbol-at-point ()
  "Toggle highlighting for the symbol at point."
  (interactive)
  (when-let* ((regexp (find-tag-default-as-symbol-regexp)))
    (if (member regexp (hi-lock--regexps-at-point))
        ;; Unhighlight symbol at point
        (hi-lock-unface-buffer regexp)
      ;; Highlight symbol at point
      (hi-lock-face-symbol-at-point))))
```

Mickey Petersen之前也在Mastering Emacs介绍了[单词/句子/正则表达式匹配高亮](https://www.masteringemacs.org/article/highlighting-by-word-line-regexp)的使用方法，Emacs已内置了快捷键来快速使用这些功能，这些功能也是hi-lock包提供的。
