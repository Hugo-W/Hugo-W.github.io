---
documentclass: article
fontsize: 11
title: MOUS Project
author: Sophie Slaats, Hugo Weissbart
geometry: margin=2cm
urlcolor: blue
toc: true
toc-depth: 3
bibliography: biblio.bib
---

## The dataset

First of all, find attached an overview I did of info on the data set. There is some information about the annotations and materials, as well as brief summaries of previous publications. A crucial thing with respect to the auditory stimuli is that no one has been able to contrast the word lists and the sentences, because of the large auditory response. I think the TRFs could prove a great opportunity to be the first ones here :-)

Here is the link to the Donders repository of the dataset: [https://data.donders.ru.nl/collections/di/dccn/DSC_3011020.09_236?0](https://data.donders.ru.nl/collections/di/dccn/DSC_3011020.09_236?0).

The dataset collection is described in the published article from @Schoffelen2019.
 
**Plans for the project**:

The idea Andrea and I have, consists of three parts.

1. Try to fit higher-level TRFs on the data: the dependency length (based on a dependency parse);
2. Compare word-level models in a sentence/word list;
3. Create a source model.

We agreed that doing a sentence/word list comparison would be possible if we use envelope and word onset to filter out any response related to the start of the recording. The final idea we had was using corpus-derived word frequency measures as a word-level predictor, and see how resulting TRF models differ as a function of the condition (sentence/word list). This would be an indicator of how structural top-down information affects word-level processing. We could further see if the _difference between the word models for sentences and word lists is dependent on word frequency, i.e., does the difference increase for lower frequency words?_
 
(Relatedly, given the design I have thought of for the new MEG set, it would be possible to do this **also for lower levels of representation**: what does word-level context do to syllable or phoneme processing? How does individual item predictability affect the strength of top-down influence? Etc.)

## To do now

- Sophie: “Sanity check TRFs”: try broadband envelope TRFs (band-pass filtered e.g. 1-12 Hz)
    1. ~~No artifact rejection~~
    2. ~~Artifact rejection, but keeping only intact trials~~
    3. ~~Determine one lambda~~ (lambda = mean(eig(Xt*X)))
    4. ~~new pe-processing pipeline (reject trials and channels based on extreme values)~~
    5. ~~Predictor spike funcitons~~
    6. Finish plots, and compare theta, theta power and delta as in [@Donhauser2020]
- Hugo:
    1. ~~Look at data for 1 participant~~
    2. ~~Find & forward paper on envelope predictor~~
    3. ~~sum of matrices by block~~
    4. Implement routines for source localization
    


## Work in progress

### My TRF attempt

A quick loading of the data show that we have to compute TRFs across subjects with concatenated trials, and especially **not** per trial and averaging TRF coefficients later on!

Anyway, it worked well enough and gave me the following figures.

![Envelope, broadband TRFs for each subjects](/assets/indiv_TRF_envelope.png)

![Envelope TRF, grand average](/assets/grandAvg_TRF_envelope.png){width=33%}

Now we are conducting the analysis using the Fieldtrip processed MEG data imported into MNE and Python. We extracted all word onset as well as word frequency and could already see a difference (here for 30 subjects) between sentence and word list conditions. The effect seen in word onset and word frequency must be ran against statistical analysis and also we must now proceed to the reconstruction accuracies with different model to draw further conclusions.

![Grand average (30 subjects) envelope TRFs for each condition](/assets/grd_avg_trfs_30subj.png){width=50%}

![Grand average (10 subjects) envelope + word features TRFs (red: word list condition)](/assets/wordlvl_trf_sentences.png){width=75%}

### Decoding

I (Hugo) tried to implement a TRF-based decoder, with the aim of decoding the condition: Word list vs Sentence using only the reconstruction accuracy of the TRF models.

This can then be achieved using different time windows for the TRF. We therefore have a pair of model set (word list and sentence TRF model, each with all feature sets[^1]) for each time windows ([-100,0], [0, 100], etc...) and the decoding accuracy can be computed per time slices. For each feature set and each time slices we therefore have a different accuracy, see [@fig:decoding].

At each time slice, we can compute the contribution of each model. For instance it may be that all three models[^1] have similar accuracies, then that implies that the envelope feature is the main "responsible" for reconstructing and then decoding the condition for that given time window, this is also shown on [@fig:decoding].

![Decoding accuracy, through time. The pie chatts indicate the proportion of explained accuracies above significance per feature set.](/assets/timed_decoding_withCamembert.png){width=33% #fig:decoding}

[^1]: feature sets: envelope, env + word onsets, env + wo + word frequency

## Log

#### 08/10/20

* implemented some code in the notebook to get the events, corresponding stimulus id, and load + resample meg data
* missing some stimulus, need to download them from webdav
* All individual TRFs are so similar that averaging them gives same result, noise is the same for every subject... something is wrong in her code?
* need to finish up this single subject study

#### 12/10/20

* still downloading file one by one.. it takes AGES
* my TRF seems to work, want to see on different subject
* Implemented the summation across trial, it gives equivalent result

#### 22/10/20

* these past days I have finished resampling the few subjects I have and computing TRF across them
* updating logs and adding figures to this readme
 
#### 10/11/20

* now importing data to MNE from the processed fieldtrip structures
* word onset and word frequency extracted automatically, now using the **SUBTXT-NL** dataset for 1-grams
* Finished to implement the word-level models in the example notebook

#### 18/12/20

* Sophie finished most of her code, now going through everyone and comparing score reconstruction, topo, etc...
* I also implemented a decoder to quickly decode sentence vs list from TRFs, checking the time course of decoding on the way

#### 07/01/21

* Updated this file with figures from time decoder and accompanying text

## Bibliography