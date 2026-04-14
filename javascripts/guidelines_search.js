// ─── Client-side guideline search (no backend required) ───────────────────────

const GUIDELINES = [
    // Hepatobiliary
    {
        name: "LI-RADS v2023",
        description: "Liver imaging reporting and data system for hepatocellular carcinoma",
        url: "hepatobiliary/li_rads/",
        keywords: ["li-rads", "lirads", "liver", "hcc", "hepatocellular", "carcinoma", "cirrhosis", "mri", "ct", "aphe", "washout"],
        category: "Hepatobiliary",
        hasCalculator: true,
    },
    {
        name: "Incidental Gallbladder Polyp ACR 2017",
        description: "Management of incidental gallbladder polyps",
        url: "hepatobiliary/gallbladder_polyp_acr_2017/",
        keywords: ["gallbladder", "polyp", "incidental", "acr", "biliary"],
        category: "Hepatobiliary",
        hasCalculator: false,
    },
    {
        name: "Incidental Gallbladder Lesions CAR 2025",
        description: "Canadian guidelines for incidental gallbladder lesions",
        url: "hepatobiliary/gallbladder_lesions_car_2025/",
        keywords: ["gallbladder", "lesion", "incidental", "car", "canadian"],
        category: "Hepatobiliary",
        hasCalculator: false,
    },
    {
        name: "Incidental Hepatobiliary Lesions CAR 2020",
        description: "Canadian guidelines for incidental hepatobiliary findings",
        url: "hepatobiliary/hepatobiliary_lesions_car_2020/",
        keywords: ["hepatobiliary", "liver", "incidental", "car", "canadian"],
        category: "Hepatobiliary",
        hasCalculator: false,
    },

    // Spleen
    {
        name: "Incidental Splenic Lesions CAR 2025",
        description: "Canadian guidelines for incidental splenic lesions",
        url: "spleen/splenic_lesions_car_2025/",
        keywords: ["spleen", "splenic", "incidental", "car", "canadian", "lesion"],
        category: "Spleen",
        hasCalculator: false,
    },

    // Adrenal
    {
        name: "Adrenal Nodule ACR 2017",
        description: "Management of incidental adrenal nodules",
        url: "adrenal/adrenal_nodule_acr_2017/",
        keywords: ["adrenal", "nodule", "incidental", "adenoma", "mass", "acr"],
        category: "Adrenal",
        hasCalculator: true,
    },

    // Pancreatic
    {
        name: "Incidental Pancreatic Cyst ACR 2017",
        description: "Management of incidental pancreatic cysts",
        url: "pancreatic/pancreatic_cyst_acr_2017/",
        keywords: ["pancreatic", "cyst", "incidental", "acr", "ipmn", "mucinous"],
        category: "Pancreatic",
        hasCalculator: false,
    },
    {
        name: "Incidental Pancreatic Cysts CAR 2021",
        description: "Canadian guidelines for incidental pancreatic cysts",
        url: "pancreatic/pancreatic_cysts_car_2021/",
        keywords: ["pancreatic", "cyst", "incidental", "car", "canadian"],
        category: "Pancreatic",
        hasCalculator: false,
    },

    // Genitourinary
    {
        name: "PI-RADS v2.1",
        description: "Prostate mpMRI reporting and data system",
        url: "genitourinary/pi_rads/",
        keywords: ["pi-rads", "pirads", "prostate", "mri", "mpmri", "cancer", "dwi", "t2", "dce"],
        category: "Genitourinary",
        hasCalculator: true,
    },
    {
        name: "Bosniak v2019",
        description: "Bosniak v2019 classification of renal cystic masses with malignancy risk and management",
        url: "genitourinary/bosniak/",
        keywords: ["bosniak", "renal", "kidney", "cyst", "cystic", "mass", "rcc", "carcinoma", "enhancement", "septa"],
        category: "Genitourinary",
        hasCalculator: true,
    },
    {
        name: "Incidental Renal Mass CAR 2019",
        description: "Canadian guidelines for incidental renal masses",
        url: "genitourinary/renal_mass_car_2019/",
        keywords: ["renal", "kidney", "mass", "incidental", "car", "canadian"],
        category: "Genitourinary",
        hasCalculator: false,
    },
    {
        name: "Incidental Renal Lesion ACR 2017",
        description: "ACR white paper on incidental renal lesions",
        url: "genitourinary/renal_lesion_acr_2017/",
        keywords: ["renal", "kidney", "lesion", "incidental", "acr", "cyst", "solid"],
        category: "Genitourinary",
        hasCalculator: false,
    },

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
        name: "LUNG-RADS v1.1",
        description: "Lung cancer screening reporting and data system",
        url: "pulmonary/lung_rads/",
        keywords: ["lung rads", "lung-rads", "lungrads", "ldct", "lung cancer", "screening", "nodule"],
        category: "Pulmonary",
        hasCalculator: true,
    },

    // Breast
    {
        name: "ACR BI-RADS v2023",
        description: "Breast imaging reporting and data system",
        url: "breast/bi_rads/",
        keywords: ["bi-rads", "birads", "breast", "mammogram", "ultrasound", "mri", "cancer"],
        category: "Breast",
        hasCalculator: false,
    },

    // Neuro
    {
        name: "Incidental Pituitary Lesions",
        description: "Management of incidental pituitary findings",
        url: "neuro/pituitary/",
        keywords: ["pituitary", "incidental", "adenoma", "sella", "neuro", "brain"],
        category: "Neuro",
        hasCalculator: false,
    },

    // MSK
    {
        name: "Incidental MSK Findings CAR 2023",
        description: "Canadian guidelines for incidental musculoskeletal findings",
        url: "msk/msk_findings_car_2023/",
        keywords: ["msk", "musculoskeletal", "incidental", "car", "canadian", "bone", "joint"],
        category: "MSK",
        hasCalculator: false,
    },

    // Cardiovascular
    {
        name: "ARVC 2019",
        description: "Arrhythmogenic right ventricular cardiomyopathy criteria",
        url: "cardiovascular/arvc_2019/",
        keywords: ["arvc", "arvd", "arrhythmogenic", "right ventricle", "cardiomyopathy", "cardiac", "mri"],
        category: "Cardiovascular",
        hasCalculator: false,
    },
    {
        name: "Thoracic Aortic Aneurysm",
        description: "Thoracic aortic aneurysm surveillance guidelines",
        url: "cardiovascular/thoracic_aortic_aneurysm/",
        keywords: ["thoracic", "aortic", "aneurysm", "taa", "aorta", "surveillance"],
        category: "Cardiovascular",
        hasCalculator: false,
    },

    // Gyn
    {
        name: "O-RADS v2023",
        description: "Ovarian-adnexal reporting and data system",
        url: "gyn/o_rads/",
        keywords: ["o-rads", "orads", "ovarian", "adnexal", "cyst", "mass", "ultrasound"],
        category: "Gyn",
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

    // Oncology
    {
        name: "TN Lung Cancer Staging",
        description: "TNM lung cancer staging (8th edition)",
        url: "oncology/lung_cancer_staging/",
        keywords: ["lung cancer", "staging", "tnm", "nsclc", "sclc", "t stage", "n stage", "m stage"],
        category: "Oncology",
        hasCalculator: false,
    },
    {
        name: "Rectal Cancer Staging",
        description: "Rectal cancer T-staging and imaging assessment",
        url: "oncology/rectal_cancer_staging/",
        keywords: ["rectal", "cancer", "staging", "tnm", "t stage", "colon", "colorectal", "mri"],
        category: "Oncology",
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
