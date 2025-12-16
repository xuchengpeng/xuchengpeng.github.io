---
title: "PowerShell: Change Directory Color"
date: 2025-12-16T17:07:14+08:00
categories: ["Themes"]
tags: ["Themes", "PowerShell"]
summary: Use PSStyle to configure how PowerShell render text.
---

By default, the directory background color is blue and foreground color is white, it is too shining. We can use [PSStyle](https://learn.microsoft.com/en-us/dotnet/api/system.management.automation.psstyle?view=powershellsdk-7.4.0) to configure the color of directory.

Add `$PSStyle.FileInfo.Directory = $PSStyle.Foreground.Blue + $PSStyle.Bold` into `$profile` file.
