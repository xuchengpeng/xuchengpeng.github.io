---
title: "Emacs Copy/Paste Problem in WSL"
date: 2025-11-21T15:57:30+08:00
categories: ["Emacs"]
tags: ["Emacs", "Linux", "WSL"]
summary: Fix messy chinese characters copy/paste between Emacs(in WSL) and Windows.
---

Fix messy chinese characters copy/paste between Emacs(in WSL) and Windows.

```emacs-lisp
(set-clipboard-coding-system 'gbk)
(setq select-active-regions nil)
```
