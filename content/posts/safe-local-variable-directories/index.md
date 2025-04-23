---
title: "Safe Local Variable Directories"
date: "2024-11-25"
categories: ["Emacs"]
tags: ["Emacs"]
summary: This variable is a list of directories where local variables are always enabled.
---

`safe-local-variable-directories` was introduced in Emacs 30.1.

A list of directories where local variables are always enabled.

Directory-local variables loaded from these directories, such as the variables in `.dir-locals.el`, will be enabled even if they are risky.

The names of the directories in the list must be absolute, and must end in a slash.

Remote directories can be included if the variable `enable-remote-dir-locals` is non-nil.
