---
title: TIRADS Guidelines
---

# ACR TI-RADS: Thyroid Imaging Reporting and Data System

??? info "Reference Information"
    **Full Citation:** Tessler FN, Middleton WD, Grant EG, et al. ACR Thyroid Imaging, Reporting and Data System (TI-RADS): White Paper of the ACR TI-RADS Committee. *J Am Coll Radiol*. 2017;14(5):587-595.  
    **Version:** ACR TI-RADS 2017  
    **Last Institutional Review:** January 2024  
    **Modifications:** None - following published guidelines exactly  

---

### TI-RADS Calculator

<div class="calc-layout">
<div class="calculator-form">
  <form id="tirads-form">
    <div class="calc-field">
      <label for="calc-composition_pts">Composition</label>
      <select id="calc-composition_pts" required>
        <option value="0">Cystic or almost entirely cystic — 0 pts</option>
        <option value="0">Spongiform (aggregation of microcysts &gt;50%) — 0 pts</option>
        <option value="1">Mixed cystic and solid — 1 pt</option>
        <option value="2">Solid or almost entirely solid — 2 pts</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-echogenicity_pts">Echogenicity</label>
      <select id="calc-echogenicity_pts" required>
        <option value="0">Anechoic — 0 pts</option>
        <option value="1">Hyperechoic or isoechoic — 1 pt</option>
        <option value="2">Hypoechoic — 2 pts</option>
        <option value="3">Very hypoechoic (darker than strap muscles) — 3 pts</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-shape_pts">Shape</label>
      <select id="calc-shape_pts" required>
        <option value="0">Wider-than-tall — 0 pts</option>
        <option value="3">Taller-than-wide (A-P ≥ transverse on transverse view) — 3 pts</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-margin_pts">Margin</label>
      <select id="calc-margin_pts" required>
        <option value="0">Smooth — 0 pts</option>
        <option value="0">Ill-defined — 0 pts</option>
        <option value="2">Lobulated or irregular — 2 pts</option>
        <option value="3">Extra-thyroidal extension — 3 pts</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-echogenic_foci_pts">Echogenic Foci</label>
      <select id="calc-echogenic_foci_pts" required>
        <option value="0">None or large comet-tail artifacts — 0 pts</option>
        <option value="1">Macrocalcifications — 1 pt</option>
        <option value="2">Peripheral (rim) calcifications — 2 pts</option>
        <option value="3">Punctate echogenic foci — 3 pts</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-size_cm">Maximum Nodule Diameter (cm)</label>
      <input type="number" id="calc-size_cm" step="0.1" min="0" required placeholder="e.g., 1.8">
    </div>
    <button type="submit" id="tirads-form-btn" class="calc-btn">Calculate TI-RADS</button>
  </form>
</div>
<div id="tirads-results" class="calc-results-container" style="display: none;"></div>
</div>

---

???+ abstract "TI-RADS Quick Reference"
    | Level | Points | Malignancy Risk | FNA Threshold | Follow-up Threshold | Follow-up Interval |
    |-------|--------|-----------------|--------------|---------------------|-------------------|
    | **TR1** | 0 | ~0.3% | No FNA | No follow-up | None |
    | **TR2** | 2 | ~1.5% | No FNA | No follow-up | None |
    | **TR3** | 3 | ~4.8% | ≥2.5 cm | ≥1.5 cm | 1, 3, 5 years |
    | **TR4** | 4–6 | ~9.1% | ≥1.5 cm | ≥1.0 cm | 1, 2, 3, 5 years |
    | **TR5** | ≥7 | ~35% | ≥1.0 cm | ≥0.5 cm | 1, 2, 3, 5 years |

---

## Detailed Classification

<div class="grid cards" markdown>

-   **TR1: Benign**

    ---

    !!! success "No Action Required"
        No sonographic features of malignancy. Essentially benign nodule.

        **Typical findings:**

        - Simple cysts (completely anechoic, no solid component)
        - Spongiform nodules (>50% microcystic composition)

    **Management:** No FNA, no follow-up
    **Malignancy Risk:** ~0.3%
    **Points:** 0

-   **TR2: Not Suspicious**

    ---

    !!! success "No Action Required"
        Not suspicious. Sonographic features suggest a benign etiology.

        **Typical findings:**

        - Predominantly cystic with thin internal septa
        - Isoechoic or hyperechoic nodules without suspicious features
        - Colloid nodules with comet-tail artifacts

    **Management:** No FNA, no follow-up
    **Malignancy Risk:** ~1.5%
    **Points:** 2

-   **TR3: Mildly Suspicious**

    ---

    !!! info "Size-Based Follow-up"
        Mildly suspicious features. Management is determined by size thresholds.

        **FNA if:** ≥2.5 cm
        **Follow-up if:** ≥1.5 cm (at 1, 3, 5 years)
        **No action if:** <1.5 cm

    **Management:** Observation or FNA based on size
    **Malignancy Risk:** ~4.8%
    **Points:** 3

-   **TR4: Moderately Suspicious**

    ---

    !!! warning "Biopsy Consideration"
        Moderately suspicious features. Lower size thresholds than TR3.

        **FNA if:** ≥1.5 cm
        **Follow-up if:** ≥1.0 cm (at 1, 2, 3, 5 years)
        **No action if:** <1.0 cm

    **Management:** Follow-up or FNA based on size
    **Malignancy Risk:** ~9.1%
    **Points:** 4–6

