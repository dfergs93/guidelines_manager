document.addEventListener('DOMContentLoaded', () => {
    // Determine the API base URL
    // radiology-agent backend serves guideline endpoints on :8002
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
                        resultHtml += `<li>${key}: ${value}</li>`;
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

    // Initialize Fleischner Calculator if present
    handleCalculator('fleischner', 'fleischner-form', 'fleischner-results', [
        'size_mm', 'nodule_type', 'patient_risk', 'multiplicity'
    ]);

    // Initialize Adrenal Washout Calculator if present
    handleCalculator('adrenal_washout', 'adrenal-form', 'adrenal-results', [
        'unenhanced_hu', 'venous_hu', 'delayed_hu'
    ]);
});
