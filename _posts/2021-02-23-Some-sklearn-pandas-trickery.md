---
layout: post
title: Getting the heterogeneous DataFrame into a sklearn Pipeline
category: perso
toc: true
---

# Fine selection of data columns

## DataFrame with multiple `dtypes`

One often comes across heterogeneous data, where each column of a DataFrame might have different types (hear `dtype`).

Then, we may want to process string-data in one way, and numerical in another way. The preprocessing though might be comon
to one `dtype`. Therefore one way to handle this is to select a sub-dataframe containing only the data type of interest.

An easy way to subselect the columns of one `dtype` is using [`DataFrame.select_dtypes()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.select_dtypes.html):

```python
df.select_dtypes(include=[np.number])
# or
df.select_dtypes(include=['object']) # for string
df.select_dtypes(include=['bool'])
df.select_dtypes(include=[np.int])
# and so on...
``` 

## Make this selection a Sklearn's `TransformerMixin`

The interest is to be able to inject this preprocessing directly into some sklearn [`Pipeline`](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html), in order to be able to stream the entire datframe
to a Pipeline and preprocessing independently our different columns, depending on their `dtypes`.

We simply need to wrap the above `df.select_dtypes` into a `TransformerMixin` inherited class such as:

```python
from sklearn.base import BaseEstimator, TransformerMixin
# Any class depending on BaseEstimator will implenent "fit"
# Then more specifically, TransformerMixin will implement transform

class TypeSelector(BaseEstimator, TransformerMixin):
	def __init__(self, dtype):
		self.dtype = dtype
	def fit(self, X, y=None):
		# we do not have anything to do here
		return self
	def transform(self, X):
		assery isinstance(X, pd.DataFrame)
		return X.elect_dtypes(include=[self.dtype])
```

We can be even more general, and just select a column based on its name directly:

```python
class ColumnSelector(BaseEstimator, TransformerMixin):
	def __init__(self, columns):
		self.columns = columns # also allows for mulitple columns selection
	def fit(self, X, y=None):
		return self
	def transform(self, X):
		return X[self.columns]
```

This simple class can now be used within sklearn Pipelines. Moreover, the result of the transformer is still a dataframe, allowing for further processing.

### Example of further processing

Let's showcase some of the possible post-processing that might occur after such a selection.

#### For string type

Let us imagine that the string in some dataframe represent different categories of some variable. One obvious transformation is to get this into some _categorical_ data representations, either by encoding the class as a different integer or by using a one-hot encoding scheme.
In this example, we will go for the later.

There is a new [`Categorical`](https://pandas.pydata.org/pandas-docs/stable/categorical.html) type introduced recently in Pandas, so we can directly do:

```python
df[col_string] = df[col_str].astype('category')
```

Which will transform our column into a _categorical_ Pandas Series. Under the hood, pandas does some heavy lifting and already encoded the different string into a corresponding integer, and further: it replaced missing values by the `-1` placeholder. The categories and their code can be accessed respectively by:

- `.cat.codde`
- `.cat.categories`

Those are methods included from the `pd.Categorical` pandas' `Series` or `DataFrame` column.

The only change needed to be done in order to pass such dataframe, or series, to the `OneHotEncoder` from sklearn is to replace the missing category value "-1", so we could create a short transformer for this too:

```python

class StringReIndexer(BaseEstimator, TransformerMixin):
	def fit(self, X, y=None):
		return self
	def transform(self, X):
		assert isinstance(X, pd.DataFrame)
		return X.apply(lambda s: s.cat.codes.replace({-1: len(s.cat.categories)}))
```

# Merging our feature back together

Another important step after having taken different path depending on data types, we may want to put the processed features _back together_, for instance if they get further streamed into a classifier or a regressor.

The main utility for this is [`FeatureUnion`](http://scikit-learn.org/stable/modules/pipeline.html#featureunion-composite-feature-spaces).

## Example pipeline

Here is an example of a full pipeline, containing:

- Type selectors
- Conversion of string into categorical one-hot encoding
- Scaling of numerical features
- Union/merging of the different features after selection and transform
- Everything wrapped into a "transformer" Pipeline object

```python
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.preprocessing import OneHotEncoder, StandardScaler
transformer = Pipeline([
    ('features', FeatureUnion(n_jobs=1, transformer_list=[
        # Part 1
        ('boolean', Pipeline([
            ('selector', TypeSelector('bool')),
        ])),  # booleans close
        
        ('numericals', Pipeline([
            ('selector', TypeSelector(np.number)),
            ('scaler', StandardScaler()),
        ])),  # numericals close
        
        # Part 2
        ('categoricals', Pipeline([
            ('selector', TypeSelector('category')),
            ('labeler', StringReIndexer()),
            ('encoder', OneHotEncoder(handle_unknown='ignore')),
        ]))  # categoricals close
    ])),  # features close
])  # pipeline close
```

