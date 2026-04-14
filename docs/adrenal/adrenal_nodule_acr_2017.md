# Adrenal Nodule (ACR 2017)

## Adrenal Washout Calculator

<div class="calculator-form">
  <form id="adrenal-form">
    <div class="calc-field">
      <label for="calc-washout_unenhanced_hu">Unenhanced CT Attenuation (HU)</label>
      <input type="number" id="calc-washout_unenhanced_hu" step="0.1" required placeholder="e.g., 28">
    </div>
    <div class="calc-field">
      <label for="calc-washout_venous_hu">Portal Venous Phase Attenuation (HU)</label>
      <input type="number" id="calc-washout_venous_hu" step="0.1" required placeholder="e.g., 110">
    </div>
    <div class="calc-field">
      <label for="calc-washout_delayed_hu">Delayed Phase Attenuation (HU) <small>— 10–15 min delay</small></label>
      <input type="number" id="calc-washout_delayed_hu" step="0.1" required placeholder="e.g., 55">
    </div>
    <button type="submit" id="adrenal-form-btn" class="calc-btn">Calculate Washout</button>
  </form>
</div>
<div id="adrenal-results" class="calc-results-container" style="display: none;"></div>

---

## Adrenal Nodule Management Calculator

<div class="calculator-form">
  <form id="adrenal-nodule-form">
    <div class="calc-field">
      <label for="calc-size_cm">Lesion Size (cm)</label>
      <input type="number" id="calc-size_cm" step="0.1" min="0" required placeholder="e.g., 2.5">
    </div>
    <div class="calc-field">
      <label for="calc-unenhanced_hu">Unenhanced CT Attenuation (HU) <small>— Leave blank if not available</small></label>
      <input type="number" id="calc-unenhanced_hu" step="0.1" placeholder="e.g., 12">
    </div>
    <div class="calc-field">
      <label for="calc-cancer_history">History of known malignancy?</label>
      <select id="calc-cancer_history" required>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
    <button type="submit" id="adrenal-nodule-form-btn" class="calc-btn">Get Recommendation</button>
  </form>
</div>
<div id="adrenal-nodule-results" class="calc-results-container" style="display: none;"></div>

---

## Overview
The **ACR White Paper (2017)** provides guidance on managing incidentally detected adrenal masses. The goal is to differentiate benign adenomas from malignancies (metastasis, adrenocortical carcinoma) and functioning tumors.

## Key Recommendations by Size & Features

### 1. Lesion < 1 cm
- **Recommendation:** Benign, no follow-up needed.
- **Exceptions:** If known malignancy, consider follow-up.

### 2. Lesion 1 - 4 cm
**A. Benign Features (Diagnostic)**
- **Features:** unenhanced CT < 10 HU.
- **Management:** No further follow-up.

**B. Indeterminate Features (> 10 HU)**
- **No history of cancer:**
    - Consider **Adrenal Washout CT** or **MRI (Chemical Shift)**.
    - If benign (adenoma): No follow-up.
    - If indeterminate on washout/MRI: Follow-up CT/MRI at 6-12 months.
    - If stable for 1 year: Benign, stop follow-up.
- **History of cancer:**
    - Consider **Adrenal Washout CT**, **MRI**, or **PET/CT**.
    - If not an adenoma (or PET avid): Consider biopsy or resection.

### 3. Lesion > 4 cm
- **Management:** Resection is often recommended due to risk of Adrenocortical Carcinoma (ACC).
- **Workup:** Biochemical evaluation (rule out pheochromocytoma) before biopsy or surgery. Do NOT biopsy a potentially resectable ACC (risk of seeding).

## Biochemical Evaluation
- All incidentalomas should arguably undergo screening for hyperfunction (Cushing's, Pheochromocytoma, Hyperaldosteronism), especially if > 1 cm.
- **Standard Screen:** Plasma metanephrines (pheo), 1mg overnight dexamethasone suppression (Cushing's).

## Source
*Mayo-Smith WW, et al. Management of Incidental Adrenal Masses: A White Paper of the ACR Incidental Findings Committee. J Am Coll Radiol. 2017;14(8):1038-1044.*

