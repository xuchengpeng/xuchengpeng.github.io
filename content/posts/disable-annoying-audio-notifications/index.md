---
title: "Disable Annoying Audio Notifications"
date: 2024-01-30T20:19:12+08:00
categories: ["Emacs"]
tags: ["Emacs"]
---

By default Emacs ring the bell to attract the user’s attention, this is annoying.
<!--more-->

To get a visual signal instead, set `visual-bell` with t Emacs should flash the screen to represent a bell.

We can also customize `ring-bell-function` to just flash the modeline.

```emacs-lisp
(defun +ring-bell-fn ()
  "Blink the mode-line."
  (let ((buf (current-buffer)))
    (invert-face 'mode-line)
    (run-with-timer 0.05 nil
                    (lambda ()
                      (with-current-buffer buf
                        (invert-face 'mode-line))))))

(setq ring-bell-function '+ring-bell-fn
      visible-bell t)
```
