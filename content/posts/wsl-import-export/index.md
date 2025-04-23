---
title: "WSL import and export"
date: "2024-08-13"
categories: ["Linux"]
tags: ["Linux", "WSL"]
summary: Export a distribution and import it to another disk.
---

默认情况WSL会安装在C盘，可以将其迁移到其他盘，这里使用WSL提供的导入和导出命令。

关闭所有的WSL，查询要导出的名称:
```shell
wsl --shutdown
wsl -l -v
  NAME            STATE           VERSION
  Ubuntu-22.04    Stopped         2
```

将要导出的WSL保存到D盘：
```shell
wsl --export Ubuntu-22.04 D:\Ubuntu-22.04.tar
```

注销原有的WSL：
```shell
wsl --unregister Ubuntu-22.04
```

在D盘安装WSL：
```shell
wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\Ubuntu-22.04.tar
```
