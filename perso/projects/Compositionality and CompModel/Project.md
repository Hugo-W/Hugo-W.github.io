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

1. Toy model of composition cognitive model with oscillations (syntax, structure embedded in oscillatory dynamics):
    - Kuramoto model
    - Reservoir networks, layered/hierarchy of those
2. Analyzing brain data:
    - Finding pairs/structures in naturalistic stimuli and use genralisation trhough time as in [this paper][6]
    - Mapping between MEEG and latent manifolds learned in VAERNN
    - Using existing computational model
3. Trying existing model/adapt them

## Notes and ideas

* sentence gestatz (SG, [paper][1]) for meaning representation, coupled with DORA for phase alignment and relational learning?
* add reservoir networks inside those SG, DORA, ...?
* VAE for sentence representations

_10/11/20_ : This is a new proposition and results from a [recent paper](https://www.researchgate.net/publication/345184917_Overt_and_covert_prosody_are_reflected_in_neurophysiological_responses_previously_attributed_to_grammatical_processing) (sept. 2020) showing the confound between prosody and syntactic cues, in a way diminishing the impact of Ding and Peoppel 2016's paper on syntax. It has to be kept in mind for my publication of personal paper 2, or pfuture work on _merge_/composition of syntax?

![Schematic of the proposition by A. Glushko, 2020](figures/Prosody_vs_Syntax.jpg)}{width=33%}

### Project 1: Toy Model of composition

Hierarchical representations are embedded in the neural trajectories, in their dynamics.

Test _hierarchy_ of reservoir networks (ref: [deep echo state networks][2]) to achieve different scales (bottom > acoustic, high > syntactic). beta / delta coupling?

#### Kuramoto model

This project has been in our mind for a bit. The general equation for a Kuramoto model is:

$$
\dot{\theta_i} = \omega_i + \sum_{i-1}^Nk_{ij}\sin(\theta_j - \theta_i)
$$

A random networks of couple oscillators can be simulated and summarised as follow using my `Kuramoto` python class:

![sumamry example](figures/rdm_kuramoto_summary.png){width=75%}

Inference models can be built to estimate Kuramoto model from time-series data, see [here][4] and [this blog article][3].

I feel like we need to incorporate the idea of **phase-amplitude coupling** though, as seen in [this article with K. Friston][5].

_13/01/2021_

