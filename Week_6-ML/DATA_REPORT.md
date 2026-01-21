# Data Analysis & Quality Report

## 1. Project Objective

To analyze the raw e-commerce dataset, identify quality issues (missing data, duplicates, outliers), and validate the cleaned dataset for the machine learning pipeline.

---

## 2. Raw Data Diagnosis

### A. Data Structure

- **Source:** `../data/raw/raw_Data.csv`
- **Check:** Verified dimensions (Shape), data types (Info), and summary statistics (Describe).

### B. Missing Values

- **Observation:** Missing data found primarily in categorical columns (`Gender`, `City`, `Payment_Method`) and `Customer_Rating`.
- **Pattern:** Missingness appears random with no critical column exceeding >30% missingness.
- **Visual:** Confirmed via Heatmap.

### C. Duplicates

- **Exact Duplicates:** 30 exact row duplicates identified.
- **ID Duplicates:** Multiple occurrences of `Transaction_ID` found (data integrity issue). `Customer_ID` duplicates exist but are valid (repeat customers).

### D. Outliers & Anomalies

- **Age:** Contains invalid negative values and unrealistically high values.
- **Unit_Price:** Contains negative prices and extreme high values.
- **Quantity:** Heavily right-skewed.
- **Inconsistencies:** `Gender` has mixed labels (e.g., 'Male', 'M'), `Payment_Method` has inconsistent casing, and `Date` requires format conversion.

---

## 3. Data Cleaning Strategy (Applied in Pipeline)

Based on the diagnosis, the following rules were defined:

| Issue               | Strategy                                                                                   |
| :------------------ | :----------------------------------------------------------------------------------------- |
| **Missing Values**  | Impute Categoricals with **Mode**; Impute Rating with **Median**.                          |
| **Duplicates**      | Remove all 30 exact duplicates. Keep only the first occurrence of unique `Transaction_ID`. |
| **Outliers**        | Drop rows with invalid `Age` or `Unit_Price`. Cap `Quantity` using IQR method.             |
| **Standardization** | Normalize `Gender` (M/F/Non-Binary) and `Payment_Method`. Convert `Date` to Datetime.      |

---

## 4. Post-Cleaning Validation

The processed file (`../data/processed/cleaned_Data.csv`) was loaded to verify the pipeline results:

1.  **Missing Values:** Heatmap confirms **0 missing values** remaining.
2.  **Outliers:** Boxplots show invalid ranges (negative ages/prices) have been removed.
3.  **Distributions:** Numerical features (`Age`, `Unit_Price`) now show valid statistical distributions.
4.  **Correlation:** Final correlation matrix generated for feature selection.

**Status:** Data is clean and ready for Feature Engineering.
