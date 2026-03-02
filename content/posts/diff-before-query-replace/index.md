---
title: "查找替换前先对比"
date: 2026-03-02T08:26:45+08:00
categories: ["Emacs"]
tags: ["Emacs"]
---

大多数情况下，在 Emacs 中都是先通过 `query-replace` 或者 `query-replace-regexp` 在文件中进行查找替换，完成后再对比查看是否有错误的地方。
<!--more-->

Emacs 30 提供了查找替换前先进行对比的方式：

1. 运行 `replace-regexp-as-diff` 。
2. 确认对比信息，运行 `diff-apply-buffer` 或者 `diff-apply-hunk` 应用对比结果。
3. 如果对比信息不正确，直接退出对比 buffer 放弃本次替换。

多文件的查找替换前对比通过命令 `multi-file-replace-regexp-as-diff` 或 `dired-do-replace-regexp-as-diff` 来完成。
