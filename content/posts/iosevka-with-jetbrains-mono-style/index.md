+++
title = "Iosevka With JetBrains Mono Style"
date = 2025-04-23
categories = ["Themes"]
tags = ["Themes"]
summary = "Build Iosevka with JetBrains Mono Style."
+++

> [Iosevka](https://github.com/be5invis/Iosevka) [ˌjɔˈseβ.kʰa] is an *open-source, sans-serif + slab-serif, monospace + quasi‑proportional* typeface family, designed for *writing code*, using in *terminals*, and preparing *technical documents*.

Iosevka支持多种风格设置，并且很方便进行自定义构建。这里介绍下如何继承[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono)字体风格，并修改字宽、连字符、个别字符风格。

首先需要安装[nodejs](http://nodejs.org/)(≥18.0.0)和[ttfautohint](http://www.freetype.org/ttfautohint/)。下载Iosevka仓库后，安装相关包文件。

```shell
git clone --depth=1 https://github.com/be5invis/Iosevka.git
cd Iosevka
npm install
```

可以在[Iosevka Customizer](https://typeof.net/Iosevka/customizer)进行自定义风格设置，生成的配置文件保存在 `private-build-plans.toml` 中。

```toml
[buildPlans.IosevkaSS14]
family = "Iosevka SS14"
spacing = "normal"
serifs = "sans"
noCvSs = true
exportGlyphNames = false
noLigation = true

[buildPlans.IosevkaSS14.variants]
inherits = "ss14"

[buildPlans.IosevkaSS14.variants.design]
cv04 = 5  # 4 semi-open-serifless
cv05 = 5  # 5 oblique-arched-serifless
cv07 = 1  # 7 straight-serifless
cv08 = 1  # 8 crossing
cv10 = 4  # 0 tall-slashed
cv17 = 2  # G toothed-serifless-hooked
cv20 = 2  # J serifed
cv21 = 1  # K straight-serifless
cv26 = 4  # Q crossing
cv32 = 1  # W straight-serifless
cv36 = 1  # a double-storey-serifless
cv46 = 1  # k straight-serifless
cv55 = 1  # u toothed-serifless
cv57 = 1  # w straight-serifless
cv59 = 4  # y straight-turn-serifless
VSAG = 1  # ( normal
VSAJ = 1  # # upright
VSAQ = 1  # ? smooth

[buildPlans.IosevkaSS14.widths.Normal]
shape = 600
menu = 5
css = "normal"
```

执行 `npm run build -- contents::IosevkaSS14` 构建TTF和Web Font。

执行 `npm run build -- ttf::IosevkaSS14` 只构建TTF。默认情况下，构建会根据系统的CPU线程数启动多个并发任务，可能会导致CPU被全部占用，或者是内存不足导致OOM，通过执行 `npm run build -- --jCmd=2 ttf::IosevkaSS14` 来指定并发任务数目。

构建完成后，字体文件保存在 `dist` 目录下。
