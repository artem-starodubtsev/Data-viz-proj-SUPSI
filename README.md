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
This project examines the profound influence of geographic location and socioeconomic status on individual nutritional outcomes and lifestyle behaviors. While globalization has increased food availability, it has also created a "food environment" disparity where wealth and location dictate access to quality nutrition. Exploring scientific, geographical and financial data, this study analyzes relationships between the citated factors and how they vary over continents. The findings suggest that health is not merely a result of individual "willpower," but is heavily structured by the cultural, environmental and financial constraints of one's surroundings. The project concludes by exposing some of the insights captured by the group.

## Introduction
In the modern era, the old dictum "you are what you eat" has evolved into a more complex reality: you are what you can afford and access. While personal choice plays a role in health, the structural forces of geography and wealth act as the primary architects of our daily lives.

Where a person lives determines their "food environment." In many developed nations, this has led to two phenomena:
- Food deserts: areas where fresh, affordable, and nutritious food is unavailable.
- Food swamps, where an abundance of high-calorie, low-nutrient fast food overwhelms healthy options.

Wealth acts as a buffer against poor health. High-income individuals can afford "health premiums," such as organic products, specialized diets, and gym memberships. In opposition, for those in lower socioeconomic brackets, energy-dense but nutrient-poor foods (like refined grains and sugars) are often the most rational economic choice, as they provide the highest calorie count per dollar.

## Data sources
Here are the links to he original datasets for Our World in data:

- [Dataset 1 on obesity](https://ourworldindata.org/grapher/share-of-adults-defined-as-obese?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 2 on the world population](https://ourworldindata.org/grapher/population-with-un-projections?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 3 on the cost of a healty diet](https://ourworldindata.org/grapher/cost-healthy-diet?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 4 on GDP per capita](https://ourworldindata.org/grapher/gdp-per-capita-worldbank?v=1&csvType=full&useColumnShortNames=false)

## Data pre-processing

### **1. Data Loading and Cleaning**

* **Datasets Loaded:** The script imports datasets concerning Obesity rates, Cost of a Healthy Diet, GDP per capita, Population projections.
* **Filtering:** The time range was restricted primarily to **2017-2023** across all datasets.
* **Standardization:** Complex column names were renamed to simpler identifiers (e.g., `gdp`, `bmi`, `population`) and unnecessary columns (like specific country codes or demographic variants) were dropped.

### **2. Feature Engineering and Merging**

* **Master DataFrame:** A unified DataFrame was created by merging the Cost of a Healthy Diet, GDP, Population, and Obesity data based on `Year` and `Entity` (country).
* **Geographic Mapping:** A `Region` column was added to the master DataFrame using the `CountryConverter` library to classify entities into continents (e.g., Europe, Africa).
* **Data Types:** Population figures were converted to integers and rows with missing values were removed to ensure data quality.
* * **Inputation:** since some years and regions were misrepresented/missing there was the necessity to impute some of those missing values.

[Jupyter notebook with preprocessing](assets/preprocessing.ipynb)

## Data visualizations
We chose to visualise important data surrounding the research following questions:

- How does economic wealth (GDP per capita) relate to BMI?

- How does geography/region affects the affordability of a healthy diet across regions?

- What is a general trend on obesity across all regions?

These three important questions are explored with the following visualisations:

### Wealth vs. BMI
A bubble chart comparing countries’ GDP per capita (log scale) on the x-axis to BMI on the y-axis. Color groups countries by region and bubble size represents a third variable (typically country size such as population). A year slider lets you see how the relationship changes over time (e.g., 2017-2023).

[<img src="assets/v1.png" width="800" alt="Placeholder image">]()

### Regional Overview
A map of regions shaded by the cost per day for a healthy diet (darker = higher cost), with a color bar indicating the dollar range. Year slider shows how costs evolve over time.

[<img src="assets/v2.png" width="800" alt="Placeholder image">]()

### Obesity Trend
A multi-line trend chart showing adult obesity rates by region from 2017 to 2022. Each colored line represents a region, making it easy to compare levels and trends—overall, the rates rise over time, with the Americas highest and Africa lowest in this view.

[<img src="assets/v3.png" width="800" alt="Placeholder image">]()


## Key findings
1. 

## Next steps
???
