---
title: "sdcv"
date: "2024-12-09"
categories: ["Emacs"]
tags: ["Emacs", "sdcv", "StarDict"]
---

[sdcv](https://github.com/Dushistov/sdcv) is a simple, cross-platform, text-based utility for working with dictionaries in [StarDict](https://stardict-4.sourceforge.net/) format.

<!--more-->

StarDict dictionaries can be downloaded from [https://stardict.nchrs.xyz/](https://stardict.nchrs.xyz/) or [https://kdr2.com/resource/stardict.html](https://kdr2.com/resource/stardict.html).

The [quick-sdcv](https://github.com/jamescherti/quick-sdcv.el) package serves as a lightweight Emacs interface for the sdcv command-line interface, which is the console version of the StarDict dictionary application.

```elisp
(use-package quick-sdcv
  :ensure t
  :commands (quick-sdcv-search-input quick-sdcv-search-at-point)
  :config
  (setq quick-sdcv-program "/path/to/sdcv"
        quick-sdcv-dictionary-data-dir "/path/to/sdcv/dict/")
  (add-hook 'quick-sdcv-mode-hook #'visual-line-mode)
  (keymap-set quick-sdcv-mode-map "q" #'quit-window))
```
