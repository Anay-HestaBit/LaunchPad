# Feature Engineering & Selection – Day 2 (Updated)

## Objective

The goal of Day 2 was to create meaningful features that allow the model to predict loan approval based on _financial health_ rather than just memorizing the credit score.

---

## Dataset Used

- **Dataset:** Loan Approval Dataset
- **Target Variable:** `loan_status` (Approved / Rejected)
- **Problem Type:** Classification

---

## Feature Engineering (Anti-Leakage Strategy)

We specifically avoided using the `cibil_score` directly to prevent "data leakage" (where the model cheats by just checking the score). Instead, we engineered financial ratios to represent a borrower's capacity to pay.

### Engineered Features

1.  **`total_assets`**: Sum of residential, commercial, luxury, and bank assets.
2.  **`loan_coverage_ratio`**: Total Assets divided by Loan Amount (Solvency check).
3.  **`loan_to_income`**: Loan Amount divided by Annual Income (Burden check).
4.  **`liquidity_ratio`**: (Bank + Commercial Assets) divided by Loan Amount (Short-term ability to pay).
5.  **`log_income` & `log_loan`**: Log transformations to normalize skewed money distributions.

---

## Categorical Encoding

- **`education`**: Label Encoded (0 = Not Graduate, 1 = Graduate).
- **`self_employed`**: One-Hot Encoded (Binary Flag).
- **`loan_status`**: Mapped (Approved → 1, Rejected → 0).

---

## Feature Selection

We applied a strict selection process to keep the model focused:

1.  **Correlation Filter**:
    - Removed features with >0.85 correlation to avoid redundancy.

2.  **Recursive Feature Elimination (RFE)**:
    - Used a Logistic Regression model (with balanced class weights) to pick the **Top 10** most important features.
    - This ensures we only use the most predictive signals.

---

## Outputs Generated

- `src/data/processed/X_train.csv`: The final training data with new features.
- `src/features/feature_list.json`: A list of the selected top 10 features.
- `src/logs/feature_engineering.log`: A log file tracking the entire process.

---

## Conclusion

By removing the CIBIL score and replacing it with financial ratios, we have created a dataset that forces the model to learn real financial patterns.
