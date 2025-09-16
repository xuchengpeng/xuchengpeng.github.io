---
title: "Replacing text across multiple files"
date: 2025-09-16T16:04:20+08:00
categories: ["Emacs"]
tags: ["Emacs"]
summary: "Find and replace text across multiple file in project, dired-mode or grep-mode buffer."
---

Find and replace text across multiple file in project, dired-mode or grep-mode buffer.

## Project

Run `project-query-replace-regexp` in a project.

## Dired

1. Mark files in dired buffer.
   - Run `dired`, then mark files.
   - Run `find-dired` or `find-name-dired`, then mark files.
   - Run `consult-find` or `consult-fd` -> `embark-export` to `dired-mode` buffer, then mark files.
2. Press `Q` or run `dired-do-find-regexp-and-replace`.

## Grep

1. Run `consult-grep` or `consult-ripgrep` -> `embark-export` to `grep-mode` buffer.
2. Press `e` or run `grep-change-to-grep-edit-mode` to enter `grep-edit-mode`.
3. Run `query-replace` or `query-replace-regexp`.
4. Press `C-c C-c` to exit `grep-edit-mode`.
