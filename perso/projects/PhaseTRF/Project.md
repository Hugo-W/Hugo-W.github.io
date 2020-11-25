---
title: "Phase dependent Responses"
author: "Hugo Weissbart"
geometry: margin=2cm
---

## Notes

Trying to recover the _different_ TRFs, one is generating response for a certain phase of an external diving signal, and the other TRF during another phase of that driver.

If the driver is **slower than the TRFs**, then it sort of works.

![TRFs fast enough](/assets/TRFs_2PhaseSet.png)

![TRFs to slow (or driver to fast)](/assets/TRFs_2PhaseSet_fastDriver.png)

On Figure 2 we see how we fail to recover correctly the two TRFs...

More work has now been done on the simulation side. I sweeped a range of frequency for the carrier defining the slow phase modulation. But also
tried several frequency bandwidth for one of the two TRF giving a sort of threshold that we need indeed very slow phase wave, but also that they might be interference
with one or the other TRF for recnstruction. This is still a bit suspicious...

For the EEG, I tried to extract the phase from the best reconstructing channels. Then the rising and falling phase have been taken on different phases...

### Ideas

- Maybe be more careful in the design matrix of how different data portion is inserted?
- Phase modulation de modulation?
- y = TRF(sin 2*pi fm*t ) * x such as the TRF is `f(phi, t)`n $f=2$

Other EEG related ideas:
- Take the phase from the connected sensors rather than the best reconstructing ones (so one that have strong PLI to the best ones)
- aggregate a measure like _frequency assymetry_ or _hemispheric laterality_ at subject level and do population statistics on those rather than averaging difference TRF (falling-rising) as the latter seems to give only noise...

## Log

#### 28/09/20

* Can estimate and retrieve the two kernels when limited band signal with frequency contents of TRF higher (higher frequencies) than phase modulation
* Seems to still be problems when aligning the TRFs (tmin, tmax ranges, of reconstruction and simulation kernels...)

#### 24/11/20

* Extended the Toy model to analyse effect on frequency of phase leader signal and bandwidth of TRF target
* Started to dig into the EEG side of it
* Possible link with connectivity measure between brain activity and those TRF
* observed and asymmetry (left-right but also theta/delta) in the phase dependent TRFs