An apparent solution to allow slow correlated signal to emerge from such models is to inject time-delays in the coupling between phase oscillators. This idea has been explored by [Joana Cabral](https://sites.google.com/site/cvjoanacabral/my-codes) in several of her papers notably: [Cabral et al.(2011) NeuroImage](http://www.sciencedirect.com/science/article/pii/S1053811911003880) and [Cabral et al.(2014) NeuroImage](http://www.sciencedirect.com/science/article/pii/S1053811913011968). Her code has been translated in Python too. So the key is to add some delay in the connectivity, which she extract from DTI images, infering them from fibre tract lengths**:
$$
\dot{\theta_i}(t) = \omega_i + \sum_{i-1}^Nk_{ij}\sin(\theta_j(t-\tau_{ij}) - \theta_i(t)) \\
\text{where } \tau_{ij} = \frac{V}{L_{ij}}
$$
With $V$ the average speed of information flow/synchronisation spread and $L_{ij}$ the fibre tract length between node $i$ and $j$.

### Project 2: MEG and EEG analysis

* Find all pairs of word with the structure: `N - ADJ` or `ADJ - N`
* Possibly use a NER to get back to which predicate is a person etc...?
* Decoding Adj from previous neural representation of the compound...?

For now, in the English text of my EEG dataset, I found:

- 170 compounds (N-ADJ)
- 80% of nouns are unique (so some are repeated twice, very few)
- 67% of unique adjectives, some more repeats (max repeat for "old", 8 times, then "few", "little", "own", "female"

There could be much more added to this namely constituents such as `ADV-V`, etc... This has been discussed with _Ryan_, the project then also touches ideas from composition of _meaning_ and semantics.

`ADV-V` are quite difficult to track in the parse tree, and it seems also that `JJ-NN` may occur more than it first seem. Going through the constituency parse tree might not be solution... Maybe better to go through a dependency graph? Using `amod` attribute?

_12/11/20_ Yes, we will go through dependency graphs instead of constituent ones. Looking for any kind of modifier/modifiee cases.
I will also check how many words need to be used in order to start getting a significant decoding at the subject level for `JJ` vs `NN`...

#### Decoding

It seems unlikely to be able to classify individual words, so one better idea could be to classify/decode **animacy** or **word category** from either the entire **2 words phrase** or from the **adjective alone**.

_02/11/2020_ - As seen in [this article][6] we could retrieve/decode brain representation of the first word in the representation of the second word within a 2-words compound.

The idea, borrowed from the article mentioned above is summarised in the figure below.

![Temporal Generalisation](figures/TGM_ADJ_NOUN_Fysche2019.png){width=75%}

_10/11/2020_: So far, big fail at decoding only ADj vs NN in ERP and temporal generalisation (multivariate decoding for each lag).... Big Big Fail.

#### Role of JJ: Verbal phrase vs Noun Phrase

Another idea would be to compare adjective attributed to a noun via a verbal phrase or directly as an adjective in a nominal phrase.

#### On the use of Language Models: Transformers model and a  new python library

_13/01/2021_

New possibilities with using state-f-the art models and especially transformers models. These are being made readily available using [:hugs: Transformers](https://huggingface.co/transformers/) ([Wolf et al., 2019][7]) where we can find a huuuge amount of [trained models](https://huggingface.co/gpt2?text=A+long+time+ago%2C+) and utility functions and wrappers to fine-tune them and query them for predictions. Some common tasks are explicitly described on their website:

- [Language modelling](https://huggingface.co/transformers/task_summary.html#language-modeling) , see [an example jupyter notebook](https://github.com/huggingface/notebooks/blob/master/examples/language_modeling.ipynb), or also a set of [utilities script](https://github.com/huggingface/transformers/tree/master/examples/language-modeling) for fine tuning
- [NER](https://huggingface.co/transformers/task_summary.html#named-entity-recognition)
- [Autoencoders](https://huggingface.co/transformers/model_summary.html#autoencoding-models)
- [Seq 2 seq models](https://huggingface.co/transformers/model_summary.html#sequence-to-sequence-models)

With also some nice explanations about [padding and trunctaing](https://huggingface.co/transformers/preprocessing.html#everything-you-always-wanted-to-know-about-padding-and-truncation) input sequences. Basically their tokenizer do the job of tokenizing, encoding into integers, and padding and/or truncating sequences.

A summary of the library's philosophy can be found [here](https://huggingface.co/transformers/philosophy.html).

An idea could be to directly used features (see [this pipeline](https://huggingface.co/transformers/main_classes/pipelines.html#featureextractionpipeline)) from a pre-trained causal language model like `GPT-2 `or `distilBert` to get feature sequence time series on which we could run (with FFT for instance) the mapping to symbolic features.

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
* [Adj-noun phrases in the brain - Fyshe 2019][6]
* [HuggingFace's Transformers: State-of-the-art NLP, 2019][7]

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

#### 02/11/20

* Completed some biblio about Fyshe 2019, added the figure to explain the idea
* Started some code to extract also `Adv-VB` phrases
* decoding started...

#### 09/11/2020

* A bit more work on the MEG analysis for composition, trying to extract the onset of those 2-words phrase structures
* Problem encountered (as in the past already...):
    - punctuation still present in parse but not in TextGrid
    - "M." is only "M" in TextGrid (probably not even mapped to "mister" phonemes...)
    - Some words are not separated in TextGrid data such as "I've", "Does'nt" but they are in the parse
    - Compound word are separated in TextGrid data but not in Stanford parser (tennis-court)
    - Some words still have a trailing whitespace in the TextGrid Data!!!

#### 10/11/2020

* No result at all in the simple task of decoding: ADJ vs NN ... Need more epochs? Do across subject?
* WHat else? How could we possibly decode semantic features if we can't discriminate word category between both instances...
* Also big fail in tthe ICA for those files... Something is fishy!!

#### 13/01/2021

- Added the text about Transformers library :hugs:
- Added corresponding article in biblio for those notes
- Notes about Joana Cabral's code and work on Kuramoto model with time delays to fit brain network model

[1]: ../../Biblio/rabovsky2018.pdf "Link to file"
[2]: https://www.sciencedirect.com/science/article/pii/S0893608018302223?via%3Dihub "Link to article"
[3]: https://laszukdawid.com/2015/05/18/bayesian-inference-in-kuramoto-model/ "Link to blog article"
[4]: ../../Documents/Literature/Kuramoto/bayesian_dynamic_model_oscillators_tuto.pdf "Link to file"
[5]: ../../Documents/Literature/Kuramoto/Friston_kuramoto_PAC.pdf "Link to file"
[6]: ../../Documents/Literature/Composition/Fyshe_etal2019.pdf "Link to file"

[ 7 ]: https://arxiv.org/abs/1910.03771 "Link to Hugging face Transformer article"

