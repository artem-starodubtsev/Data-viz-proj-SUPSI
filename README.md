SUPSI 2025-26  
Data Visualization course

# Where you live determines what you eat
Authors: [Artem Starodubtsev](https://github.com/artem-starodubtsev), [Petar Hristov Neykov](https://github.com/peykoff), [Mahdi Hamrouni](https://github.com/MahdiHamrouni)

We do not have a web page as we need to deploy backend.

Here is how you can launch app:

```terminaloutput
cd <project_root>

docker compose up
```

after that navigate to [localhost:5173](localhost:5173)

## Abstract
Madhi

## Introduction
Madhi

## Data sources
Petar put links to datasets here below:

[Main datasource](https://www.kaggle.com/datasets/zafarali27/netflix-movies-and-tv-shows)

## Data pre-processing
Petar

```Python
import pandas as pd

df = pd.read_excel("data/data.xlsx")

df = df[df["Entity"] != "World"]
df = df[df["Entity"].isin(set(df.loc[df["Year"] == 2018, "Entity"]))]
```

## Data visualizations
ABOBA

### Wealth vs. BMI
[<img src="assets/v1.png" width="800" alt="Placeholder image">]()

### Regional Overview
[<img src="assets/v2.png" width="800" alt="Placeholder image">]()

### Obesity Trend
[<img src="assets/v3.png" width="800" alt="Placeholder image">]()


## Key findings
Mahdi

## Next steps
???
