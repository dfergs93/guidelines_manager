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

    // Liver
    {
        name: "LI-RADS v2018",
        description: "Liver imaging reporting and data system for hepatocellular carcinoma",
        url: "abdominal/liver/li_rads/",
        keywords: ["li-rads", "lirads", "liver", "hcc", "hepatocellular", "carcinoma", "cirrhosis", "mri", "ct", "aphe", "washout"],
        category: "Abdominal",
        hasCalculator: true,
    },

    // Renal
    {
        name: "Bosniak Renal Cyst Classification",
        description: "Bosniak v2019 classification of renal cystic masses with malignancy risk and management",
        url: "abdominal/renal/bosniak/",
        keywords: ["bosniak", "renal", "kidney", "cyst", "cystic", "mass", "rcc", "carcinoma", "enhancement", "septa"],
        category: "Abdominal",
        hasCalculator: true,
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
