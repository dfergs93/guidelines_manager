// ─── Calculator Logic (client-side, no backend required) ─────────────────────

function fleischner_calculator(size_mm, nodule_type, patient_risk, multiplicity) {
    nodule_type = nodule_type.toLowerCase();
    patient_risk = patient_risk.toLowerCase();
    multiplicity = multiplicity.toLowerCase();

    let rec = "No recommendation found for given parameters.";

    if (nodule_type === 'solid') {
        if (multiplicity === 'single') {
            if (size_mm < 6)        rec = patient_risk === 'low' ? "No routine follow-up" : "Optional CT at 12 mo";
            else if (size_mm <= 8)  rec = patient_risk === 'low' ? "CT 6–12 mo; consider CT 18–24 mo" : "CT 6–12 mo and CT 18–24 mo";
            else                    rec = "Consider CT ~3 mo, PET/CT and/or biopsy";
        } else {
            if (size_mm < 6)        rec = patient_risk === 'low' ? "No routine follow-up" : "Optional CT at 12 mo";
            else if (size_mm <= 8)  rec = patient_risk === 'low' ? "CT 3–6 mo; consider CT 18–24 mo" : "CT 3–6 mo and CT 18–24 mo";
            else                    rec = "CT 3–6 mo ± PET/CT/biopsy";
        }
    } else if (nodule_type === 'ground-glass') {
        if (multiplicity === 'single') {
            rec = size_mm < 6 ? "No routine follow-up" : "CT 6–12 mo to confirm persistence, then q2y until 5y";
        } else {
            rec = size_mm < 6 ? "CT 3–6 mo; if stable, consider CT at 2 and 4y" : "CT 3–6 mo; subsequent management guided by most suspicious nodule";
        }
    } else if (nodule_type === 'part-solid') {
        if (multiplicity === 'single') {
            rec = size_mm < 6 ? "No routine follow-up" : "CT 3–6 mo to confirm persistence; if persistent, annual CT until 5y (manage by solid component)";
        } else {
            rec = size_mm < 6 ? "CT 3–6 mo; if stable, consider CT at 2 and 4y" : "CT 3–6 mo; subsequent management guided by most suspicious nodule";
        }
    }

    return { recommendation: rec };
}

function adrenal_washout_calculator(unenhanced_hu, venous_hu, delayed_hu) {
    let absolute_washout = null;
    let relative_washout = null;
    let diagnosis = "Indeterminate";

    const den = venous_hu - unenhanced_hu;
    absolute_washout = den !== 0 ? ((venous_hu - delayed_hu) / den * 100) : 0;
    relative_washout = venous_hu !== 0 ? ((venous_hu - delayed_hu) / venous_hu * 100) : 0;

    if (unenhanced_hu <= 10) {
        diagnosis = "Lipid-rich adenoma (Based on unenhanced HU ≤ 10)";
    } else if (absolute_washout > 60) {
        diagnosis = "Lipid-poor adenoma (Absolute Washout > 60%)";
    } else if (relative_washout > 40) {
        diagnosis = "Lipid-poor adenoma (Relative Washout > 40%)";
    } else {
        diagnosis = "Indeterminate — Does not meet washout criteria for adenoma. Consider metastasis, pheochromocytoma, or adrenocortical carcinoma depending on clinical context.";
    }

    return {
        recommendation: diagnosis,
        results: {
            "Absolute washout": absolute_washout !== null ? `${Math.round(absolute_washout * 10) / 10}%` : "N/A",
            "Relative washout": relative_washout !== null ? `${Math.round(relative_washout * 10) / 10}%` : "N/A",
        }
    };
}

