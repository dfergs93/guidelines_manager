---
title: LI-RADS v2018
---

# LI-RADS — Liver Imaging Reporting and Data System

??? info "Reference Information"
    **Full Citation:** American College of Radiology. CT/MRI LI-RADS v2018. ACR LI-RADS® Working Group. 2018.
    **Version:** v2018 (CT/MRI)
    **Last Institutional Review:** January 2024
    **Modifications:** None — following published algorithm exactly
    **Applicability:** Patients at risk for HCC: cirrhosis, chronic HBV infection, or personal history of HCC

!!! warning "At-Risk Patients Only"
    LI-RADS applies **only** to patients at risk for hepatocellular carcinoma (HCC):
    cirrhosis (any cause), chronic hepatitis B virus (HBV) infection, or prior HCC.
    For observations in non-at-risk patients, standard reporting categories apply.

---

### LI-RADS Calculator

<div class="calc-layout">
<div class="calculator-form">
  <form id="lirads-form">
    <div class="calc-field">
      <label for="calc-benign_features">Observation Type</label>
      <select id="calc-benign_features">
        <option value="none">No definite/probable benign features — apply major criteria</option>
        <option value="definitely_benign">Definitely benign — cyst, haemangioma, vascular anomaly (LR-1)</option>
        <option value="probably_benign">Probably benign — no malignant features (LR-2)</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-size_mm">Observation Size (mm)</label>
      <input type="number" id="calc-size_mm" step="0.1" placeholder="e.g., 18">
    </div>
    <div class="calc-field">
      <label for="calc-aphe">Non-rim Arterial Phase Hyperenhancement (APHE)</label>
      <select id="calc-aphe" required>
        <option value="no">No / Absent / Rim APHE</option>
        <option value="yes">Yes — Non-rim APHE present</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-washout">Non-peripheral Washout Appearance</label>
      <select id="calc-washout" required>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-enhancing_capsule">Enhancing Capsule Appearance</label>
      <select id="calc-enhancing_capsule" required>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-threshold_growth">Threshold Growth (≥50% increase ≤6 months)</label>
      <select id="calc-threshold_growth" required>
        <option value="no">No / Unknown</option>
        <option value="yes">Yes</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-lrm_features">LR-M Features (targetoid, infiltrative, non-HCC malignancy)</label>
      <select id="calc-lrm_features">
        <option value="no">No</option>
        <option value="yes">Yes — features suggest non-HCC malignancy</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-tumor_in_vein">Definite Tumor in Vein (LR-TIV)</label>
      <select id="calc-tumor_in_vein">
        <option value="no">No</option>
        <option value="yes">Yes — definite tumor thrombus</option>
      </select>
    </div>
    <button type="submit" id="lirads-form-btn" class="calc-btn">Calculate LI-RADS Category</button>
  </form>
</div>
<div id="lirads-results" class="calc-results-container" style="display: none;"></div>
</div>

---

### Quick Reference — Major Features

| Major Feature | Definition |
|---------------|-----------|
| **Non-rim APHE** | Arterial phase enhancement greater than liver, non-rim pattern |
| **Washout appearance** | Hypointensity/hypoattenuation on portal venous or delayed phase relative to liver |
| **Enhancing capsule** | Smooth peripheral enhancement on portal venous or delayed phase |
| **Threshold growth** | ≥50% diameter increase in ≤6 months, or ≥50% increase when interval uncertain |

---

### LI-RADS Category Table (CT/MRI)

=== "Main Algorithm"
    | Size | APHE | Additional Major Features | Category |
    |------|------|--------------------------|----------|
    | **<10 mm** | Absent | 0–1 | LR-3 |
    | **<10 mm** | Absent | ≥2 | LR-4 |
    | **<10 mm** | Present | 0 | LR-3 |
    | **<10 mm** | Present | ≥1 | LR-4 |
    | **10–19 mm** | Absent | 0 | LR-3 |
    | **10–19 mm** | Absent | ≥1 | LR-4 |
    | **10–19 mm** | Present | 0 | LR-4 |
    | **10–19 mm** | Present | ≥1 | **LR-5** |
    | **≥20 mm** | Absent | 0 | LR-3 |
    | **≥20 mm** | Absent | ≥1 | LR-4 |
    | **≥20 mm** | Present | 0 | LR-4 |
    | **≥20 mm** | Present | ≥1 | **LR-5** |

    *Additional major features = washout + enhancing capsule + threshold growth (count of present features)*

