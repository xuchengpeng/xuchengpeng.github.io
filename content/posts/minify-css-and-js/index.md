---
title: "Minify CSS and JavaScript"
date: "2025-01-07"
categories: ["Web"]
tags: ["CSS", "JavaScript"]
---

发布博客时，压缩[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)和[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)文件的大小，能提升网页的加载速度，这里介绍使用[cssnano](https://github.com/cssnano/cssnano)和[Terser](https://github.com/terser/terser)工具来压缩。
<!--more-->

## 压缩CSS

首先安装cssnano和postcss：

```shell
npm install --save-dev cssnano postcss postcss-cli
```

在项目根目录添加 `postcss.config.js` 配置文件：

```js
module.exports = {
  plugins: [require('cssnano')({ preset: 'default' })],
};
```

使用以下命令进行CSS文件的压缩：

```shell
npx postcss input.css > output.css
```

## 压缩JavaScript

首先安装Terser:

```shell
npm install --save-dev terser
```

使用以下命令进行JavaScript文件的压缩：

```shell
npx terser input.js -c -m -o output.js
```
