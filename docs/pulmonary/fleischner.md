---
title: Fleischner Society Guidelines 2017
---

# Fleischner Society Guidelines for Incidental Pulmonary Nodules

??? info "Reference Information"
    **Full Citation:** MacMahon H, Naidich DP, Goo JM, et al. Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017. *Radiology*. 2017;284(1):228-243.  
    **Version:** 2017 Update  
    **Last Institutional Review:** January 2024  
    **Modifications:** None - following published guidelines exactly  

---

### Fleischner Calculator

<div class="calc-layout">
<div class="calculator-form">
  <form id="fleischner-form">
    <div class="calc-field">
      <label for="calc-size_mm">Nodule Size (mm)</label>
      <input type="number" id="calc-size_mm" step="0.1" required placeholder="e.g., 6.5">
    </div>
    <div class="calc-field">
      <label for="calc-nodule_type">Nodule Type</label>
      <select id="calc-nodule_type" required>
        <option value="solid">Solid</option>
        <option value="part-solid">Part-Solid</option>
        <option value="ground-glass">Ground-Glass</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-multiplicity">Multiplicity</label>
      <select id="calc-multiplicity" required>
        <option value="single">Single</option>
        <option value="multiple">Multiple</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-patient_risk">Patient Risk</label>
      <select id="calc-patient_risk" required>
        <option value="low">Low Risk</option>
        <option value="high">High Risk</option>
      </select>
    </div>
    <button type="submit" id="fleischner-form-btn" class="calc-btn">Calculate Recommendation</button>
  </form>
</div>
<div id="fleischner-results" class="calc-results-container" style="display: none;"></div>
</div>

---

### Quick Reference Tables

=== "Solid nodules"
    | Nodule type | Risk | <6 mm | 6–8 mm | >8 mm | Comments |
    |---|---|---|---|---|---|
    | **Single** | **Low Risk** | No routine follow-up | CT 6–12 mo; consider CT 18–24 mo | Consider CT ~3 mo, PET/CT and/or biopsy | Consider 12 mo FU in selected suspicious nodules |
    | **Single** | **High Risk** | Optional CT at 12 mo | CT 6–12 mo and CT 18–24 mo | Consider CT ~3 mo, PET/CT and/or biopsy | Higher concern with suspicious morphology / upper lobe, etc. |
    | **Multiple** | **Low Risk** | No routine follow-up | CT 3–6 mo; consider CT 18–24 mo | CT 3–6 mo ± PET/CT/biopsy | Base management on most suspicious nodule |
    | **Multiple** | **High Risk** | Optional CT at 12 mo | CT 3–6 mo and CT 18–24 mo | CT 3–6 mo ± PET/CT/biopsy | Base management on most suspicious nodule |

    **Perifissural note:** If a nodule is perifissural with a polygonal shape (typical intrapulmonary lymph node), **no follow-up** is required.

=== "Subsolid nodules"
    | Nodule type | Pattern | <6 mm | ≥6 mm | Comments |
    |---|---|---|---|---|
    | **Single** | **Ground-glass** | No routine follow-up | CT 6–12 mo to confirm persistence, then q2y until 5y | Consider longer follow-up if suspicious |
    | **Single** | **Part-solid** | No routine follow-up | CT 3–6 mo to confirm persistence; if persistent, annual CT until 5y (manage by solid component) | Persistent part-solid often higher risk |
    | **Multiple** | **Ground-glass** | CT 3–6 mo; if stable, consider CT at 2 and 4y | CT 3–6 mo; subsequent management guided by most suspicious nodule | Follow most suspicious nodule |
    | **Multiple** | **Part-solid** | CT 3–6 mo; if stable, consider CT at 2 and 4y | CT 3–6 mo; subsequent management guided by most suspicious nodule | Follow most suspicious nodule |

---
### Risk Criteria
<div class="grid cards" markdown>

-   **Low Risk Criteria**
    - Minimal or absent smoking history
    - No other risk factors

-   **High Risk Criteria**
    - Current or former smoker
    - Family history of lung cancer  
    - Radon or asbestos exposure
    - Age >50 years
    - COPD or pulmonary fibrosis

</div>

---

??? tip "How to Measure Nodules"
    
    **Solid Nodules:**
    
    - Measure **longest diameter** in axial plane
    - Use **lung windows** (W: 1500, L: -600)
    - Average diameter if growth assessment needed
    
    **Part-Solid Nodules:**
    
    - Measure **total diameter** (entire nodule)
    - Measure **solid component** separately
    - Solid component determines management
    
    **Ground Glass Nodules:**
    
    - Measure longest diameter
    - Volume measurement preferred when available
    
    **Preferred Method:**
    
    - Semi-automated volumetry when available
    - Volume doubling time (VDT) for growth assessment

---

### When to Use Lung-RADS Instead

!!! warning "Use Lung-RADS for Screening Exams"
    These Fleischner guidelines apply to **incidental** nodules found on CT performed for other reasons.
    
    For **lung cancer screening CTs**, use [Lung-RADS](lung_rads.md) instead.

---
## Related Content

### Related Guidelines
- [Lung-RADS v1.1](./lung_rads.md) - For lung cancer screening
- Brock Model - Nodule malignancy risk calculator
---

## External Resources

- [Original Publication (Radiology)](https://pubs.rsna.org/doi/10.1148/radiol.2017161659)
- [Fleischner Society Website](https://www.fleischnersociety.org/)