=== "Special Categories"
    | Category | HCC Risk | Criteria | Management |
    |----------|----------|----------|------------|
    | **LR-1** | ~0% | Definitely benign: cyst, haemangioma, vascular anomaly, hepatic fat, post-treatment complete response | No HCC workup; routine surveillance if at-risk |
    | **LR-2** | <10% | Probably benign: no malignant features, likely benign entity, or small (<10 mm) indeterminate | Routine HCC surveillance only |
    | **LR-TIV** | N/A | Definite tumor in vein (neoplastic thrombus) | Multidisciplinary review; staging and treatment |
    | **LR-M** | N/A | Probably/definitely malignant, not HCC-specific (targetoid, infiltrative) | Biopsy to determine malignancy type |

---

### Category Descriptions

<div class="grid cards" markdown>

-   **LR-1 — Definitely Benign (~0% HCC risk)**

    Imaging features diagnostic of a benign entity: definite cyst, definite haemangioma, vascular anomaly/shunt, perfusion alteration, hepatic fat deposition/sparing, post-treatment change showing complete response, or other definitely benign diagnosis.
    **No HCC workup required. Continue routine surveillance if patient remains at risk.**

-   **LR-2 — Probably Benign (<10% HCC risk)**

    Probably benign — does not meet LR-1 criteria but has no features suggesting malignancy. Includes small (<10 mm) observations with no malignant features or observations that probably represent a benign entity.
    **Continue routine HCC surveillance. No additional workup required.**

-   **LR-3 — Intermediate (~38% HCC risk)**

    Intermediate probability of malignancy. Continue routine HCC surveillance. Follow-up imaging in 3–6 months or multidisciplinary review.

-   **LR-4 — Probably HCC (~74% HCC risk)**

    Probably HCC. Multidisciplinary discussion recommended. Options: alternative modality imaging (MRI if CT), biopsy, or proceed to treatment if clinical suspicion high.

-   **LR-5 — Definitely HCC (≥95% HCC risk)**

    Definite HCC — no biopsy required if imaging criteria met. Refer for HCC treatment: resection, transplantation, ablation (RFA/MWA), or TACE depending on BCLC staging and liver function.

-   **LR-M — Non-HCC Malignancy**

    Features suggest malignancy but not HCC-specific (e.g., intrahepatic cholangiocarcinoma). Biopsy recommended to characterise malignancy type.

-   **LR-TIV — Tumor in Vein**

    Definite neoplastic thrombus. Associated with advanced-stage HCC. Multidisciplinary team review required for staging and treatment planning.

</div>

---

### LR-M Features

Features that suggest non-HCC malignancy and should prompt LR-M categorisation:

- **Targetoid appearance** — rim APHE, peripheral washout, delayed central enhancement, peripheral diffusion restriction
- **Infiltrative appearance** — ill-defined margins, geographic shape
- **Marked diffusion restriction** disproportionate to T2 signal
- **Necrosis, satellite nodules** adjacent to a mass
- **Other features** — biliary obstruction, vascular invasion without TIV

---

### BCLC Staging & Treatment Reference

!!! info "Treatment depends on BCLC Stage"
    LI-RADS categorises the observation — **treatment selection uses BCLC staging**, which incorporates tumour burden, liver function (Child-Pugh), and performance status.

| BCLC Stage | Tumour | Liver Function | Treatment Options |
|------------|--------|----------------|-------------------|
| **0 (Very early)** | Single ≤2 cm | Child-Pugh A | Resection or ablation |
| **A (Early)** | 1–3 nodules ≤3 cm or single any size | Child-Pugh A–B | Resection, transplant, or ablation |
| **B (Intermediate)** | Multinodular, no vascular invasion | Child-Pugh A–B | TACE |
| **C (Advanced)** | Vascular invasion or extrahepatic spread | Child-Pugh A–B | Systemic therapy (atezolizumab + bevacizumab) |
| **D (Terminal)** | Any | Child-Pugh C | Best supportive care |

---

### Special Considerations

!!! tip "Ancillary Features"
    LI-RADS v2018 allows upgrading or downgrading by one category based on **ancillary features**:

    - **Upgrade features** (suggest HCC): Restricted diffusion, T1 hypointensity, T2 mild hyperintensity, transitional/hepatobiliary phase hypointensity, fat in mass
    - **Downgrade features** (suggest benign): Definite intralesional fat, blood products, intralesional gas, lesion stability ≥2 years

!!! warning "Imaging Protocol Requirements"
    Adequate CT requires: unenhanced, late arterial, portal venous, and delayed phases.
    Adequate MRI requires: T2, DWI, unenhanced T1, late arterial, portal venous, delayed, and hepatobiliary phase (if hepatobiliary agent used).

---

## External Resources

- [ACR LI-RADS Official Website](https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/LI-RADS)
- [LI-RADS v2018 CT/MRI Algorithm](https://www.acr.org/-/media/ACR/Files/RADS/LI-RADS/LI-RADS-2018-Core.pdf)
