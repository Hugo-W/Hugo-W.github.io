---
title: "Phase dependent Responses"
author: "Hugo Weissbart"
geometry: margin=2cm
---

## Notes

Trying to recover the _different_ TRFs, one is generating response for a certain phase of an external diving signal, and the other TRF during another phase of that driver.

If the driver is **slower than the TRFs**, then it sort of works.

<img src="/assets/TRFs_2PhaseSet.png" alt="TRFs fast enough" style="zoom:67%;" />

<img src="/assets/TRFs_2PhaseSet_fastDriver.png" alt="TRFs to slow (or driver to fast)" style="zoom: 67%;" />

On Figure 2 we see how we fail to recover correctly the two TRFs...

More work has now been done on the simulation side. I swept a range of frequency for the carrier defining the slow phase modulation. But also
tried several frequency bandwidth for one of the two TRF giving a sort of threshold that we need indeed very slow phase wave, but also that they might be interference
with one or the other TRF for reconstruction. This is still a bit suspicious...

For the EEG, I tried to extract the phase from the best reconstructing channels. Then the rising and falling phase have been taken on different phases... 

We can see that the reconstruction is polarized indeed, there exists a cluster phases for which it seems that "rising is better than falling phases":

![Reconstruction accuracy per phase bin, in blue rising phase is leading, in red, falling phase is leading.](/assets/Score_based/PhaseScore_P05_14072016.png)

Also we can observe for the two sets of TRF a different in their time course as well as frequency spectrum:

<img src="/assets/Score_based/PhaseTRF_P05_14072016.png" alt="TRF for rising and falling phase, as well as corresponding spectrum for each sensor." style="zoom: 67%;" />

### Ideas

- Maybe be more careful in the design matrix of how different data portion is inserted?
- Phase modulation de modulation?
- $y = TRF(sin (2*\pi f_m*t )) * x$ such as the TRF is $f(\phi, t)$, $f=2$

Other EEG related ideas:
- ~~Take the phase from the connected sensors rather than the best reconstructing ones (so one that have strong PLI to the best ones)~~
- aggregate a measure like _frequency asymmetry or _hemispheric laterality_ at subject level and do population statistics on those rather than averaging difference TRF (falling-rising) as the latter seems to give only noise...

## Log

#### 28/09/20

* Can estimate and retrieve the two kernels when limited band signal with frequency contents of TRF higher (higher frequencies) than phase modulation
* Seems to still be problems when aligning the TRFs (tmin, tmax ranges, of reconstruction and simulation kernels...)

#### 24/11/20

* Extended the Toy model to analyse effect on frequency of phase leader signal and bandwidth of TRF target
* Started to dig into the EEG side of it
* Possible link with connectivity measure between brain activity and those TRF
* observed and asymmetry (left-right but also theta/delta) in the phase dependent TRFs

#### 18/12/20

* lots of water ran under the bridge: finished to compute reconstruction differences for many phases for each subject, for now looking only at envelopes and taking the phase signal from some other channel PLI related or from best reconstructing channels
* I observed usually 2 best phase and 2 worst phase clusters, need to run some stats on this
* difficult to interpret those results
* TODO: check with linguistic signal as leader phase instead of brain signals
