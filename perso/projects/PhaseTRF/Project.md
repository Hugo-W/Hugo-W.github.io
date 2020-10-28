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


### Ideas

- Maybe be more careful in the design matrix of how different data portion is inserted?
- Phase modulation de modulation?
- y = TRF(sin 2*pi fm*t ) * x such as the TRF is `f(phi, t)`n $f=2$

## Log

#### 28/09/20

* Can estimate and retrieve the two kernels when limited band signal with frequency contents of TRF higher (higher frequencies) than phase modulation
* Seems to still be problems when aligning the TRFs (tmin, tmax ranges, of reconstruction and simulation kernels...)



