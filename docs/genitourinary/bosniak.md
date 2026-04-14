---
title: Bosniak Renal Cyst Classification
---

# Bosniak Classification of Renal Cystic Masses

??? info "Reference Information"
    **Full Citation:** Silverman SG, Pedrosa I, Ellis JH, et al. Bosniak Classification of Cystic Renal Masses, Version 2019: An Update Proposal and Needs Assessment. *Radiology*. 2019;292(2):475–488.
    **Version:** v2019 Update
    **Modality:** CT and MRI
    **Last Institutional Review:** January 2024
    **Modifications:** None — following published v2019 criteria

!!! info "About the Bosniak Classification"
    The Bosniak classification categorises incidentally detected renal cystic masses by their imaging features to predict malignancy risk. Version 2019 refined criteria to improve reproducibility using both CT and MRI.

---

### Bosniak Calculator

<div class="calc-layout">
<div class="calculator-form">
  <form id="bosniak-form">
    <div class="calc-field">
      <label for="calc-enhancement">Enhancement</label>
      <select id="calc-enhancement" required>
        <option value="none">None — no enhancement</option>
        <option value="perceived">Perceived — equivocal / &lt;20 HU change</option>
        <option value="measurable">Measurable — definite ≥20 HU change</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-wall_septa">Wall / Septa Morphology</label>
      <select id="calc-wall_septa" required>
        <option value="thin_smooth">Thin smooth (hairline, &lt;2 mm)</option>
        <option value="smooth_thick">Smooth thickened (≥4 mm, regular)</option>
        <option value="irregular_thick">Irregular / nodular / thick irregular</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-septa_count">Number of Septa (non-enhancing lesions)</label>
      <select id="calc-septa_count" required>
        <option value="none">None</option>
        <option value="1_to_3">1–3 septa</option>
        <option value="4_plus">4 or more septa</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-calcification">Calcification</label>
      <select id="calc-calcification" required>
        <option value="none">None</option>
        <option value="fine">Fine / thin</option>
        <option value="thick_nodular">Thick / nodular / irregular</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-high_attenuation_non_enhancing">Non-enhancing High Attenuation (&gt;20 HU on unenhanced CT)</label>
      <select id="calc-high_attenuation_non_enhancing">
        <option value="no">No</option>
        <option value="yes">Yes — homogeneous high-density non-enhancing cyst</option>
      </select>
    </div>
    <div class="calc-field">
      <label for="calc-size_cm">Lesion Size (cm) — required for high-attenuation cysts</label>
      <input type="number" id="calc-size_cm" step="0.1" placeholder="e.g., 2.5">
    </div>
    <button type="submit" id="bosniak-form-btn" class="calc-btn">Calculate Bosniak Category</button>
  </form>
</div>
<div id="bosniak-results" class="calc-results-container" style="display: none;"></div>
</div>

---

### Bosniak Category Summary

=== "Categories I–II (Benign)"
    | Category | Features | Malignancy Risk | Management |
    |----------|----------|----------------|------------|
    | **I** | Simple cyst: hairline-thin wall, no septa, calcification, or solid components, water density | <1% | No follow-up |
    | **II** | Minimally complex: ≤3 hairline-thin septa, fine calcification, or non-enhancing high-attenuation ≤3 cm | ~2% | No follow-up |

=== "Category IIF (Follow-up)"
    | Criteria | Malignancy Risk | Management |
    |----------|----------------|------------|
    | ≥4 hairline-thin septa | ~5–15% | CT/MRI at 6 mo, then annually ×5 yr |
    | Minimally thickened smooth septa/wall | ~5–15% | CT/MRI at 6 mo, then annually ×5 yr |
    | Thick or nodular calcification (no enhancement) | ~5–15% | CT/MRI at 6 mo, then annually ×5 yr |
    | Non-enhancing high-attenuation cyst >3 cm | ~5–15% | CT/MRI at 6 mo, then annually ×5 yr |
    | Perceived (equivocal) enhancement | ~5–15% | CT/MRI at 6 mo, then annually ×5 yr |

=== "Categories III–IV (Surgical)"
    | Category | Features | Malignancy Risk | Management |
    |----------|----------|----------------|------------|
    | **III** | Enhancing smooth thick (≥4 mm) wall or septa, no solid tissue | ~50% | Urology referral; surgical excision or active surveillance in selected patients |
    | **IV** | Enhancing irregular/nodular wall or septa, OR any enhancing solid tissue | >75% | Surgical excision or ablation; malignant until proven otherwise |

---

### Category Descriptions

<div class="grid cards" markdown>

-   **Bosniak I — Simple Cyst**

    Hairline-thin smooth wall. No septa, calcification, or solid components. Homogeneous water density/signal. No enhancement.
    **Risk <1%. No follow-up required.**

-   **Bosniak II — Minimally Complex**

    1–3 hairline-thin smooth septa (no enhancement, or perceived). Fine calcification. Uniformly high-attenuation ≤3 cm without enhancement.
    **Risk ~2%. No follow-up required.**

-   **Bosniak IIF — Follow-up Required**

    Moderately complex. ≥4 thin septa, minimally thickened smooth wall/septa, thick/nodular calcification, non-enhancing high-attenuation >3 cm, or perceived enhancement.
    **Risk ~5–15%. 6-month then annual CT/MRI for 5 years.**

-   **Bosniak III — Indeterminate**

    Enhancing thick smooth wall or septa. No discrete solid tissue.
    **Risk ~50%. Urology referral; often surgical excision.**

-   **Bosniak IV — Malignant**

    Enhancing irregular/nodular wall or septa, or enhancing solid tissue component.
    **Risk >75%. Surgical excision or ablation.**

</div>

---

### Enhancement Assessment

!!! tip "Measuring Enhancement on CT"
    Enhancement on CT is defined as an **increase of ≥20 HU** between unenhanced and contrast-enhanced phases (same region of interest).

    - **Measurable (definite):** ≥20 HU increase — treat as enhancing
    - **Perceived (equivocal):** Apparent enhancement but <20 HU increase — category IIF
    - **Pseudoenhancement:** Common in small intrarenal cysts due to beam hardening — do not upgrade based on pseudoenhancement alone

    On **MRI**, enhancement is assessed qualitatively. Any definite enhancement on subtraction images or post-contrast sequences qualifies as measurable.

---

### Special Considerations

!!! warning "Incidentally Detected vs. Known Lesions"
    These criteria apply to **incidentally detected** renal cystic masses. Known malignant lesions or lesions in patients with von Hippel-Lindau, tuberous sclerosis, or prior RCC require individualised management.

!!! info "Active Surveillance for Category III"
    Active surveillance (repeat imaging without intervention) may be appropriate for Bosniak III lesions in:
    - Elderly or frail patients with high surgical risk
    - Bilateral lesions or solitary kidney
    - Lesion stability on serial imaging

    Discuss risk-benefit with urology and patient.

---

### Malignancy Rates Summary

| Category | Approximate Malignancy Rate | Common Pathology |
|----------|----------------------------|-----------------|
| I | <1% | Simple cyst |
| II | ~2% | Benign cyst |
| IIF | ~5–15% | Benign or low-grade RCC |
| III | ~50% | Clear cell RCC, multilocular cystic RCC |
| IV | >75% | Clear cell RCC, papillary RCC |

*Rates based on pooled surgical series; individual risk depends on patient factors.*

---

## External Resources

- [Original Bosniak v2019 Publication (Radiology)](https://pubs.rsna.org/doi/10.1148/radiol.2019182646)
- [ACR Incidental Findings — Kidney](https://www.acr.org/Clinical-Resources/Incidental-Findings)
