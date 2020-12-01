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

### CSV in bash

```bash
# Here skipping the first line using sed, then piping to the while loop
sed 1d $file | while read col1 col2 col3
do
   echo $col1 $col2 $col3
done
```

### Tests on string in bash

```bash
if [ -z "$var" ];
```

Or

```bash
[ -z "$var" ] && echo "Empty"
```

### Determine if var is empty:

```bash
[[ ! -z "$var" ]] && echo "Not empty" || echo "Empty"
```

```bash
if [ -z "$var" ]
then
      echo "\$var is empty"
else
      echo "\$var is NOT empty"
fi
```
