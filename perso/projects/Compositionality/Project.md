---
documentclass: article
fontsize: 11
title: Projects on Compositionality
author: Hugo Weissbart
geometry: margin=2cm
urlcolor: blue
toc: true
toc-depth: 3
---

# Notes, references, ideas and journaling

This document contains log and notes on projects regarding study on compositionality.

## Summary

For this study-arch, I will focus on different computational and cognitive models for composition in language processing.
This can deal with either syntactic composition, such as the formation of phrase structures, or with semantic relations.
One goal is then to come up with new computational model with predictive power to test possible hypothesis and play them against observations.
Another goal is then to compare results of simulations across those different models against neuroimaging data (MEG/EEG mainly).

So in summary we have:

- Toy model of composition cognitive model with oscillations (syntax, structure embedded in oscillatory dynamics)
- Analyzing brain data:
    - Finding pairs/structures in naturalistic stimuli
    - Using existing computational model
- Trying existing model/adapt them

## Notes and ideas

* sentence gestatz (SG, [paper][1]) for meaning representation, coupled with DORA for phase alignment and relational learning?
* add reservoir networks inside those SG, DORA, ...?
* VAE for sentence representations

### Project 1: Toy Model of composition

Hierarchical representations are embedded in the neural trajectories, in their dynamics.

Test _hierarchy_ of reservoir networks (ref: [deep echo state networks][2]) to achieve different scales (bottom > acoustic, high > syntactic). beta / delta...

#### Kuramoto model

This project has been in our mind for a bit. The general equation for a Kuramoto model is:

$$
\dot{\theta_i} = \omega_i + \sum_{i-1}^Nk_{ij}\sin(\theta_j - \theta_i)
$$

A random networks of couple oscillators can be simulated and summarised as follow using my `Kuramoto` python class:

![sumamry example](/assets/rdm_kuramoto_summary.png){width=75%}

Inference models can be built to estimate Kuramoto model from time-series data, see [here][4] and [this blog article][3].

I feel like we need to incorporate the idea of phase-amplitude coupling though, as seen in [this article][5].

### Project 2: MEG and EEG analysis

* Find all pairs of word with the structure: `N - ADJ` or `ADJ - N`
* Possibly use a NER to get back to which predicate is a person etc...?
* Decoding Adj from previous neural representation of the compound...?

For now, in the English text of my EEG dataset, I found:

- 170 compounds (N-ADJ)
- 80% of nouns are unique (so some are repeated twice, very few)
- 67% of unique adjectives, some more repeats (max repeat for "old", 8 times, then "few", "little", "own", "female"

There could be much more added to this namely constituents such as `ADV-V`, etc... This has been discussed with _Ryan_, the project then also touches ideas from composition of _meaning_ and semantics.

##### Decoding

It seems unlikely to be able to classify individual words, so one better idea could be to classify/decode **animacy** or **word category** from either the entire **2 words phrase** or from the **adjective alone**.

##### Role of JJ: Verbal phrase vs Noun Phrase

Another idea would be to compare adjective attributed to a noun via a verbal phrase or directly as an adjective in a nominal phrase.

### Project 3: Existing model to adapt/learn from

- VAERNNLM
- Reservoir networks
- Deep ESN
- DORA
- SG

## Bibliography

* [Article on SG, 2018, M. Rabovsky, Nature human behavuour][1]
* [Article on Deep ESN, 2018][2]
* [Blog article for Kuramoto modelling in Python][3]
* [Article PDF for Bayesian modelling of dynamic systems][4]
* [Phase Amplitude and Kuramoto models - Friston 2020][5]

## Log

#### 22/09/20

* Started to write this log project/outline
* got some articles out (not yet read)
* Starting the NLP/text mining implementation in order to extract the relevant structures from my data

#### 23/09/20

* Get `N - ADJ` phrases from text, apply Stanford parser and find those NP 2 leaves structures
* Counted pairs, and looked at number of occurrences of each words

#### 20/10/20

* Redid the Kuramoto simulation code
* because lost everything before
* need to reput the biblio here... -> DONE

#### 21/10/20

* Kuramoto improved with jacobian added
* need to add noise?
* Bayesian still to do

[1]: ../../Biblio/rabovsky2018.pdf "Link to file"
[2]: https://www.sciencedirect.com/science/article/pii/S0893608018302223?via%3Dihub "Link to article"
[3]: https://laszukdawid.com/2015/05/18/bayesian-inference-in-kuramoto-model/ "Link to blog article"
[4]: ../../Documents/Literature/Kuramoto/bayesian_dynamic_model_oscillators_tuto.pdf "Link to file"
[5]: ../../Documents/Literature/Kuramoto/Friston_kuramoto_PAC.pdf "Link to file"
