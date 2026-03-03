---
title: "修复 Windows Terminal 中 Git Bash 闪烁问题"
date: 2026-02-26T16:33:44+08:00
categories: ["Linux"]
tags: ["Git", "Windows"]
---

在 Windows Terminal 中使用 Git Bash 时，经常会出现整个终端闪烁，非常影响使用体验。
<!--more-->

这是因为 Git for Windows 的 `/etc/inputrc` 包含了 `set bell-style visible` 配置。解决办法就是在 `~/.inputrc` 中添加 `set bell-style none` 或者 `set bell-style audible` 。

{{< alert >}}
🔵 别忘记在 `~/.inputrc` 首行添加 `$include /etc/inputrc` 。
{{< /alert >}}
