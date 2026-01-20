---
title: "安装雾凇拼音词库"
date: 2026-01-20T19:53:25+08:00
categories: ["Emacs"]
tags: ["RIME", "Emacs"]
---

雾凇拼音提供了一套开箱即用的完整配置，包含输入方案（全拼、常见双拼）、长期维护的开源词库及各项扩展功能。
<!--more-->

这里介绍如何将雾凇拼音中的词库集成到自己的RIME输入方法中。

首先，把[rime-ice](https://github.com/iDvel/rime-ice)仓库中`cn_dicts`和`en_dicts`目录拷贝到RIME部署的目录（如果使用的是[emacs-rime](https://github.com/DogLooksGood/emacs-rime)，对应的就是`rime-user-data-dir`）。

其次，创建`rime_ice.dict.yaml`文件，添加以下内容：

```yaml
# Rime dictionary
# encoding: utf-8

---
name: rime_ice
version: "2026-01-20"
import_tables:
  - cn_dicts/8105     # 字表
  # - cn_dicts/41448  # 大字表（按需启用）（启用时和 8105 同时启用并放在 8105 下面）
  - cn_dicts/base     # 基础词库
  - cn_dicts/ext      # 扩展词库
  - cn_dicts/tencent  # 腾讯词向量（大词库，部署时间较长）
  - cn_dicts/others   # 一些杂项
  - en_dicts/en_ext   # 补充（里面有些许带权重的，且和 en 重复，需要把 en_ext 放在上面）
  - en_dicts/en       # 英文主词库
...
```

最后，在输入方案中导入词库，比如在`double_pinyin.custom.yaml`中添加词库`translator/dictionary: rime_ice`，重新部署后就可以使用雾凇拼音的词库了。
