---
title: "Matplotlib: Work with threads"
date: "2024-12-19"
categories: ["Python"]
tags: ["Python", "Matplotlib"]
---

Matplotlib is not thread-safe: in fact, there are known race conditions that affect certain artists. Hence, if you work with threads, it is your responsibility to set up the proper locks to serialize access to Matplotlib artists.

<!--more-->

You may be able to work on separate figures from separate threads. However, you must in that case use a non-interactive backend (typically Agg), because most GUI backends require being run from the main thread as well.

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.savefig("1.jpg")
plt.close()
```

