---
title: "Set TX-02 Oblique in Emacs"
date: 2025-10-25T10:28:50+08:00
categories: ["Emacs", "Themes"]
tags: ["Emacs", "Themes", "TX-02", "Berkeley Mono"]
summary: Berkeley Mono is a love letter to the golden era of computing.
---

`TX-02 Oblique` is not working with italic face in GNU Emacs even we customize italic face's `:slant` with oblique, don't know why, but we can customize italic face's font with `TX-02 Oblique`.

```emacs-lisp
(set-face-attribute 'italic nil :font (font-spec :family "TX-02 Oblique" :size 18) :slant 'oblique)
```
