#!/usr/bin/env python3
"""Generate docs/javascripts/sitemap.json for guidelines_manager GitHub Pages."""
import json
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("Install PyYAML: pip install pyyaml")

ROOT = Path(__file__).parent.parent
DOCS_DIR = ROOT / "docs"
OUTPUT_PATH = DOCS_DIR / "javascripts" / "sitemap.json"

class IgnoreLoader(yaml.SafeLoader):
    pass
IgnoreLoader.add_multi_constructor("", lambda loader, tag, node: None)

# Read site_url from mkdocs.yml
with open(ROOT / "mkdocs.yml") as f:
    mkdocs = yaml.load(f, Loader=IgnoreLoader)
BASE_URL = mkdocs.get("site_url", "").rstrip("/") + "/"


def extract_titles(md_file):
    """Return (fm_title, h1_title, fm_keywords) from a markdown file."""
    try:
        text = md_file.read_text(encoding="utf-8")
    except Exception:
        return None, None, []
    fm_title = None
    fm_keywords: list[str] = []
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            try:
                fm = yaml.load(text[3:end], Loader=IgnoreLoader)
                if isinstance(fm, dict):
                    if fm.get("title"):
                        fm_title = str(fm["title"])
                    if isinstance(fm.get("keywords"), list):
                        fm_keywords = [str(k) for k in fm["keywords"] if k]
            except Exception:
                pass
    h1_title = None
    for line in text.splitlines():
        if line.startswith("# "):
            h1_title = line[2:].strip()
            break
    return fm_title, h1_title, fm_keywords


# URL params accepted by each guideline's calculator for pre-fill via query string.
# Keyed by slug (matches the slug generated below). Source of truth: guideline_calculators.js.
PARAMS: dict[str, list[str]] = {
    "adrenal-nodule-acr-2017": ["washout_unenhanced_hu", "washout_venous_hu", "washout_delayed_hu"],
    "bosniak":                  ["enhancement", "wall_septa", "septa_count", "calcification", "high_attenuation_non_enhancing", "size_cm"],
    "fleischner":               ["size_mm", "nodule_type", "patient_risk", "multiplicity"],
    "li-rads":                  ["size_mm", "aphe", "washout", "enhancing_capsule", "threshold_growth", "lrm_features", "tumor_in_vein", "benign_features"],
    "lung-rads":                ["nodule_type", "size_mm", "solid_component_mm", "is_new", "has_suspicious_features"],
    "pi-rads":                  ["zone", "dwi_score", "t2wi_score", "dce_positive"],
    "tirads":                   ["composition_pts", "echogenicity_pts", "shape_pts", "margin_pts", "echogenic_foci_pts", "size_cm"],
}

# Valid values for categorical params. Drives exact-value constraints in ORCA's extract_params prompt.
# Source of truth: guideline_calculators.js (the calculator's if/elif branches).
PARAM_VALUES: dict[str, dict[str, list[str]]] = {
    "fleischner": {
        "nodule_type":  ["solid", "ground-glass", "part-solid"],
        "patient_risk": ["low", "high"],
        "multiplicity": ["single", "multiple"],
    },
    "lung-rads": {
        "nodule_type": ["solid", "ground-glass", "part-solid"],
    },
}

entries = []
for md_file in sorted(DOCS_DIR.rglob("*.md")):
    if md_file.stem == "index":
        continue
    rel = md_file.relative_to(DOCS_DIR)
    url_path = "/".join(rel.with_suffix("").parts) + "/"
    url = BASE_URL + url_path
    name = md_file.stem
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    fm_title, h1_title, fm_keywords = extract_titles(md_file)
    titles = [t for t in [fm_title, h1_title] if t]
    if titles:
        keywords = titles[:]
        for t in titles:
            keywords += [w for w in re.split(r"[\s\-/]+", t) if len(w) > 2]
        keywords = list(dict.fromkeys(keywords))
    else:
        fallback = " ".join(w.capitalize() for w in re.split(r"[_\-]+", name))
        keywords = [fallback]
    for kw in fm_keywords:
        if kw not in keywords:
            keywords.append(kw)
    entry: dict = {"slug": slug, "keywords": keywords, "url": url}
    if slug in PARAMS:
        entry["params"] = PARAMS[slug]
    if slug in PARAM_VALUES:
        entry["param_values"] = PARAM_VALUES[slug]
    entries.append(entry)

OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
OUTPUT_PATH.write_text(json.dumps(entries, indent=2))
print(f"Wrote {OUTPUT_PATH} — {len(entries)} entries")
