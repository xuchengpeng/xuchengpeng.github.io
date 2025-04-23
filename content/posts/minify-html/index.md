---
title: "Minify HTML"
date: "2025-01-24"
categories: ["Web"]
tags: ["HTML"]
summary: Minify HTML with htmlnano which inspired by cssnano.
---

之前的文章里我们介绍了如何压缩CSS和JavaScript，这里将对博客发布前的HTML文件进行压缩，这里我们选择使用[htmlnano](https://github.com/posthtml/htmlnano)对HTML进行压缩。

htmlnano基于[PostHTML](https://github.com/posthtml/posthtml)，可作为PostHTML的插件使用，灵感来自于[cssnano](https://github.com/cssnano/cssnano)。

首先安装htmlnano：

```shell
npm install --save-dev htmlnano terser posthtml posthtml-cli
```

添加PostHTML的配置文件 `posthtmlrc.json` ：

```json
{
  "root": "public",
  "input": "**/*.html",
  "output": "public",
  "allInOutput": true,
  "plugins": {
    "htmlnano": {}
  }
}
```

添加htmlnano的配置文件 `htmlnanorc.json` ：

```json
{
    "preset": "safe"
}
```

htmlnano支持一些预设值：
- [safe](https://github.com/posthtml/htmlnano/blob/master/lib/presets/safe.mjs) - a default preset for minifying a regular HTML in a safe way (without breaking anything)
- [ampSafe](https://github.com/posthtml/htmlnano/blob/master/lib/presets/ampSafe.mjs) - same as safe preset but for [AMP pages](https://www.ampproject.org/)
- [max](https://github.com/posthtml/htmlnano/blob/master/lib/presets/max.mjs) - maximal minification (might break some pages)

此时我们可以使用命令行对public文件夹下的所有html文件进行压缩：

```shell
npx posthtml -c posthtmlrc.json
```
