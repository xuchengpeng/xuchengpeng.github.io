---
title: "修改 Git 提交的作者信息"
date: 2026-02-11T10:11:46+08:00
categories: ["Linux"]
tags: ["Linux", "Git"]
---

要修改 Git 提交（commit）的作者信息，直接使用命令可以对最近一次或历史多次的提交进行修改。
<!--more-->

## 修改最近一次提交

- 指定新作者

  ```bash
  git commit --amend --author="name <email@example.com>" --no-edit
  ```

- 重置为当前作者

  ```bash
  git commit --amend --reset-author --no-edit
  ```

## 修改历史多次提交

```bash
# 1. n 为历史提交数量
git rebase -i HEAD~n
# 2. 将需要修改的提交从 pick 改为 edit
# 3. 依次修改每个提交的作者信息
git commit --amend --author="name <email@example.com>" --no-edit
# 4. 完成修改
git rebase --continue
```
