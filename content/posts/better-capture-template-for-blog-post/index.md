---
title: "Better capture template for blog post"
date: "2025-04-01"
categories: ["Emacs"]
tags: ["Emacs", "Org"]
summary: An org capture template to create post file in blog directory, and insert some front matters.
---

之前的文章介绍了如何为新建博客文章增加Org Capture模板，这里优化了一下模板的实现，更多交互式内容的填充放在了Org Capture中完成。

```emacs-lisp
(defun +org-capture-org-blog-post ()
  (let* ((filename (read-from-minibuffer "New post file: ")))
    (expand-file-name
     (format "org/posts/%s-%s.org" (format-time-string "%Y-%m-%d") filename)
     dotemacs-org-blog-dir)))
(setq org-capture-templates
      `(("o" "Org Blog Post" plain
         (file +org-capture-org-blog-post)
         "#+TITLE: \n#+AUTHOR: \n#+DATE: %T\n" :jump-to-captured t)))
```
