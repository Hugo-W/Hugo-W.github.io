---
title: "Predictive Coding for Speech comprehension"
author: "Hugo Weissbart"
geometry: margin=2cm
toc: true
urlcolor: blue
linkcolor: blue
toccolor: 'violet'
fontsize: 11
numbersections: true
date: 10/02/21
output: 
    pdf_document:
        pandoc_args: ["--filter=C:\\pandoc-crossref.exe"]
---

This project is a long running one where I look for evidence or counter-evidence for predictive coding mechanisms during speech comprehension. The made idea is that higher level of representations are
leveraging _updates_ by predicting neural activity representing lower levels. This should happen between every level of the hierarchy. As an example, if a word is strongly expected/predicted but another word, more suprising, occurs, then this should elicit a strong prediction error that will be passed up the hierarchy (from acoustic to word-level representations).

The project will look at every possible testable hypothesis on measured EEG or MEG activity as well as putative computational models implementing such mechanisms.

## Testing The theory using MEEG

### Relationship between reconstruction accuracy of acoustic features and linguistic features

The first goal is to see how a time resolved accuracy of reconstruction of the acoustic envelope from meeg signals vary with linguistic features.

### Ideas

- I want to try with:
  - Entropy
  - Surprisal _and_ weighted surprisal (by entropy)
  - KL "update"

## Log


