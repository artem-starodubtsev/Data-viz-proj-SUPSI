SUPSI 2025-26  
Data Visualization course

# Project title
Authors: [Artem Starodubtsev](https://github.com/artem-starodubtsev), [Petar Hristov Neykov](https://github.com/peykoff), [Author n. 3](https://github.com/giovannipro)

[PAGE PLACEHOLDER](google.com)

## Abstract
ABOBA

## Introduction
ABOBA

## Data sources
Petar put links to datasets here below:

[Main datasource](https://www.kaggle.com/datasets/zafarali27/netflix-movies-and-tv-shows)

## Data pre-processing
??? what should we put here? whole py file with pandas ???

```Python
import pandas as pd

df = pd.read_excel("data/data.xlsx")

df = df[df["Entity"] != "World"]
df = df[df["Entity"].isin(set(df.loc[df["Year"] == 2018, "Entity"]))]
```

## Data visualizations
ABOBA

### Title of the data visualization n. 1 
ABOBA
if we have interactive thingy can we embed here?
[<img src="assets/images/03.png" width="800" alt="Placeholder image">]()

### Title of the data visualization n. 2
ABOBA
if we have interactive thingy can we embed here?
[<img src="assets/images/04.png" width="800" alt="Placeholder image">]()


## Key findings
ABOBA

## Next steps
ABOBA
