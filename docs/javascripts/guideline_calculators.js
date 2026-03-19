document.addEventListener('DOMContentLoaded', () => {
    // Determine the API base URL
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8002'
        : 'https://radiology-protocols.onrender.com';

    // Parse URL Parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Abstract function to handle calculator logic
    async function handleCalculator(guidelineId, formId, resultId, paramNames) {
        const form = document.getElementById(formId);
        const resultContainer = document.getElementById(resultId);

        if (!form || !resultContainer) return;

        // Auto-fill from URL parameters if available
        let autoFill = false;
        paramNames.forEach(param => {
            if (urlParams.has(param)) {
                const el = document.getElementById(`calc-${param}`);
                if (el) {
                    el.value = urlParams.get(param);
                    autoFill = true;
                }
            }
        });

        // Add submit event
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Gather parameters
            const parameters = {};
            paramNames.forEach(param => {
                const el = document.getElementById(`calc-${param}`);
                if (el) {
                    let val = el.value;
                    // convert to number if possible and not empty
                    if (val !== '' && !isNaN(val)) {
                        val = Number(val);
                    }
                    parameters[param] = val;
                }
            });

            const btn = document.getElementById(`${formId}-btn`);
            if (btn) btn.disabled = true;

            try {
                const response = await fetch(`${API_BASE_URL}/api/guideline-calculate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        guideline_id: guidelineId,
                        parameters: parameters
                    })
                });

                if (!response.ok) {
                    throw new Error(`Calculation failed: ${response.status}`);
                }

                const data = await response.json();

                // Display results
                let resultHtml = `
                    <div class="result-title">Calculation Result</div>
                    <div class="result-recommendation"><strong>Recommendation:</strong><br/>${data.recommendation}</div>
                `;

                if (data.results) {
                    resultHtml += '<div class="result-inputs"><strong>Specifics:</strong><ul>';
                    for (const [key, value] of Object.entries(data.results)) {
                        if (value !== null && value !== undefined) {
                            resultHtml += `<li>${key.replace(/_/g, ' ')}: ${value}</li>`;
                        }
                    }
                    resultHtml += '</ul></div>';
                }

                resultContainer.innerHTML = resultHtml;
                resultContainer.style.display = 'block';

            } catch (error) {
                console.error('Calculator error:', error);
                resultContainer.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
                resultContainer.style.display = 'block';
            } finally {
                if (btn) btn.disabled = false;
            }
        });

        // Auto-trigger calculation if prefilled via URL
        if (autoFill) {
            form.dispatchEvent(new Event('submit'));
        }
    }

    // Fleischner Calculator
    handleCalculator('fleischner', 'fleischner-form', 'fleischner-results', [
        'size_mm', 'nodule_type', 'patient_risk', 'multiplicity'
    ]);

    // Adrenal Washout Calculator
    handleCalculator('adrenal_washout', 'adrenal-form', 'adrenal-results', [
        'unenhanced_hu', 'venous_hu', 'delayed_hu'
    ]);

    // TI-RADS Calculator
    handleCalculator('tirads', 'tirads-form', 'tirads-results', [
        'composition_pts', 'echogenicity_pts', 'shape_pts', 'margin_pts', 'echogenic_foci_pts', 'size_cm'
    ]);

    // Lung-RADS Calculator
    handleCalculator('lung_rads', 'lungrads-form', 'lungrads-results', [
        'nodule_type', 'size_mm', 'solid_component_mm', 'is_new', 'has_suspicious_features'
    ]);

    // PI-RADS Calculator
    handleCalculator('pirads', 'pirads-form', 'pirads-results', [
        'zone', 'dwi_score', 't2wi_score', 'dce_positive'
    ]);

    // PSA Density Calculator
    handleCalculator('psa_density', 'psa-density-form', 'psa-density-results', [
        'psa', 'prostate_volume_cc'
    ]);

    // Adrenal Nodule Management Calculator
    handleCalculator('adrenal_nodule', 'adrenal-nodule-form', 'adrenal-nodule-results', [
        'size_cm', 'unenhanced_hu', 'cancer_history'
    ]);
});
