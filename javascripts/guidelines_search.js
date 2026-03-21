// ─── Client-side guideline search (no backend required) ───────────────────────

const GUIDELINES = [
    // Pulmonary
    {
        name: "Fleischner Society 2017",
        description: "Incidental pulmonary nodule follow-up recommendations",
        url: "pulmonary/fleischner/",
        keywords: ["fleischner", "pulmonary", "lung", "nodule", "solid", "ground glass", "part solid", "subsolid", "incidental"],
        category: "Pulmonary",
        hasCalculator: true,
    },
    {
        name: "Lung-RADS v1.1",
        description: "Lung cancer screening reporting and data system",
        url: "pulmonary/lung_rads/",
        keywords: ["lung rads", "lung-rads", "lungrads", "ldct", "lung cancer", "screening", "nodule"],
        category: "Pulmonary",
        hasCalculator: true,
    },
    {
        name: "Lung Cancer Staging",
        description: "TNM lung cancer staging (8th edition)",
        url: "pulmonary/lung_cancer_staging/",
        keywords: ["lung cancer", "staging", "tnm", "nsclc", "sclc", "t stage", "n stage", "m stage"],
        category: "Pulmonary",
        hasCalculator: false,
    },

    // Thyroid
    {
        name: "ACR TI-RADS",
        description: "Thyroid imaging reporting and data system — FNA guidance",
        url: "thyroid/tirads/",
        keywords: ["ti-rads", "tirads", "thyroid", "nodule", "fna", "biopsy", "ultrasound"],
        category: "Thyroid",
        hasCalculator: true,
    },
    {
        name: "Thyroid Nodule",
        description: "General thyroid nodule management guidelines",
        url: "thyroid/thyroid_nodule/",
        keywords: ["thyroid", "nodule", "management"],
        category: "Thyroid",
        hasCalculator: false,
    },
    {
        name: "Thyroid Nodule Ultrasound",
        description: "Thyroid nodule ultrasound features and reporting",
        url: "thyroid/thyroid_nodule_us/",
        keywords: ["thyroid", "nodule", "ultrasound", "us", "features", "reporting"],
        category: "Thyroid",
        hasCalculator: false,
    },

    // Prostate
    {
        name: "PI-RADS v2.1",
        description: "Prostate mpMRI reporting and data system",
        url: "prostate/pi_rads/",
        keywords: ["pi-rads", "pirads", "prostate", "mri", "mpmri", "cancer", "dwi", "t2", "dce"],
        category: "Prostate",
        hasCalculator: true,
    },

    // Breast
    {
        name: "ACR BI-RADS",
        description: "Breast imaging reporting and data system",
        url: "breast/bi_rads/",
        keywords: ["bi-rads", "birads", "breast", "mammogram", "ultrasound", "mri", "cancer"],
        category: "Breast",
        hasCalculator: false,
    },

    // Adrenal
    {
        name: "Adrenal Nodule (ACR 2017)",
        description: "Management of incidental adrenal nodules",
        url: "abdominal/adrenal/adrenal_nodule/",
        keywords: ["adrenal", "nodule", "incidental", "adenoma", "mass", "acr"],
        category: "Abdominal",
        hasCalculator: true,
    },
    {
        name: "Adrenal Washout Calculator",
        description: "CT adrenal washout protocol for adenoma characterisation",
        url: "abdominal/adrenal/adrenal_washout/",
        keywords: ["adrenal", "washout", "adenoma", "ct", "hu", "hounsfield", "lipid", "pheochromocytoma"],
        category: "Abdominal",
        hasCalculator: true,
    },

    // Liver
    {
        name: "LI-RADS",
        description: "Liver imaging reporting and data system for hepatocellular carcinoma",
        url: "abdominal/liver/li_rads/",
        keywords: ["li-rads", "lirads", "liver", "hcc", "hepatocellular", "carcinoma", "cirrhosis", "mri", "ct"],
        category: "Abdominal",
        hasCalculator: false,
    },
    {
        name: "Liver Lesion Workup (ACR 2017)",
        description: "ACR incidental liver lesion workup recommendations",
        url: "abdominal/liver/liver_lesion_workup/",
        keywords: ["liver", "lesion", "incidental", "workup", "acr", "cyst", "hemangioma"],
        category: "Abdominal",
        hasCalculator: false,
    },
    {
        name: "Hepatic Trauma Grading",
        description: "AAST hepatic trauma injury grading scale",
        url: "abdominal/liver/hepatic_trauma/",
        keywords: ["liver", "hepatic", "trauma", "injury", "aast", "grading", "laceration"],
        category: "Trauma",
        hasCalculator: false,
    },
    {
        name: "Gallbladder and Biliary Tract",
        description: "Gallbladder and biliary tract guidelines",
        url: "abdominal/liver/gallbladder/",
        keywords: ["gallbladder", "biliary", "cholecystitis", "bile duct", "cholelithiasis"],
        category: "Abdominal",
        hasCalculator: false,
    },

    // Renal
    {
        name: "Renal Lesion",
        description: "Renal lesion characterisation and management",
        url: "abdominal/renal/renal_lesion/",
        keywords: ["renal", "kidney", "lesion", "cyst", "mass", "rcc", "carcinoma", "bosniak"],
        category: "Abdominal",
        hasCalculator: false,
    },
    {
        name: "Renal Injury Grading",
        description: "AAST renal trauma injury grading scale",
        url: "abdominal/renal/renal_injury/",
        keywords: ["renal", "kidney", "trauma", "injury", "aast", "grading"],
        category: "Trauma",
        hasCalculator: false,
    },

    // Pancreas
    {
        name: "Pancreatic Cysts — Incidental",
        description: "Management of incidentally discovered pancreatic cystic lesions",
        url: "abdominal/pancreas/pancreatic_cysts/",
        keywords: ["pancreas", "pancreatic", "cyst", "ipmn", "incidental", "mucinous"],
        category: "Abdominal",
        hasCalculator: false,
    },
    {
        name: "Pancreatic Injury Grading",
        description: "AAST pancreatic trauma injury grading scale",
        url: "abdominal/pancreas/pancreatic_injury/",
        keywords: ["pancreas", "pancreatic", "trauma", "injury", "aast", "grading"],
        category: "Trauma",
        hasCalculator: false,
    },

    // Spleen
    {
        name: "Splenic Injury Grading",
        description: "AAST splenic trauma injury grading scale",
        url: "abdominal/spleen/splenic_injury/",
        keywords: ["spleen", "splenic", "trauma", "injury", "aast", "grading", "laceration"],
        category: "Trauma",
        hasCalculator: false,
    },

    // GI
    {
        name: "Rectal Cancer",
        description: "Rectal cancer MRI staging and reporting",
        url: "abdominal/gastrointestinal/rectal_cancer/",
        keywords: ["rectal", "rectum", "cancer", "staging", "mri", "emvi", "mrf"],
        category: "Abdominal",
        hasCalculator: false,
    },

    // Gynaecology
    {
        name: "Adnexal Mass",
        description: "Characterisation and management of adnexal masses",
        url: "gyn/adnexal/adnexal_mass/",
        keywords: ["adnexal", "ovarian", "mass", "ultrasound", "gyn", "gynaecology", "ovary"],
        category: "Gynaecology",
        hasCalculator: false,
    },
    {
        name: "Adnexal Cyst Ultrasound",
        description: "Ultrasound assessment of adnexal cysts",
        url: "gyn/adnexal/adnexal_cyst/",
        keywords: ["adnexal", "cyst", "ovarian", "ultrasound", "gyn"],
        category: "Gynaecology",
        hasCalculator: false,
    },
    {
        name: "Pregnancy Unknown Location",
        description: "Management of pregnancy of unknown location (PUL)",
        url: "gyn/pregnancy/pregnancy_unknown_location/",
        keywords: ["pregnancy", "pul", "ectopic", "unknown location", "hcg"],
        category: "Gynaecology",
        hasCalculator: false,
    },
    {
        name: "Pregnancy Viability — Initial",
        description: "Initial assessment of pregnancy viability",
        url: "gyn/pregnancy/pregnancy_viability_initial/",
        keywords: ["pregnancy", "viability", "first trimester", "miscarriage", "fetal heart"],
        category: "Gynaecology",
        hasCalculator: false,
    },
    {
        name: "Pregnancy Viability — Follow-up",
        description: "Follow-up assessment of pregnancy viability",
        url: "gyn/pregnancy/pregnancy_viability_followup/",
        keywords: ["pregnancy", "viability", "follow-up", "first trimester", "miscarriage"],
        category: "Gynaecology",
        hasCalculator: false,
    },

    // MSK
    {
        name: "Scoliosis",
        description: "Scoliosis imaging assessment and Cobb angle measurement",
        url: "msk/scoliosis/",
        keywords: ["scoliosis", "spine", "cobb", "msk", "musculoskeletal"],
        category: "MSK",
        hasCalculator: false,
    },

    // Neuro
    {
        name: "Pituitary",
        description: "Pituitary gland imaging guidelines",
        url: "neuro/pituitary/",
        keywords: ["pituitary", "adenoma", "microadenoma", "macroadenoma", "neuro", "sella"],
        category: "Neuro",
        hasCalculator: false,
    },

    // Vascular
    {
        name: "Abdominal Aortic Aneurysm",
        description: "AAA surveillance and management thresholds",
        url: "vascular/aaa/",
        keywords: ["aaa", "aortic", "aneurysm", "abdominal", "vascular", "surveillance"],
        category: "Vascular",
        hasCalculator: false,
    },

    // Contrast
    {
        name: "ACR Contrast Safety",
        description: "Iodinated and gadolinium contrast agent guidelines",
        url: "contrast/contrast_safety/",
        keywords: ["contrast", "iodinated", "gadolinium", "acr", "allergy", "premedication", "nsf", "gfr", "renal"],
        category: "Contrast",
        hasCalculator: false,
    },
];

