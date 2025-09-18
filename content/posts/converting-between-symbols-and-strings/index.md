---
title: "Converting Between Symbols and Strings"
date: 2025-09-18T15:28:23+08:00
categories: ["Emacs"]
tags: ["Emacs"]
summary: "A small tip to show how to convert between symbols and strings."
---

```emacs-lisp
(symbol-name 'some-symbol)
; => "some-symbol"
(intern "some-symbol")
; => some-symbol
```
