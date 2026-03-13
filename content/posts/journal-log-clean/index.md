---
title: "Journal 日志清理"
date: 2026-03-13T14:08:27+08:00
categories: ["Linux"]
tags: ["Linux"]
---

Journal 是 systemd 的日志系统，随着系统长时间的使用，其对应的日志目录 /var/log/journal 下会累计大量的日志文件，占据不少系统存储空间。
<!--more-->

使用 journalctl --disk-usage 命令可以查看当前日志占用了多少存储空间。

## 手动清理

清理指定时间前的日志：

```bash
# 清理 2 周之前的日志
sudo journalctl --vacuum-time=2weeks
# 清理 7 天之前的日志
sudo journalctl --vacuum-time=7d
```

按照指定的最大空间进行清理：

```bash
# 清理 systemd 日志占用不超过 50M
sudo journalctl --vacuum-size=50M
```

按照保留的文件数目进行清理：

```bash
# 保留最近的 5 个日志文件
sudo journalctl --vacuum-files=5
```

## 默认大小限制

修改配置文件 /etc/systemd/journald.conf 来限制日志的最大容量。

```ini
[Journal]
SystemMaxUse=50M
```

修改完配置文件后，重启 systemd-journald.service 服务。
