---
title: "Shortcodes"
date: 2025-05-09T13:24:52+08:00
categories: ["Themes"]
tags: ["Hugo"]
---

Rather than writing all your site pages from scratch, Hugo lets you define and use [shortcodes](https://gohugo.io/content-management/shortcodes/).
<!--more-->

These are reusable snippets of content that you can include in your pages, often using HTML to create effects that are difficult or impossible to do in simple Markdown. Shortcodes can also have parameters that let you, for example, add your own text to a fancy shortcode text box.

## details

{{< details summary="Summary" open=true >}}
#### Markdown content
Lorem est tota propiore conpellat pectoribus de pectora summo.
{{< /details >}}

## figure

{{< figure
  src="https://image.artron.net/wd/auction//118/art/28657/a55dc29b404ae2b145c3f4ae53404f0d.jpg"
  alt="Yellow Crane Tower"
  caption="Yellow Crane Tower"
  width=700
>}}

## highlight

{{< highlight go "linenos=inline, hl_lines=3 6-8" >}}
package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        fmt.Println("Value of i:", i)
    }
}
{{< /highlight >}}

## center

{{% center %}}
Center paragraph.
{{% /center %}}

## ltr

{{% ltr %}}
- This is an markdown list
- It is LTR direction
{{% /ltr %}}

## rtl

{{% rtl %}}
- This is an markdown list
- It is RTL direction
{{% /rtl %}}

## mermaid

{{< mermaid >}}
graph LR;
A[Lemons]-->B[Lemonade];
B-->C[Profit]
{{< /mermaid >}}

## typeit

{{< typeit 
  tag=h4
  speed=50
  breakLines=false
  loop=true
>}}
"Frankly, my dear, I don't give a damn." Gone with the Wind (1939)
"I'm gonna make him an offer he can't refuse." The Godfather (1972)
"Toto, I've a feeling we're not in Kansas anymore." The Wizard of Oz (1939)
{{< /typeit >}}

## tabpane

{{< tabpane >}}
{{< tab "Ruby" >}}

```ruby
puts 'Hello'
```

{{< /tab >}}
{{< tab "Python" >}}

```python
print('Hello')
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js
console.log("Hello");
```

{{< /tab >}}
{{< /tabpane >}}


{{< tabpane align="right" >}}
{{< tab "Ruby" >}}

```ruby
puts 'Hello'
```

{{< /tab >}}
{{< tab "Python" >}}

```python
print('Hello')
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js
console.log("Hello");
```

{{< /tab >}}
{{< /tabpane >}}

## bilibili

{{< bilibili id="BV1qG411Z7UR" >}}

## columns

{{< columns >}}
- #### Left Content
  Dolor sit, sumo unique argument um no. Gracie nominal id xiv. Romanesque acclimates investiture. Ornateness bland it ex enc, est yeti am bongo detract re. Pro ad prompts feud gait, quid exercise emeritus bis e. In pro quints consequent, denim fastidious copious quo ad. Stet probates in duo.

- #### Mid Content
  Dolor sit, sumo unique argument um no. Gracie nominal id xiv. Romanesque acclimates investiture. Ornateness bland it ex enc, est yeti am bongo detract re.

- #### Right Content
  Dolor sit, sumo unique argument um no. Gracie nominal id xiv. Romanesque acclimates investiture. Ornateness bland it ex enc, est yeti am bongo detract re. Pro ad prompts feud gait, quid exercise emeritus bis e. In pro quints consequent, denim fastidious copious quo ad. Stet probates in duo.
{{< /columns >}}

## button

{{< button href="https://github.com/xuchengpeng/.emacs.d" target="_self" >}}
.emacs.d
{{< /button >}}

## alert

{{< alert >}}
**🔵 Info:** Lorem est tota propiore conpellat pectoribus de pectora summo.
{{< /alert >}}

{{< alert "success" >}}
**🟢 Success:** Lorem est tota propiore conpellat pectoribus de pectora summo.
{{< /alert >}}

{{< alert "warning" >}}
**🟡 Warning:** Lorem est tota propiore conpellat pectoribus de pectora summo.
{{< /alert >}}

{{< alert "error" >}}
**🔴 Error:** Lorem est tota propiore conpellat pectoribus de pectora summo.
{{< /alert >}}

## badge

{{< badge title="Hugo" value="0.154.5" >}}

{{< badge "Build" "Passing" >}}
