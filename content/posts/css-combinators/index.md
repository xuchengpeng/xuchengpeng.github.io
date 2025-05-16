---
title: "CSS Combinators"
date: 2025-05-16T16:34:53+08:00
categories: ["Web"]
tags: ["CSS"]
---

A combinator is a sign that explains the relationship between selectors.
<!--more-->

The table below shows the different combinators in CSS:

| Name                          | Sign           | Example  | Example description                                                               |
|:------------------------------|:---------------|:---------|:----------------------------------------------------------------------------------|
| Child combinator              | >              | div > p  | Selects every \<p\> element that are direct children of a \<div\> element         |
| Descendant combinator         | (single space) | div p    | Selects all \<p\> elements inside \<div\> elements                                |
| Namespace separator           | \|             | ns \| h2 | Selects all \<h2\> elements in namespace ns                                       |
| Next-sibling combinator       | +              | div + p  | Selects the first \<p\> element that is placed immediately after \<div\> elements |
| Selector list                 | ,              | div, p   | Selects all \<div\> elements and all \<p\> elements                               |
| Subsequent-sibling combinator | ~              | p ~ ul   | Selects all \<ul\> elements that are preceded by a \<p\> element                  |
