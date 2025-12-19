---
title: "Ubuntu Phased Updates"
date: 2025-12-19T09:48:12+08:00
categories: ["Linux"]
tags: ["Linux", "Ubuntu"]
---

Phased updates are software updates that are gradually rolled out to users rather than all users getting the updates at the same time.
<!--more-->

In an update system that doesn't use phased updates, all users are immediately offered an update as soon as it is made available. When phased updates are used, only some users get an update when it is first released. As time passes, more and more users get the update, until the update is finally "fully phased" and everyone is offered the update.

Turn off update phasing in two ways:
- Add following contents into `/etc/apt/apt.conf.d/99phased-updates` file.
  ```bash
  Update-Manager::Always-Include-Phased-Updates "true";
  APT::Get::Always-Include-Phased-Updates "true";
  ```
- Use command `apt -o APT::Get::Always-Include-Phased-Updates=true upgrade` to upgrade.
