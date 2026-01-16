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
Madhi

## Data sources
Here are the links to he original datasets for Our World in data:

- [Dataset 1 on obesity](https://ourworldindata.org/grapher/share-of-adults-defined-as-obese?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 2 on the world population](https://ourworldindata.org/grapher/population-with-un-projections?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 3 on the cost of a healty diet](https://ourworldindata.org/grapher/cost-healthy-diet?v=1&csvType=full&useColumnShortNames=false)

- [Dataset 4 on GDP per capita](https://ourworldindata.org/grapher/gdp-per-capita-worldbank?v=1&csvType=full&useColumnShortNames=false)

## Data pre-processing
Based on the provided notebook, here is a description of the data processing workflow formatted in Markdown:

### **1. Data Loading and Cleaning**

* **Datasets Loaded:** The script imports datasets concerning Obesity rates, Cost of a Healthy Diet, GDP per capita, Population projections, Food Waste, and Undernourishment.
* **Filtering:** The time range was restricted primarily to **2017–2024** across all datasets.
* **Standardization:** Complex column names were renamed to simpler identifiers (e.g., `gdp`, `bmi`, `population`, `undernourishment_percent`) and unnecessary columns (like specific country codes or demographic variants) were dropped.

### **2. Feature Engineering and Merging**

* **Master DataFrame:** A unified DataFrame was created by merging the Cost of a Healthy Diet, GDP, Population, and Obesity data based on `Year` and `Entity` (country).
* **Geographic Mapping:** A `Region` column was added to the master DataFrame using the `country_converter` library to classify entities into continents (e.g., Europe, Africa).
* **Data Types:** Population figures were converted to integers and rows with missing values were removed to ensure data quality.

### **3. Output Generation**

The notebook exports three distinct cleaned CSV files for further analysis:

* `data.csv`: The combined dataset containing GDP, Diet Cost, Population, Region, and Obesity/BMI data.
* `data_food_waste.csv`: Contains metrics for retail, out-of-home, and household food waste per capita.
* `data_undernourishment.csv`: Contains the prevalence of undernourishment percentages by country.

---

[Jupyter notebook with preprocessing](assets/preprocessing.ipynb)

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
