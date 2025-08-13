---
title: "Generate Fuse Index With Node.js"
date: 2025-07-31T16:00:51+08:00
categories: ["Web"]
tags: ["Node.js", "Cheerio", "Fuse.js", "JavaScript"]
---

[Fuse.js](https://github.com/krisk/fuse) is a lightweight fuzzy-search, in JavaScript, with zero dependencies.
<!--more-->

[Cheerio](https://github.com/cheeriojs/cheerio) is a fast, flexible, and elegant library for parsing and manipulating HTML and XML.

With Node.js, use Cheerio to manipulate HTML, then select elements to generate Fuse index.

```javascript
const fs = require('fs');
const cheerio = require('cheerio');
const entries = [];

for (const file in htmlFiles) {
    const htmlContent = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'});
    const $ = cheerio.load(htmlContent);
    const title = $('title').text();
    const description = $('meta[name=description]').attr('content');
    const keywords = $('meta[name=keywords]').attr('content');
    const url = '/posts/' + file;
    entries.push({
        title: title || '',
        description: description || '',
        keywords: keywords || '',
        url: url
    });
}

console.log(JSON.stringify(entries));
```