-   **TR5: Highly Suspicious**

    ---

    !!! danger "FNA Recommended"
        Highly suspicious features. FNA is recommended above size threshold.

        **FNA if:** ≥1.0 cm
        **Follow-up if:** ≥0.5 cm (at 1, 2, 3, 5 years)
        **No action if:** <0.5 cm

    **Management:** FNA recommended
    **Malignancy Risk:** ~35%
    **Points:** ≥7

</div>

---

### Feature Scoring Reference

=== "TI-RADS Scoring"
    | Feature | Points | Description |
    |---------|--------|-------------|
    | **COMPOSITION** | | |
    | Cystic or almost completely cystic | 0 | Anechoic nodule with echogenic wall ± artifacts |
    | Spongiform | 0 | Aggregation of microcysts >50% of nodule |
    | Mixed cystic and solid | 1 | Any solid component <50% |
    | Solid or almost solid | 2 | Solid component ≥50% |
    | **ECHOGENICITY** | | |
    | Anechoic | 0 | Simple cyst appearance |
    | Hyperechoic or isoechoic | 1 | Same or brighter than thyroid |
    | Hypoechoic | 2 | Darker than thyroid |
    | Very hypoechoic | 3 | Darker than strap muscles |
    | **SHAPE** | | |
    | Wider-than-tall | 0 | A-P < transverse diameter |
    | Taller-than-wide | 3 | A-P ≥ transverse diameter on transverse view |
    | **MARGIN** | | |
    | Smooth | 0 | Well-defined smooth border |
    | Ill-defined | 0 | Cannot clearly define margin |
    | Lobulated or irregular | 2 | Undulating or jagged contour |
    | Extra-thyroidal extension | 3 | Extends beyond thyroid capsule |
    | **ECHOGENIC FOCI** | | |
    | None or large comet-tail artifacts | 0 | No foci or V-shaped artifact from colloid |
    | Macrocalcifications | 1 | Large calcific foci with shadowing |
    | Peripheral (rim) calcifications | 2 | Calcifications along nodule margin |
    | Punctate echogenic foci | 3 | Tiny bright spots ± shadowing/comet-tail |

---

??? tip "Measurement Guidelines"
    
    **Size Measurement:**
    
    - Use **maximum diameter** in any plane
    - Measure in **centimeters** (to one decimal)
    - Include solid and cystic components
    
    **Important Notes:**
    
    - Benign features (TR1-TR2): No size threshold
    - Always measure at largest diameter
    - Document plane of measurement
    
    **Growth Assessment:**
    
    - Significant growth: >20% in two dimensions AND >2mm
    - Minimum interval: 6 months
    - Use same measurement technique

---

### Special Considerations

!!! warning "When NOT to Use TI-RADS"
    
    **Do NOT apply TI-RADS to:**
    
    - Nodules in patients <14 years old
    - Nodules with known history of thyroid cancer
    - Lymph nodes
    - Nodules already biopsied or with known cytology
    - Purely cystic nodules (TR1)
    
    **Clinical correlation required for:**
    
    - Rapidly growing nodules
    - Symptomatic nodules (hoarseness, dysphagia)
    - Suspicious lymphadenopathy
    - Elevated thyroglobulin
    - PET-avid nodules

---

??? tip "Reporting Tips"
    
    **Structured Report Should Include:**
    
    - Overall thyroid size and echogenicity
    - Number of nodules
    - For each nodule requiring characterization:
        - Location (lobe, upper/mid/lower)
        - Size (3 dimensions)
        - Composition (points)
        - Echogenicity (points)
        - Shape (points)
        - Margin (points)
        - Echogenic foci (points)
        - **Total TI-RADS points and level**
        - **Recommendation based on size and TR level**
    
    **Example Template:**
    
    ```
    Right mid lobe nodule measures 1.8 x 1.2 x 1.5 cm:
    - Solid composition (2 points)
    - Hypoechoic (2 points)
    - Wider-than-tall (0 points)
    - Irregular margin (2 points)
    - Punctate echogenic foci (3 points)
    Total: 9 points = TR5
    
    Recommendation: FNA is recommended.
    ```

---

### Common Pitfalls

!!! danger "Avoid These Errors"
    
    **Scoring Errors:**
    
    - Don't add multiple features from same category
    - Don't upgrade based on size alone
    - Don't confuse macrocalcifications with punctate foci
    
    **Measurement Errors:**
    
    - Don't include halo in measurement
    - Don't measure only transverse plane
    - Don't round up aggressively
    
    **Management Errors:**
    
    - Don't FNA nodules below size threshold
    - Don't ignore clinical context
    - Don't apply to cervical lymph nodes

---

## Related Content

### Related Guidelines
- ATA Thyroid Nodule Management Guidelines
- Bethesda Classification for Thyroid Cytology
- EU-TIRADS (European variant)
- K-TIRADS (Korean variant)

---

## External Resources

- [ACR TI-RADS White Paper](https://www.jacr.org/article/S1546-1440(17)30242-8/fulltext)
- [ACR TI-RADS Calculator](https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS)
- [TI-RADS Lexicon Atlas](https://www.acr.org/-/media/ACR/Files/RADS/TI-RADS/TI-RADS-Atlas.pdf)

---

## Visual Reference Guide

## US Reference Images

