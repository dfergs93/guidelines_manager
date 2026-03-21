# TODO — Radiology Guidelines Manager

## Near-term

### Search
- [x] Replace the current backend-dependent search UI with a pure client-side search
  - Filter/search by guideline name and display matching calculator on the index page
  - Remove call to `/api/guideline-search` from `guidelines_search.js`
  - No backend required for this phase

### Content & Links
- [x] Audit all internal links across the docs site and fix broken ones
  - Removed broken `thyroid_nodule_us.md` row from index (page deleted, content merged)
  - Removed broken `/radiology-protocols/...` cross-project links from fleischner, lung_rads, tirads
- [x] Auto-generate "Last Updated" date from git commit history (e.g. via MkDocs hook or CI step)
  - Added `mkdocs-git-revision-date-localized-plugin`; shows last-updated date in page footer
  - Updated CI to use `fetch-depth: 0` so git history is available during build

### Documentation
- [ ] Write a minimal `README.md` covering:
  - Project overview
  - Local setup (MkDocs + backend)
  - How to add a new guideline/calculator

### Testing
- [ ] Add basic unit tests for Python calculators in `guideline_tools.py`
  - Happy path + key edge cases for each calculator (Fleischner, TI-RADS, Lung-RADS, PI-RADS, PSA Density, Adrenal Washout, Adrenal Nodule)
  - Use pytest

---

## Medium-term

### New Calculators
- [ ] Add **BI-RADS** interactive calculator to the existing BI-RADS page
- [ ] Add **Cardiac MR** guidelines section and calculators:
  - ARVC (Arrhythmogenic Right Ventricular Cardiomyopathy) diagnostic criteria
  - Myocarditis criteria (Lake Louise)
- [ ] Add **Vascular** guidelines section and calculators:
  - Aortoiliac aneurysm size thresholds and management
  - SMA (Superior Mesenteric Artery) dissection classification

### Backend Deployment
- [ ] Containerize the FastAPI backend (add `Dockerfile`)
- [ ] Deploy backend to cloud (Render or Railway)
- [ ] Move hardcoded CORS origins to environment variables (`ALLOWED_ORIGINS`)
- [ ] Update CI/CD pipeline to deploy backend alongside the docs site

### UX Improvements
- [ ] Audit and fix calculator form layouts on mobile screen sizes
- [ ] Default the site theme to dark mode
- [ ] Implement shareable calculator URLs (pre-fill forms via URL query parameters — partial implementation already exists in `guideline_calculators.js`)

---

## Longer-term

### MCP Server Integration
- [ ] Evaluate wrapping the Python calculators as an MCP server so they can be called as tools by Claude or other agents
  - Keep `guideline_tools.py` and `GUIDELINE_TOOLS` definitions in place until this decision is made
  - If MCP server is not pursued, delete the Python calculator duplication

### New Specialty Areas
- [ ] Expand into hidden specialty areas after existing content is polished:
  - Gynecology (gyn)
  - Musculoskeletal (msk)
  - Neurology (neuro)
  - Vascular (already started above)
