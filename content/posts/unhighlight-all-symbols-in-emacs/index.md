---
title: "Emacs中去光亮所有符号"
date: "2025-04-08"
categories: ["Emacs"]
tags: ["Emacs"]
---

之前的文章介绍了如何在Emacs中高亮符号，一般运行 `M-x unhighlight-regexp` 来选择其中一个符号去高亮。

那么如何去高亮当前Buffer中所有的符号呢？方法是运行 `C-u M-x unhighlight-regexp` 。
<!--more-->

这里总结一下符号高亮常用的操作：
- `M-s h .` or `highlight-symbol-at-point`

  高亮当前符号。

- `M-s h l` or `highlight-lines-matching-regexp`

  高亮匹配的正则表达式的所有行。

- `M-s h p` or `highlight-phrase`

  高亮匹配的短语。

- `M-s h r` or `highlight-regexp`

  高亮匹配的正则表达式。

- `M-s h u` or `unhighlight-regexp`

  去高亮匹配的正则表达式。

- `C-u M-s h u`

  去高亮当前Buffer中所有的已高亮符号。
