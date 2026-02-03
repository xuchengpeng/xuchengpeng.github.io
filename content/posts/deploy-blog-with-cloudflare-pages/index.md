---
title: "使用 Cloudflare Pages 部署博客"
date: 2026-02-03T11:18:07+08:00
categories: ["Emacs"]
tags: ["Emacs", "Hugo", "Git"]
---

Cloudflare Pages is a JAMstack platform for frontend developers to collaborate and deploy websites.
<!--more-->

得益于 Cloudflare Pages 免费且强大的网络功能，部署在上面在访问速度和安全性等方面在国内相比 GitHub Pages 都可以得到不小的提升。

首先，博客文档托管在 GitHub 仓库里面，由于存在众多的静态博客生成工具，相比 Cloudflare Pages 自身提供的工作流能力，在 GitHub Actions 中通过静态博客工具生成博客会更方便，生成的博客文件可以直接 push 到仓库的另一个分支即可，任何博客生成的修改都只在 GitHub 完成；

然后，在 Cloudflare Pages 中添加页面，连接到 GitHub 仓库的对应分支，无须进行任何构建命令，直接部署即可，此时就可以通过生成的域名访问博客站点了，后续每次 GitHub Actions 生成并发布新的博客内容到分支，Cloudflare Pages 都会自动拉取部署；

最后，将自己购买的域名通过 Cloudflare 进行域管理并且在域名购买商那里修改为 Cloudflare 提供的 DNS 地址，把 Cloudflare Pages 中的站点设置为自定义域名就完成了绑定。