// ─── Search logic ─────────────────────────────────────────────────────────────

function searchGuidelines(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return GUIDELINES.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.keywords.some(k => k.includes(q))
    );
}

// ─── DOM wiring ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('guideline-search-input');
    const searchBtn = document.getElementById('guideline-search-btn');
    const resultsContainer = document.getElementById('guideline-results-container');
    const loading = document.getElementById('guideline-loading');

    if (!searchInput || !resultsContainer) return;

    // Hide unused loading indicator (no async work needed)
    if (loading) loading.style.display = 'none';

    function renderResults(results, query) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `<div style="padding: 12px; color: var(--md-default-fg-color--light);">No guidelines found for <strong>${query}</strong>.</div>`;
        } else {
            resultsContainer.innerHTML = results.map(g => `
                <div class="search-result-item">
                    <div class="result-title">
                        <a href="${g.url}">${g.name}</a>
                        ${g.hasCalculator ? '<span class="result-badge">Calculator</span>' : ''}
                    </div>
                    <div class="result-description">${g.description}</div>
                    <div class="result-category">${g.category}</div>
                </div>
            `).join('');
        }
        resultsContainer.style.display = 'block';
    }

    function doSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            resultsContainer.style.display = 'none';
            return;
        }
        renderResults(searchGuidelines(query), query);
    }

    searchInput.addEventListener('input', doSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doSearch();
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', doSearch);
    }
});
