---
title: "Arch Linux 中 Noto CJK 字体回落问题"
date: 2026-02-12T08:38:43+08:00
categories: ["Linux"]
tags: ["Linux", "Arch"]
---

因为 noto-fonts-cjk 包修改了一些配置，可能导致部分字体回落时出现问题，例如关、复等字字形过窄，门的字形为竖点插入横折钩而非左上斜点等。
<!--more-->

这是因为每个程序中可以设置不同的默认字体，比如 Arial 或者 Tahoma，而这些字体的属性由 fontconfig 控制，其使用顺序是据地区代码以 A-Z 字母表顺序成默认排序，由于 ja-JP 在 zh_{CN,HK,SG,TW} 之前，故优先显示日文字形。

手动调整优先级，将中文字形调整到日文字形之前，在 `~/.config/fontconfig/fonts.conf` 中添加以下内容：

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Sans CJK SC</family>
      <family>Noto Sans CJK TC</family>
      <family>Noto Sans CJK JP</family>
    </prefer>
  </alias>
  <alias>
      <family>serif</family>
      <prefer>
        <family>Noto Serif CJK SC</family>
        <family>Noto Serif CJK TC</family>
        <family>Noto Serif CJK JP</family>
      </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Sans Mono CJK SC</family>
      <family>Noto Sans Mono CJK TC</family>
      <family>Noto Sans Mono CJK JP</family>
    </prefer>
  </alias>
</fontconfig>
```
