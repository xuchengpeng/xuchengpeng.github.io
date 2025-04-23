---
title: "Change buffer font in Emacs"
date: "2025-02-14"
categories: ["Emacs"]
tags: ["Emacs"]
---

From Emacs 23.1, you can change the font of current buffer, using `buffer-face-set`. You can toggle this using `buffer-face-mode` or `buffer-face-toggle`.
<!--more-->

For example, change the font of all org mode buffers when openning:

```emacs-lisp
(add-hook 'org-mode-hook (lambda () (buffer-face-set :family "LXGW WenKai Mono" :height 140)))
```

The argument should be a face name or a property list of face attributes and values. If more than on face is listed, that specifies an aggregate face, like in a face text property. Font face attributes are family, height, weight, slant, etc.
