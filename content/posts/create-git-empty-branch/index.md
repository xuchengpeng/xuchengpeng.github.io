---
title: "Create Git Empty Branch"
date: 2026-02-03T10:03:31+08:00
categories: ["Linux"]
tags: ["Linux", "Git"]
---

Create a new unborn branch, named <*new-branch*>. All tracked files are removed.
<!--more-->

```bash
git switch --orphan publish
git commit --allow-empty -m "empty commit"
git push -u origin publish
```
