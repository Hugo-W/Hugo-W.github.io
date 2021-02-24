---
title: "Functional Networks during Speech processing"
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

I will try to measure network-level activity related to speech processing. A first natural way to do so will be to extract functional networks, eventually time-varying versions of those, from similarity measures at both the sensor level and at the source level. Then the idea would be to compare the Dutch listening to condition to the French listening condition, and see the difference in network properties, centrality of nodes, modularity and segregation (clustering coefficient, characteristic path length, syncronisation, etc.) using **graph theoretic metrics**.

A second _path_ of analysis will follo the trail formed by [Cabral J., NeuroImage, 2014][1]: mapping a Kuramoto model to the parcellated brain with MEG activity.

# Notes

## Kuramoto modelling and estimation

The general idea behind Kuramoto model for biological systems can be read in [this great review from 2010](../../Documents/Literature/Kuramoto/2010_Essentials_Kuramoto_Neuroscience.pdf).

The hardest part is in the estimaton of Kuramoto parameters given a time-series. For now, I am focusing a few methods, notably:

1. Estimating the adjacency matric when everything else is know, using _least square_
2. Estimating all the parmaters, time-varying, using _bayesian inference_ [see this paper, and other publications from Stankoski or Lunchinsky][2]

Other methods:

- [Inversing Kuramoto model with neural network](../../Documents/Literature/Kuramoto/InversingKuramotoWithNN.pdf), which actually starts from the least-square formulation... Code available [here](https://github.com/mpanaggio/coupled_oscillator_network_model_reconstruction/)

Using method 1, I was able to reconstruct the adjacency matrix of couplings, but observed a large error (error in the figure is in log scale!) when the coupling constant is increased. Not so much change when the number of nodes is increased though.

![Error of fit on coupling matrix K with random weigths distribution](/assets/error_rdm.png)

## Functional Connectivity from MEG data

I wish to follow methods from [this paper from Deco's group (Nature human behaviour, 2021)][3].

### Preprocessing of MEG data

First preprocessing will be done as follow (quote from [Deco, 2021][3]):

> For each participant, the MEG data were acquired in a single continuous run comprising resting state. As a starting point, we used the preprocessed MEG data from the HCP database. At this level of preprocessing, removal of artefactual independent components, bad samples and channels has already been performed. Following the preprocessing pipeline detailed in ref. 96, MEG data were then downsampled to 250 Hz using an anti-aliasing filter, filtered to remove frequencies below 1 Hz, co-registered with the head models provided by the HCP and source-reconstructed using linearly constrained minimum-variance beamforming97 to the 62 cortical regions of the DK80 parcellation. For each region, a single time series was computed as the first principal component of the voxels within that parcel. Each region’s time series was then standardized to have mean of zero and standard deviation of one, so that the amount of variance was always the same regardless of the depth of the region. To project the results to brain space, we used a weighted mask, where each region had its maximum value at the centre of gravity.
>
We did not apply correction for spatial leakage (volume conduction), because the amount of signal removal would have been too large given the number of regions in the parcellation, thus making the rest of the analysis impossible. Although the similarity with the fMRI results suggests that the impact of signal leakage is not too disruptive for the conclusions of this study, this remains a limitation of this work, and future efforts will be dedicated to rigorous assessment of the impact of different approaches to leakage correction on the NDTE metric, as well as to the consideration of ‘softer’ versions of such leakage correction approaches that can be used in this case

### Normalized directed transfer entropy (NDTE)

Also from [this paper][3].

> To establish and investigate the functional hierarchical organization of whole-brain activity, we first need to characterize how different brain regions communicate with each other, that is, to compute the directed flow between regions. We characterize the functional interaction between two brain regions, in a given parcellation, by an information-theoretical statistical criterion that allows us to infer the underlying bidirectional reciprocal communication. The NDTE framework was inspired by the work of Brovelli and colleagues, who used and validated a similar transfer entropy framework for neuroimaging data25. This framework uses a Gaussian approximation, that is, only second-order statistics of the involved entropies, which means, as shown below, that instead of estimating the probabilities, the method estimates the covariance, which massively facilitates computation. Finally, as also outlined below, we add four key elements to this powerful framework: normalization, multiple timepoints in the past, circular surrogates and aggregation of P values to improve the reliability and robustness of the NDTE framework.

**Definition:**

$$
I(Y_{i+1}; X^i~|~Y^i) = H(Y_{i+1}|~Y^i) - H(Y_{i+1}~|~X^i, Y^i)
$$
Where $Y_{i+1}$ is the activity at time ${i+1}$, while $X^i$ is the entire activity spanning a time window of length $T$ up to time $i$. This measure is **not** symmetrical, allowing for bidirectionnal analysis.

It expresses the statistical dependence between the past of $X$ and the future of $Y$ (hence it is a "strong" form of Granger causality).

To facilitate computation, we can assume a gaussian approximation of neural activity, leading to an estimation of co-dependencies up to only the second-order statistics. Computationally, this allows us to use covariance matrices, and fast linear algebra to compute and estimate entropy of different signals (as the entropy of a gaussian random variable if basically affine in $log$ of the determinant of its covariance matrix).

In order to compare these different weights, one need to normalise these information theoretical measures.

**Normalisation**

$$
F_{XY} = \frac{I(Y_{i+1}~;~ X^i~|~Y^i)}{I(Y_{i+1}~;~ X^i,Y^i)}\\
 = \frac{I(Y_{i+1}~;~ X^i~|~Y^i)}{I(Y_{i+1}~;~ Y^i) + I(Y_{i+1}~;~ X^i|Y^i)}\\
$$

See also [phase transfer entropy](https://www.sciencedirect.com/science/article/pii/S1053811913009191#f0005).

## Ideas

Use DEM (Dynamic Expected Maximisation, from Friston's SPM) to fit both phase **and** amplitude in a Phase-Amplitude coupling model of coupled dynamics [see the code here](https://github.com/allavailablepubliccode/Phase-Amplitude/blob/master/DEM_coupled_oscillators.m).

Carefully address methods for transfer entropy (directed if possible), and build functional connectivity from this.

# Log

* **15/02/21** reading a lot about functional network, non linear dynamics and complex system, especially following the group of G. Deco (Barcelona), after going through [J. Cabral 2014's paper][1] on time-delayed Kuramoto model.... Discovered some interesting modelling of generalised Ising model to assess brain activity, [phase Transfer entropy](https://www.sciencedirect.com/science/article/pii/S1053811913009191#f0005), simply computed from phase from Hilbert and some appropriate binning...

[1]: https://www.sciencedirect.com/science/article/pii/S1053811913011968 "Joana Cabral's 2014 paper time-delayed Kuramoto <-> resting state MEG"
[2]: ../../Documents/Literature/Kuramoto/Stankovski2014_Article_ATutorialOnTime-evolvingDynami.pdf
[3]: https://www.nature.com/articles/s41562-020-01003-6#Sec2