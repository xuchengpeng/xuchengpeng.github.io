---
title: "Mermaid Support"
date: 2025-04-30T09:03:27+08:00
categories: ["Web"]
tags: ["Mermaid", "Hugo"]
---

Mermaid lets you create diagrams and visualizations using text and code.

It is a JavaScript based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically.
<!--more-->

## Hugo Integration

### Shortcodes

`layouts/shortcodes/mermaid.html`:

```html
<pre class="mermaid" align="center">
  {{ .Inner | htmlEscape | safeHTML }}
</pre>
```

### Head

`layouts/partials/head.html`:

```html
{{ if .Page.HasShortcode "mermaid" }}
{{ partial "mermaid.html" . }}
{{ end }}
```

`layouts/partials/mermaid.html`:

```html
<script type="module">
  let theme = document.documentElement.classList.contains("dark") ? "dark" : "default";
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: theme });
</script>
```

## Examples

Learn [Mermaid's Syntax](https://mermaid.js.org/intro/syntax-reference.html).

### Flowchart

```md
{{</* mermaid */>}}
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
{{</* /mermaid */>}}
```

{{< mermaid >}}
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
{{< /mermaid >}}

### Sequence diagram

```md
{{</* mermaid */>}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
{{</* /mermaid */>}}
```

{{< mermaid >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
{{< /mermaid >}}

### Class diagram

```md
{{</* mermaid */>}}
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
{{</* /mermaid */>}}
```

{{< mermaid >}}
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
{{< /mermaid >}}
