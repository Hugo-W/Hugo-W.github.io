---
layout: post
title: "Useful bash, and linux commands"
categories: perso
---

## A short list of some useful commands that crossed my path

### PDF related

To extract some pages from a pdf file:
```bash
gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dFirstPage=1 -dLastPage=10 -sOutputFile=output.pdf input.pdf
```


