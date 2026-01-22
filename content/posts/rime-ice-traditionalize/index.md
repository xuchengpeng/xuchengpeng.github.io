---
title: "雾凇拼音简繁转换"
date: 2026-01-22T13:24:43+08:00
categories: ["Emacs"]
tags: ["RIME", "Emacs"]
---

朙月拼音和双拼默认使用的是繁体字库，输入方案中转换简体功能，是通过内置OpenCC进行转换的，词典中保存的都是繁体。
<!--more-->

雾凇拼音的字库是简体的，那么需要在输入方案中加入转换繁体功能，也是可以通过内置OpenCC进行转换。

输入方案 `switches` 中加入：

```yaml
- name: traditionalization
  states: [ 汉字, 漢字 ]
```

输入方案 `engine/filters` 中加入：

```yaml
engine/filters/+:
  - simplifier@traditionalize  # 简繁切换
```

最后加入简繁转换功能：

```yaml
# 简繁切换
traditionalize:
  option_name: traditionalization  # 对应 switches 中的 name
  opencc_config: s2t.json          # s2t.json | s2hk.json | s2tw.json | s2twp.json （Rime 内置配置，在程序目录可找到）
  tips: none                       # 转换提示: all 都显示 | char 仅单字显示 | none 不显示。
  tags: [ abc, number, gregorian_to_lunar ]  # 限制在对应 tag，不对其他如反查的内容做简繁转换
```

这样就可以在功能切换选项中进行简繁切换了。
