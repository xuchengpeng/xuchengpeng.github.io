---
title: "Emacs中高亮关键字"
date: "2025-02-28"
categories: ["Emacs"]
tags: ["Emacs"]
summary: "Use font-lock to highlight keywords."
---

日常编码或者阅读其他代码时经常会使用或看到TODO/FIXME等关键字，之前是使用[hl-todo](https://github.com/tarsius/hl-todo)来进行高亮，hl-todo中还提供了很多其它功能，我基本上只使用了高亮关键字的功能。

James Cherti介绍了[Emacs内置功能实现关键字高亮](https://www.jamescherti.com/emacs-highlight-keywords-like-todo-fixme-note/)的方法，核心实现是使用 `font-lock-add-keywords` 来增加高亮关键字，使用 `font-lock-remove-keywords` 来删除高亮关键字，这样就可以不使用hl-todo包了，这里我根据自己的需要设置颜色样式，配置成编程模式启动高亮关键字。

```emacs-lisp
(defvar +highlight-keywords
  '(("\\<\\(TODO\\|FIXME\\|BUG\\)\\>" 1 'error prepend)
    ("\\<\\(NOTE\\|HACK\\|MAYBE\\)\\>" 1 'warning prepend)))

(define-minor-mode +highlight-keywords-mode
  "Highlight keywords, like TODO, FIXME..."
  :global nil
  (if +highlight-keywords-mode
      (font-lock-add-keywords nil +highlight-keywords)
    (font-lock-remove-keywords nil +highlight-keywords))

  ;; Fontify the current buffer
  (when (bound-and-true-p font-lock-mode)
    (if (fboundp 'font-lock-flush)
        (font-lock-flush)
      (with-no-warnings (font-lock-fontify-buffer)))))

(add-hook 'prog-mode-hook #'+highlight-keywords-mode)
```
