---
title: "RIME Color Scheme Design Rules"
date: 2025-11-26T10:47:46+08:00
categories: ["Themes"]
tags: ["RIME", "Themes"]
summary: Design rules of RIME's color scheme with beautiful traditional chinese colors.
---

[RIME](https://github.com/rime) is a modular, extensible input method engine in cross-platform C++ code, built on top of open-source technologies.

For light schemes:
- color\_format: rgba
- text\_color: 0x000000 # 默认文字颜色
- comment\_text\_color: 0x717171 # 注释文字颜色，0x8E8E8E的反色
- label\_color: 0x8E8E8E # 标签文字颜色
- back\_color: 0xFFFFFF # 候选窗背景色
- border\_color: 0xE7E7E7 # 候选窗边框颜色
- hilited\_candidate\_text\_color: 0xC02C38 # 高亮候选文字颜色，根据个人喜好选择
- hilited\_candidate\_back\_color: 0xC02C3826 # 高亮候选背景颜色，高亮候选文字颜色不透明度20%，alpha值约为38/0x26
- hilited\_label\_color: 0xC02C38 # 高亮候选的标签颜色，与高亮候选文字颜色一致
- hilited\_comment\_text\_color: 0xC02C38 # 高亮候选的注释颜色，与高亮候选文字颜色一致
- candidate\_text\_color: 0x454545 # 候选文字颜色
- candidate\_back\_color: 0xFFFFFF # 非高亮候选背景颜色

For dark schemes:
- color\_format: rgba
- text\_color: 0xFFFFFF # 默认文字颜色
- comment\_text\_color: 0x8E8E8E # 注释文字颜色
- label\_color: 0x717171 # 标签文字颜色
- back\_color: 0x000000 # 候选窗背景色
- border\_color: 0x000000 # 候选窗边框颜色
- hilited\_candidate\_text\_color: 0xFFFFFF # 高亮候选文字颜色
- hilited\_candidate\_back\_color: 0xC02C38 # 高亮候选背景颜色，与亮色主题中高亮候选文字颜色一致
- hilited\_label\_color: 0xFFFFFF # 高亮候选的标签颜色，与高亮候选文字颜色一致
- hilited\_comment\_text\_color: 0xFFFFFF # 高亮候选的注释颜色，与高亮候选文字颜色一致
- candidate\_text\_color: 0xBABABA # 候选文字颜色，0x454545的反色
- candidate\_back\_color: 0x000000 # 非高亮候选背景颜色

I like traditional chinese colors very much, here are many choices:
- https://colors.ichuantong.cn/
- https://zhongguose.com/
- https://colors.masantu.com/
- https://boxingp.github.io/traditional-chinese-colors/

Customize color schemes refer to this [wiki](https://github.com/rime/weasel/wiki/%E5%AE%9A%E5%88%B6%E5%B0%8F%E7%8B%BC%E6%AF%AB%E9%85%8D%E8%89%B2).
