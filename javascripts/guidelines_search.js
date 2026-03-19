document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('guideline-search-input');
    const searchBtn = document.getElementById('guideline-search-btn');
    const resultsContainer = document.getElementById('guideline-results-container');
    const loading = document.getElementById('guideline-loading');

    if (!searchInput || !searchBtn) return;

    // Use absolute URL for the API endpoint spanning domains
    // The guidelines_manager runs on :8003, but the radiology-agent backend is on :8002
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8002'
        : 'https://radiology-protocols.onrender.com';

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) return;

        searchBtn.disabled = true;
        loading.style.display = 'block';
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';

        try {
            const response = await fetch(`${API_BASE_URL}/api/guideline-search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            displayResults(data);

        } catch (error) {
            console.error('Guideline search error:', error);
            resultsContainer.innerHTML = `<div style="color: red; padding: 15px;">Error: ${error.message}</div>`;
            resultsContainer.style.display = 'block';
        } finally {
            searchBtn.disabled = false;
            loading.style.display = 'none';
        }
    });

    function displayResults(data) {
        if (data.error) {
            resultsContainer.innerHTML = `<div style="padding: 15px;"><strong>Could not provide recommendation:</strong> ${data.error}<br/><small>${data.explanation}</small></div>`;
            resultsContainer.style.display = 'block';
            return;
        }

        const inputsHtml = Object.entries(data.inputs)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join(' | ');

        // Make the link relative to the current directory (site root)
        // This handles cases where the site is served under a subpath like /guidelines-manager/
        let targetUrl = data.link;
        if (targetUrl.startsWith('/')) {
            targetUrl = targetUrl.substring(1);
        }

        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(data.inputs)) {
            if (value !== null && value !== undefined) {
                searchParams.append(key, value);
            }
        }
        const fullUrl = `${targetUrl}?${searchParams.toString()}`;

        resultsContainer.innerHTML = `
            <div class="result-title">
                <a href="${fullUrl}">Calculated Guideline: ${data.guideline}</a>
            </div>
            <div class="result-recommendation"><strong>Recommendation:</strong><br/><br/>${data.recommendation}</div>
            <div class="result-inputs">${inputsHtml}</div>
        `;
        resultsContainer.style.display = 'block';
    }
});