function tirads_calculator(composition_pts, echogenicity_pts, shape_pts, margin_pts, echogenic_foci_pts, size_cm) {
    const total = Number(composition_pts) + Number(echogenicity_pts) + Number(shape_pts) + Number(margin_pts) + Number(echogenic_foci_pts);
    size_cm = Number(size_cm);

    let tr_level, malignancy_risk;
    if (total === 0)       { tr_level = "TR1"; malignancy_risk = "~0.3%"; }
    else if (total <= 2)   { tr_level = "TR2"; malignancy_risk = "~1.5%"; }
    else if (total === 3)  { tr_level = "TR3"; malignancy_risk = "~4.8%"; }
    else if (total <= 6)   { tr_level = "TR4"; malignancy_risk = "~9.1%"; }
    else                   { tr_level = "TR5"; malignancy_risk = "~35%"; }

    let recommendation;
    if (tr_level === "TR1" || tr_level === "TR2") {
        recommendation = `${tr_level} (${total} pts): No FNA recommended. No follow-up needed.`;
    } else if (tr_level === "TR3") {
        if (size_cm < 1.5)      recommendation = `TR3 (${total} pts): No FNA, no follow-up needed (< 1.5 cm).`;
        else if (size_cm < 2.5) recommendation = `TR3 (${total} pts): Consider follow-up ultrasound at 1, 3, and 5 years.`;
        else                    recommendation = `TR3 (${total} pts): Consider FNA (≥ 2.5 cm). Consider follow-up ultrasound at 1, 3, and 5 years.`;
    } else if (tr_level === "TR4") {
        if (size_cm < 1.0)      recommendation = `TR4 (${total} pts): No FNA, no follow-up needed (< 1.0 cm).`;
        else if (size_cm < 1.5) recommendation = `TR4 (${total} pts): Consider follow-up ultrasound at 1, 2, 3, and 5 years.`;
        else                    recommendation = `TR4 (${total} pts): Consider FNA (≥ 1.5 cm). Follow-up ultrasound at 1, 2, 3, and 5 years.`;
    } else {
        if (size_cm < 0.5)      recommendation = `TR5 (${total} pts): No FNA, no follow-up needed (< 0.5 cm).`;
        else if (size_cm < 1.0) recommendation = `TR5 (${total} pts): Consider follow-up ultrasound at 1, 2, 3, and 5 years.`;
        else                    recommendation = `TR5 (${total} pts): FNA recommended (≥ 1.0 cm). Follow-up ultrasound at 1, 2, 3, and 5 years.`;
    }

    return {
        recommendation,
        results: { "TI-RADS level": tr_level, "Total points": total, "Malignancy risk": malignancy_risk }
    };
}

