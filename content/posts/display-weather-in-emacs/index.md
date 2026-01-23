---
title: "在Emacs中显示天气"
date: 2026-01-23T13:03:10+08:00
categories: ["Emacs"]
tags: ["Emacs"]
summary: 使用异步调用的方式，从 wttr.in 在线获取最新的天气信息，显示到 Emacs 的 mode-line 或者 echo-bar 。
---

> [wttr.in](https://github.com/chubin/wttr.in) is a console-oriented weather forecast service that supports various information representation methods like terminal-oriented ANSI-sequences for console HTTP clients (curl, httpie, or wget), HTML for web browsers, or PNG for graphical viewers.

在Emacs中，可以通过调用命令 `curl -s "wttr.in/WuHan?format=4&M"` 来获取单行输出的天气信息，为避免阻塞其他任务，需要采用异步调用的方式，通过定时器周期去更新天气。

```emacs-lisp
(defvar +echo-bar--weather-string "")
(defvar +echo-bar--weather-url "wttr.in/WuHan?format=4&M")
(defun +echo-bar--weather-update ()
  (let* ((output-buffer (generate-new-buffer "*weather-output*"))
         ;; Start the process, directing output to `output-buffer`
         (proc (start-process "weather-proc" output-buffer "curl" "-s" +echo-bar--weather-url)))
    ;; Process filter: append output to the process's associated buffer
    (set-process-filter
     proc
     (lambda (p string)
       (with-current-buffer (process-buffer p)
         (insert string))))
    ;; Process sentinel: called when the process changes state (e.g., finishes)
    (set-process-sentinel
     proc
     (lambda (p event)
       (when (memq (process-status p) '(exit stop))
         (let* ((buffer (process-buffer p)))
           (when (zerop (process-exit-status p))
             (setq +echo-bar--weather-string
                   (replace-regexp-in-string "[ \t\n\r]+" "" (with-current-buffer buffer (buffer-string)))))
           (when (buffer-live-p buffer)
             (kill-buffer buffer))))))))
(run-at-time nil 1800 #'+echo-bar--weather-update)
```

成功获取的天气信息 `WuHan:🌫🌡️+4°C🌬️↗1.7m/s` ，可以显示到 `mode-line` 或者 `echo-bar` 中。
