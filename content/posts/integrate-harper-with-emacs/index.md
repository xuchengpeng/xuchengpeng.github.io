---
title: "Integrate Harper With Emacs"
date: 2025-07-09T16:57:37+08:00
categories: ["Emacs"]
tags: ["Emacs", "Harper", "Eglot"]
---

[Harper](https://github.com/Automattic/harper) is a grammar checker designed to run anywhere there is text (so really, anywhere). Most Harper users are catching their mistakes in Neovim, Obsidian, or Visual Studio Code.
<!--more-->

Harper takes advantage of decades of natural language research to analyze exactly how your words come together. If something is off, Harper lets you know.

In a way, Harper is an error-tolerant parser for English.

After installing harper-ls, configure it with Eglot for text modes:

```emacs-lisp
(with-eval-after-load 'eglot
  (add-to-list 'eglot-server-programs
               '((text-mode markdown-mode org-mode) . ("harper-ls" "--stdio"))))
(dolist (hook '(text-mode markdown-mode org-mode))
  (add-hook hook #'eglot-ensure))
```