function lung_rads_calculator(nodule_type, size_mm, solid_component_mm, is_new, has_suspicious_features) {
    nodule_type = (nodule_type || '').toLowerCase();
    size_mm = Number(size_mm);
    solid_component_mm = solid_component_mm !== '' && solid_component_mm != null ? Number(solid_component_mm) : null;
    is_new = ['yes', 'true', '1'].includes(String(is_new).toLowerCase());
    has_suspicious_features = ['yes', 'true', '1'].includes(String(has_suspicious_features).toLowerCase());

    let category = "2", management = "Annual LDCT screening in 12 months", malignancy_risk = "<1%";

    if (is_new) {
        if (size_mm < 4)       { category = "3";  management = "6-month LDCT"; malignancy_risk = "1-2%"; }
        else if (size_mm < 6)  { category = "4A"; management = "3-month LDCT"; malignancy_risk = "5-15%"; }
        else                   { category = "4B"; management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"; malignancy_risk = ">15%"; }
    } else if (nodule_type === 'solid') {
        if (size_mm < 6)       { category = "2";  management = "Annual LDCT screening in 12 months"; malignancy_risk = "<1%"; }
        else if (size_mm < 8)  { category = "3";  management = "6-month LDCT"; malignancy_risk = "1-2%"; }
        else if (size_mm < 15) { category = "4A"; management = "3-month LDCT"; malignancy_risk = "5-15%"; }
        else                   { category = "4B"; management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"; malignancy_risk = ">15%"; }
    } else if (nodule_type === 'part-solid') {
        if (size_mm < 6) {
            category = "2"; management = "Annual LDCT screening in 12 months"; malignancy_risk = "<1%";
        } else {
            const solid = solid_component_mm !== null ? solid_component_mm : 0;
            if (solid < 6)      { category = "3";  management = "6-month LDCT"; malignancy_risk = "1-2%"; }
            else if (solid < 8) { category = "4A"; management = "3-month LDCT"; malignancy_risk = "5-15%"; }
            else                { category = "4B"; management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"; malignancy_risk = ">15%"; }
        }
    } else if (nodule_type === 'ground-glass') {
        if (size_mm < 30) { category = "2"; management = "Annual LDCT screening in 12 months"; malignancy_risk = "<1%"; }
        else              { category = "3"; management = "6-month LDCT"; malignancy_risk = "1-2%"; }
    }

    if (has_suspicious_features && ["3", "4A", "4B"].includes(category)) {
        category += "X";
        management = "Additional suspicious features present — " + management + " Consider chest CT with contrast, PET/CT, and/or tissue sampling.";
    }

    const display = `Lung-RADS ${category}`;
    return {
        recommendation: `${display}: ${management}`,
        results: { "Category": display, "Malignancy risk": malignancy_risk }
    };
}

function pirads_calculator(zone, dwi_score, t2wi_score, dce_positive) {
    zone = (zone || '').toLowerCase();
    dwi_score = Number(dwi_score);
    t2wi_score = Number(t2wi_score);
    dce_positive = ['yes', 'true', '1'].includes(String(dce_positive).toLowerCase());

    let pirads_score, dominant;

    if (zone === 'peripheral') {
        dominant = "DWI";
        pirads_score = dwi_score === 3 ? (dce_positive ? 4 : 3) : dwi_score;
    } else {
        dominant = "T2WI";
        pirads_score = t2wi_score === 3 ? (dwi_score >= 4 ? 4 : 3) : t2wi_score;
    }

    const recommendations = {
        1: "Very low probability of clinically significant prostate cancer. No biopsy recommended.",
        2: "Low probability. No biopsy recommended (consider in clinical context).",
        3: "Intermediate probability. Biopsy at clinician discretion — consider PSA density and clinical risk factors.",
        4: "High probability of clinically significant prostate cancer. Targeted biopsy recommended.",
        5: "Very high probability of clinically significant prostate cancer. Targeted biopsy strongly recommended.",
    };

    return {
        recommendation: `PI-RADS ${pirads_score}: ${recommendations[pirads_score]}`,
        results: { "PI-RADS score": pirads_score, "Dominant sequence": dominant }
    };
}

function psa_density_calculator(psa, prostate_volume_cc) {
    psa = Number(psa);
    prostate_volume_cc = Number(prostate_volume_cc);

    if (prostate_volume_cc <= 0) return { recommendation: "Error: Prostate volume must be greater than 0." };

    const psad = Math.round((psa / prostate_volume_cc) * 1000) / 1000;

    let interpretation;
    if (psad < 0.10)      interpretation = "Low risk. Biopsy may be deferred in PI-RADS 3 lesions.";
    else if (psad < 0.15) interpretation = "Intermediate risk. Shared decision-making recommended for PI-RADS 3 lesions.";
    else                  interpretation = "Higher risk. Supports biopsy recommendation, particularly for PI-RADS 3 lesions.";

    return {
        recommendation: `PSA Density: ${psad} ng/mL/cc — ${interpretation}`,
        results: { "PSA density": `${psad} ng/mL/cc` }
    };
}

function lirads_calculator(size_mm, aphe, washout, enhancing_capsule, threshold_growth, lrm_features, tumor_in_vein) {
    size_mm = Number(size_mm);
    aphe = ['yes', 'true', '1'].includes(String(aphe).toLowerCase());
    washout = ['yes', 'true', '1'].includes(String(washout).toLowerCase());
    enhancing_capsule = ['yes', 'true', '1'].includes(String(enhancing_capsule).toLowerCase());
    threshold_growth = ['yes', 'true', '1'].includes(String(threshold_growth).toLowerCase());
    lrm_features = ['yes', 'true', '1'].includes(String(lrm_features).toLowerCase());
    tumor_in_vein = ['yes', 'true', '1'].includes(String(tumor_in_vein).toLowerCase());

    if (tumor_in_vein) {
        return {
            recommendation: "LR-TIV: Definite tumor in vein. Multidisciplinary review required. Staging and treatment per oncology/hepatology team.",
            results: { "LI-RADS Category": "LR-TIV", "HCC Risk": "N/A" }
        };
    }

    if (lrm_features) {
        return {
            recommendation: "LR-M: Probably or definitely malignant, not HCC-specific. Biopsy recommended to determine malignancy type. Multidisciplinary review.",
            results: { "LI-RADS Category": "LR-M", "HCC Risk": "N/A (non-HCC malignancy)" }
        };
    }

    const additional = (washout ? 1 : 0) + (enhancing_capsule ? 1 : 0) + (threshold_growth ? 1 : 0);

    let category;
    if (size_mm < 10) {
        category = (!aphe && additional < 2) ? "LR-3" : (aphe && additional === 0) ? "LR-3" : "LR-4";
    } else if (size_mm < 20) {
        if (!aphe) category = additional >= 1 ? "LR-4" : "LR-3";
        else        category = additional >= 1 ? "LR-5" : "LR-4";
    } else {
        if (!aphe) category = additional >= 1 ? "LR-4" : "LR-3";
        else        category = additional >= 1 ? "LR-5" : "LR-4";
    }

    const hccRisks = { "LR-3": "~38%", "LR-4": "~74%", "LR-5": "≥95%" };
    const recommendations = {
        "LR-3": "LR-3: Intermediate probability of HCC. Continue HCC surveillance. Consider follow-up imaging in 3–6 months.",
        "LR-4": "LR-4: Probably HCC. Multidisciplinary review recommended. Consider additional imaging, biopsy, or treatment.",
        "LR-5": "LR-5: Definitely HCC. Proceed with HCC treatment per multidisciplinary team (resection, transplant, ablation, or TACE).",
    };

    return {
        recommendation: recommendations[category],
        results: {
            "LI-RADS Category": category,
            "HCC Risk": hccRisks[category],
            "Additional major features": additional
        }
    };
}

function bosniak_calculator(enhancement, wall_septa, septa_count, calcification, high_attenuation_non_enhancing, size_cm) {
    enhancement = (enhancement || '').toLowerCase();
    wall_septa = (wall_septa || '').toLowerCase();
    septa_count = (septa_count || '').toLowerCase();
    calcification = (calcification || '').toLowerCase();
    high_attenuation_non_enhancing = ['yes', 'true', '1'].includes(String(high_attenuation_non_enhancing).toLowerCase());
    size_cm = size_cm !== '' && size_cm != null ? Number(size_cm) : 0;

    let category, risk, management;

    if (enhancement === 'measurable') {
        if (wall_septa === 'irregular_thick') {
            category = "IV"; risk = ">75%";
            management = "Bosniak IV: Surgical excision or ablation recommended. Malignant until proven otherwise. Urology/oncology referral.";
        } else {
            category = "III"; risk = "~50%";
            management = "Bosniak III: Indeterminate. Surgical excision or nephron-sparing surgery generally recommended. Multidisciplinary urology review.";
        }
    } else if (enhancement === 'perceived') {
        category = "IIF"; risk = "~5–15%";
        management = "Bosniak IIF: Equivocal/perceived enhancement. Follow-up CT/MRI in 6 months, then annually for 5 years.";
    } else {
        if (high_attenuation_non_enhancing) {
            if (size_cm > 3.0) {
                category = "IIF"; risk = "~5–15%";
                management = "Bosniak IIF: Non-enhancing high-attenuation cyst >3 cm. Follow-up CT/MRI in 6 months, then annually for 5 years.";
            } else {
                category = "II"; risk = "~2%";
                management = "Bosniak II: Non-enhancing high-attenuation cyst ≤3 cm. No follow-up required.";
            }
        } else if (wall_septa === 'irregular_thick' || calcification === 'thick_nodular') {
            category = "IIF"; risk = "~5–15%";
            management = "Bosniak IIF: Moderately complex non-enhancing cyst. Follow-up CT/MRI in 6 months, then annually for 5 years.";
        } else if (wall_septa === 'smooth_thick' || septa_count === '4_plus') {
            category = "IIF"; risk = "~5–15%";
            management = "Bosniak IIF: Multiple or thickened non-enhancing septa/wall. Follow-up CT/MRI in 6 months, then annually for 5 years.";
        } else if (septa_count === '1_to_3' || calcification === 'fine') {
            category = "II"; risk = "~2%";
            management = "Bosniak II: Minimally complex benign cyst. No follow-up required.";
        } else {
            category = "I"; risk = "<1%";
            management = "Bosniak I: Simple benign cyst. No follow-up required.";
        }
    }

    return {
        recommendation: management,
        results: { "Bosniak Category": `Bosniak ${category}`, "Malignancy Risk": risk }
    };
}

function adrenal_nodule_calculator(size_cm, unenhanced_hu, cancer_history) {
    size_cm = Number(size_cm);
    const hu = (unenhanced_hu !== '' && unenhanced_hu != null) ? Number(unenhanced_hu) : null;
    cancer_history = ['yes', 'true', '1'].includes(String(cancer_history).toLowerCase());

    let recommendation;

    if (size_cm < 1.0) {
        recommendation = cancer_history
            ? "< 1 cm with known malignancy: Generally benign, but consider follow-up given oncologic context."
            : "< 1 cm: Benign. No follow-up needed.";
    } else if (size_cm <= 4.0) {
        if (hu !== null && hu <= 10) {
            recommendation = "1–4 cm with HU ≤ 10: Lipid-rich adenoma. No further follow-up needed.";
        } else if (cancer_history) {
            recommendation = "1–4 cm, indeterminate, history of malignancy: Consider adrenal washout CT, MRI (chemical shift), or PET/CT. If not an adenoma or PET-avid, consider biopsy or resection.";
        } else {
            recommendation = "1–4 cm, indeterminate (HU > 10 or unknown), no cancer history: Consider adrenal washout CT or MRI (chemical shift). If still indeterminate, follow-up CT/MRI at 6–12 months. If stable at 1 year, stop follow-up.";
        }
    } else {
        recommendation = "> 4 cm: Resection is often recommended due to risk of adrenocortical carcinoma. Biochemical evaluation required before surgery to rule out pheochromocytoma. Do NOT biopsy a potentially resectable adrenocortical carcinoma.";
    }

    return { recommendation };
}


// ─── Calculator dispatch map ──────────────────────────────────────────────────

const CALCULATORS = {
    fleischner:      (p) => fleischner_calculator(p.size_mm, p.nodule_type, p.patient_risk, p.multiplicity),
    adrenal_washout: (p) => adrenal_washout_calculator(p.washout_unenhanced_hu, p.washout_venous_hu, p.washout_delayed_hu),
    tirads:          (p) => tirads_calculator(p.composition_pts, p.echogenicity_pts, p.shape_pts, p.margin_pts, p.echogenic_foci_pts, p.size_cm),
    lung_rads:       (p) => lung_rads_calculator(p.nodule_type, p.size_mm, p.solid_component_mm, p.is_new, p.has_suspicious_features),
    pirads:          (p) => pirads_calculator(p.zone, p.dwi_score, p.t2wi_score, p.dce_positive),
    psa_density:     (p) => psa_density_calculator(p.psa, p.prostate_volume_cc),
    adrenal_nodule:  (p) => adrenal_nodule_calculator(p.size_cm, p.unenhanced_hu, p.cancer_history),
    lirads:          (p) => lirads_calculator(p.size_mm, p.aphe, p.washout, p.enhancing_capsule, p.threshold_growth, p.lrm_features, p.tumor_in_vein),
    bosniak:         (p) => bosniak_calculator(p.enhancement, p.wall_septa, p.septa_count, p.calcification, p.high_attenuation_non_enhancing, p.size_cm),
};


// ─── Generic form handler ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    function handleCalculator(guidelineId, formId, resultId, paramNames) {
        const form = document.getElementById(formId);
        const resultContainer = document.getElementById(resultId);
        if (!form || !resultContainer) return;

        // Auto-fill from URL parameters
        let autoFill = false;
        paramNames.forEach(param => {
            if (urlParams.has(param)) {
                const el = document.getElementById(`calc-${param}`);
                if (el) { el.value = urlParams.get(param); autoFill = true; }
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect parameters
            const parameters = {};
            paramNames.forEach(param => {
                const el = document.getElementById(`calc-${param}`);
                if (el) {
                    let val = el.value;
                    if (val !== '' && !isNaN(val)) val = Number(val);
                    parameters[param] = val;
                }
            });

            const btn = document.getElementById(`${formId}-btn`);
            if (btn) btn.disabled = true;

            try {
                const fn = CALCULATORS[guidelineId];
                if (!fn) throw new Error(`Unknown calculator: ${guidelineId}`);
                const data = fn(parameters);

                let html = `
                    <div class="result-title">Calculation Result</div>
                    <div class="result-recommendation"><strong>Recommendation:</strong><br/>${data.recommendation}</div>
                `;
                if (data.results) {
                    html += '<div class="result-inputs"><strong>Specifics:</strong><ul>';
                    for (const [key, value] of Object.entries(data.results)) {
                        if (value !== null && value !== undefined) {
                            html += `<li>${key}: ${value}</li>`;
                        }
                    }
                    html += '</ul></div>';
                }

                resultContainer.innerHTML = html;
                resultContainer.style.display = 'block';
            } catch (err) {
                resultContainer.innerHTML = `<div style="color: red;">Error: ${err.message}</div>`;
                resultContainer.style.display = 'block';
            } finally {
                if (btn) btn.disabled = false;
            }
        });

        if (autoFill) form.dispatchEvent(new Event('submit'));
    }

    // Register all calculators
    handleCalculator('fleischner',      'fleischner-form',      'fleischner-results',      ['size_mm', 'nodule_type', 'patient_risk', 'multiplicity']);
    handleCalculator('adrenal_washout', 'adrenal-form',         'adrenal-results',         ['washout_unenhanced_hu', 'washout_venous_hu', 'washout_delayed_hu']);
    handleCalculator('tirads',          'tirads-form',          'tirads-results',          ['composition_pts', 'echogenicity_pts', 'shape_pts', 'margin_pts', 'echogenic_foci_pts', 'size_cm']);
    handleCalculator('lung_rads',       'lungrads-form',        'lungrads-results',        ['nodule_type', 'size_mm', 'solid_component_mm', 'is_new', 'has_suspicious_features']);
    handleCalculator('pirads',          'pirads-form',          'pirads-results',          ['zone', 'dwi_score', 't2wi_score', 'dce_positive']);
    handleCalculator('psa_density',     'psa-density-form',     'psa-density-results',     ['psa', 'prostate_volume_cc']);
    handleCalculator('adrenal_nodule',  'adrenal-nodule-form',  'adrenal-nodule-results',  ['size_cm', 'unenhanced_hu', 'cancer_history']);
    handleCalculator('lirads',          'lirads-form',          'lirads-results',          ['size_mm', 'aphe', 'washout', 'enhancing_capsule', 'threshold_growth', 'lrm_features', 'tumor_in_vein']);
    handleCalculator('bosniak',         'bosniak-form',         'bosniak-results',         ['enhancement', 'wall_septa', 'septa_count', 'calcification', 'high_attenuation_non_enhancing', 'size_cm']);
});
