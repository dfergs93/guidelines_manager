---
title: LI-RADS v2018
---

# LI-RADS — Liver Imaging Reporting and Data System

!!! danger "Do not use this page for patient management (notice, 25 November 2026)"
    A check against LI-RADS CT/MRI v2018 found errors in this page's calculator, category table and ancillary features. For example, a 10–19 mm observation with arterial phase hyperenhancement and an enhancing capsule as its only other major feature came out LR-5 ("proceed with HCC treatment") where v2018 gives LR-4. The calculator has been switched off. Until this page is rewritten, use the [ACR's LI-RADS v2018 documents](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/LI-RADS) directly.

??? info "Reference Information"
    **Full Citation:** American College of Radiology. CT/MRI LI-RADS v2018. ACR LI-RADS® Working Group. 2018.
    **Version:** v2018 (CT/MRI)
    **Applicability:** Patients at risk for HCC: cirrhosis, chronic HBV infection, or personal history of HCC

!!! warning "At-Risk Patients Only"
    LI-RADS applies **only** to patients at risk for hepatocellular carcinoma (HCC):
    cirrhosis (any cause), chronic hepatitis B virus (HBV) infection, or prior HCC.
    For observations in non-at-risk patients, standard reporting categories apply.

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

### BCLC Staging & Treatment

LI-RADS categorises the observation; treatment is chosen with the BCLC staging and treatment strategy: [2022 update](https://doi.org/10.1016/j.jhep.2021.11.018), since updated again in [2026](https://doi.org/10.1016/j.jhep.2025.10.020).

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
