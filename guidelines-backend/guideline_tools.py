import json
from typing import Dict, Any, Optional


# ─── Helpers ────────────────────────────────────────────────────────────────

def _to_bool(val) -> bool:
    if isinstance(val, bool):
        return val
    if isinstance(val, (int, float)):
        return bool(val)
    return str(val).lower() in ('yes', 'true', '1')

def _to_float_or_none(val) -> Optional[float]:
    if val is None or val == "":
        return None
    try:
        return float(val)
    except (TypeError, ValueError):
        return None


# ─── Calculators ─────────────────────────────────────────────────────────────

def fleischner_calculator(size_mm: float, nodule_type: str, patient_risk: str, multiplicity: str) -> Dict[str, Any]:
    """
    Calculates the 2017 Fleischner Society recommendation for incidental pulmonary nodules.
    """
    nodule_type = nodule_type.lower()
    patient_risk = patient_risk.lower()
    multiplicity = multiplicity.lower()

    rec = "No recommendation found for given parameters."

    if nodule_type == 'solid':
        if multiplicity == 'single':
            if size_mm < 6:
                rec = "No routine follow-up" if patient_risk == 'low' else "Optional CT at 12 mo"
            elif 6 <= size_mm <= 8:
                rec = "CT 6–12 mo; consider CT 18–24 mo" if patient_risk == 'low' else "CT 6–12 mo and CT 18–24 mo"
            else: # > 8
                rec = "Consider CT ~3 mo, PET/CT and/or biopsy"
        else: # multiple
            if size_mm < 6:
                rec = "No routine follow-up" if patient_risk == 'low' else "Optional CT at 12 mo"
            elif 6 <= size_mm <= 8:
                rec = "CT 3–6 mo; consider CT 18–24 mo" if patient_risk == 'low' else "CT 3–6 mo and CT 18–24 mo"
            else: # > 8
                rec = "CT 3–6 mo ± PET/CT/biopsy"

    elif nodule_type == 'ground-glass':
        if multiplicity == 'single':
            if size_mm < 6:
                rec = "No routine follow-up"
            else: # >= 6
                rec = "CT 6–12 mo to confirm persistence, then q2y until 5y"
        else: # multiple
            if size_mm < 6:
                rec = "CT 3–6 mo; if stable, consider CT at 2 and 4y"
            else: # >= 6
                rec = "CT 3–6 mo; subsequent management guided by most suspicious nodule"

    elif nodule_type == 'part-solid':
        if multiplicity == 'single':
            if size_mm < 6:
                rec = "No routine follow-up"
            else: # >= 6
                rec = "CT 3–6 mo to confirm persistence; if persistent, annual CT until 5y (manage by solid component)"
        else: # multiple
            if size_mm < 6:
                rec = "CT 3–6 mo; if stable, consider CT at 2 and 4y"
            else: # >= 6
                rec = "CT 3–6 mo; subsequent management guided by most suspicious nodule"

    return {
        "guideline": "Fleischner Society 2017",
        "inputs": {
            "size_mm": size_mm,
            "nodule_type": nodule_type,
            "patient_risk": patient_risk,
            "multiplicity": multiplicity
        },
        "recommendation": rec,
        "link": "/pulmonary/fleischner/"
    }


def adrenal_washout_calculator(unenhanced_hu: float, venous_hu: float, delayed_hu: float) -> Dict[str, Any]:
    """
    Calculates absolute and relative adrenal washout to determine likelihood of adenoma.
    """
    absolute_washout = None
    relative_washout = None
    diagnosis = "Indeterminate"

    if unenhanced_hu is not None and venous_hu is not None and delayed_hu is not None:
        den = venous_hu - unenhanced_hu
        absolute_washout = ((venous_hu - delayed_hu) / den * 100) if den != 0 else 0

    if venous_hu is not None and delayed_hu is not None:
        relative_washout = ((venous_hu - delayed_hu) / venous_hu * 100) if venous_hu != 0 else 0

    if unenhanced_hu is not None and unenhanced_hu <= 10:
        diagnosis = "Lipid-rich adenoma (Based on unenhanced HU ≤ 10)"
    elif absolute_washout is not None and absolute_washout > 60:
        diagnosis = "Lipid-poor adenoma (Absolute Washout > 60%)"
    elif relative_washout is not None and relative_washout > 40:
        diagnosis = "Lipid-poor adenoma (Relative Washout > 40%)"
    else:
        diagnosis = "Indeterminate (Does not meet washout criteria for adenoma. Consider metastasis, pheochromocytoma, or adrenocortical carcinoma depending on clinical context.)"

    return {
        "guideline": "Adrenal Washout",
        "inputs": {
            "unenhanced_hu": unenhanced_hu,
            "venous_hu": venous_hu,
            "delayed_hu": delayed_hu
        },
        "results": {
            "absolute_washout_percent": round(float(absolute_washout), 1) if absolute_washout is not None else None,
            "relative_washout_percent": round(float(relative_washout), 1) if relative_washout is not None else None,
            "finding": diagnosis
        },
        "recommendation": diagnosis,
        "link": "/abdominal/adrenal/adrenal_washout/"
    }


def tirads_calculator(
    composition_pts: int,
    echogenicity_pts: int,
    shape_pts: int,
    margin_pts: int,
    echogenic_foci_pts: int,
    size_cm: float
) -> Dict[str, Any]:
    """
    Calculates ACR TI-RADS level and management recommendation for thyroid nodules.
    """
    total = int(composition_pts) + int(echogenicity_pts) + int(shape_pts) + int(margin_pts) + int(echogenic_foci_pts)
    size_cm = float(size_cm)

    if total == 0:
        tr_level = "TR1"
        malignancy_risk = "~0.3%"
    elif total <= 2:
        tr_level = "TR2"
        malignancy_risk = "~1.5%"
    elif total == 3:
        tr_level = "TR3"
        malignancy_risk = "~4.8%"
    elif total <= 6:
        tr_level = "TR4"
        malignancy_risk = "~9.1%"
    else:
        tr_level = "TR5"
        malignancy_risk = "~35%"

    if tr_level in ("TR1", "TR2"):
        recommendation = f"{tr_level} ({total} pts): No FNA recommended. No follow-up needed."
    elif tr_level == "TR3":
        if size_cm < 1.5:
            recommendation = f"TR3 ({total} pts): No FNA, no follow-up needed (< 1.5 cm)."
        elif size_cm < 2.5:
            recommendation = f"TR3 ({total} pts): Consider follow-up ultrasound at 1, 3, and 5 years."
        else:
            recommendation = f"TR3 ({total} pts): Consider FNA (≥ 2.5 cm). Consider follow-up ultrasound at 1, 3, and 5 years."
    elif tr_level == "TR4":
        if size_cm < 1.0:
            recommendation = f"TR4 ({total} pts): No FNA, no follow-up needed (< 1.0 cm)."
        elif size_cm < 1.5:
            recommendation = f"TR4 ({total} pts): Consider follow-up ultrasound at 1, 2, 3, and 5 years."
        else:
            recommendation = f"TR4 ({total} pts): Consider FNA (≥ 1.5 cm). Follow-up ultrasound at 1, 2, 3, and 5 years."
    else:  # TR5
        if size_cm < 0.5:
            recommendation = f"TR5 ({total} pts): No FNA, no follow-up needed (< 0.5 cm)."
        elif size_cm < 1.0:
            recommendation = f"TR5 ({total} pts): Consider follow-up ultrasound at 1, 2, 3, and 5 years."
        else:
            recommendation = f"TR5 ({total} pts): FNA recommended (≥ 1.0 cm). Follow-up ultrasound at 1, 2, 3, and 5 years."

    return {
        "guideline": "ACR TI-RADS 2017",
        "inputs": {
            "composition_pts": composition_pts,
            "echogenicity_pts": echogenicity_pts,
            "shape_pts": shape_pts,
            "margin_pts": margin_pts,
            "echogenic_foci_pts": echogenic_foci_pts,
            "size_cm": size_cm,
        },
        "results": {
            "total_points": total,
            "tirads_level": tr_level,
            "malignancy_risk": malignancy_risk,
        },
        "recommendation": recommendation,
        "link": "/thyroid/tirads/"
    }


def lung_rads_calculator(
    nodule_type: str,
    size_mm: float,
    solid_component_mm=None,
    is_new=False,
    has_suspicious_features=False
) -> Dict[str, Any]:
    """
    Calculates ACR Lung-RADS v1.1 category for lung cancer screening nodules.
    """
    nodule_type = str(nodule_type).lower()
    size_mm = float(size_mm)
    solid_component_mm = _to_float_or_none(solid_component_mm)
    is_new = _to_bool(is_new)
    has_suspicious_features = _to_bool(has_suspicious_features)

    category = "2"
    management = "Annual LDCT screening in 12 months"
    malignancy_risk = "<1%"

    if is_new:
        if size_mm < 4:
            category = "3"
            management = "6-month LDCT"
            malignancy_risk = "1-2%"
        elif size_mm < 6:
            category = "4A"
            management = "3-month LDCT"
            malignancy_risk = "5-15%"
        else:
            category = "4B"
            management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"
            malignancy_risk = ">15%"
    elif nodule_type == "solid":
        if size_mm < 6:
            category = "2"
            management = "Annual LDCT screening in 12 months"
            malignancy_risk = "<1%"
        elif size_mm < 8:
            category = "3"
            management = "6-month LDCT"
            malignancy_risk = "1-2%"
        elif size_mm < 15:
            category = "4A"
            management = "3-month LDCT"
            malignancy_risk = "5-15%"
        else:
            category = "4B"
            management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"
            malignancy_risk = ">15%"
    elif nodule_type == "part-solid":
        if size_mm < 6:
            category = "2"
            management = "Annual LDCT screening in 12 months"
            malignancy_risk = "<1%"
        else:
            solid = solid_component_mm if solid_component_mm is not None else 0
            if solid < 6:
                category = "3"
                management = "6-month LDCT"
                malignancy_risk = "1-2%"
            elif solid < 8:
                category = "4A"
                management = "3-month LDCT"
                malignancy_risk = "5-15%"
            else:
                category = "4B"
                management = "Chest CT ± contrast, PET/CT, and/or tissue sampling"
                malignancy_risk = ">15%"
    elif nodule_type in ("ground-glass", "ground glass", "non-solid"):
        if size_mm < 30:
            category = "2"
            management = "Annual LDCT screening in 12 months"
            malignancy_risk = "<1%"
        else:
            category = "3"
            management = "6-month LDCT"
            malignancy_risk = "1-2%"

    if has_suspicious_features and category in ("3", "4A", "4B"):
        category += "X"
        management = "Additional suspicious features present. " + management + " Consider chest CT with contrast, PET/CT, and/or tissue sampling."

    display_category = f"Lung-RADS {category}"
    return {
        "guideline": "ACR Lung-RADS v1.1",
        "inputs": {
            "nodule_type": nodule_type,
            "size_mm": size_mm,
            "solid_component_mm": solid_component_mm,
            "is_new": is_new,
            "has_suspicious_features": has_suspicious_features,
        },
        "results": {
            "category": display_category,
            "malignancy_risk": malignancy_risk,
        },
        "recommendation": f"{display_category}: {management}",
        "link": "/pulmonary/lung_rads/"
    }


def pirads_calculator(
    zone: str,
    dwi_score: int,
    t2wi_score: int,
    dce_positive=False
) -> Dict[str, Any]:
    """
    Calculates PI-RADS v2.1 overall score based on zone and sequence scores.
    """
    zone = str(zone).lower()
    dwi_score = int(dwi_score)
    t2wi_score = int(t2wi_score)
    dce_positive = _to_bool(dce_positive)

    if zone in ("peripheral", "pz"):
        if dwi_score == 3:
            pirads_score = 4 if dce_positive else 3
        else:
            pirads_score = dwi_score
        dominant = "DWI"
    elif zone in ("transition", "tz"):
        if t2wi_score == 3:
            pirads_score = 4 if dwi_score >= 4 else 3
        else:
            pirads_score = t2wi_score
        dominant = "T2WI"
    else:
        return {"error": "Invalid zone. Use 'peripheral' or 'transition'."}

    recommendations = {
        1: "Very low probability of clinically significant prostate cancer. No biopsy recommended.",
        2: "Low probability. No biopsy recommended (consider in clinical context).",
        3: "Intermediate probability. Biopsy at clinician discretion — consider PSA density and clinical risk factors.",
        4: "High probability of clinically significant prostate cancer. Targeted biopsy recommended.",
        5: "Very high probability of clinically significant prostate cancer. Targeted biopsy strongly recommended.",
    }

    return {
        "guideline": "PI-RADS v2.1",
        "inputs": {
            "zone": zone,
            "dwi_score": dwi_score,
            "t2wi_score": t2wi_score,
            "dce_positive": dce_positive,
        },
        "results": {
            "pirads_score": f"PI-RADS {pirads_score}",
            "dominant_sequence": dominant,
        },
        "recommendation": f"PI-RADS {pirads_score}: {recommendations[pirads_score]}",
        "link": "/prostate/pi_rads/"
    }


def psa_density_calculator(psa: float, prostate_volume_cc: float) -> Dict[str, Any]:
    """
    Calculates PSA density and interprets in context of PI-RADS 3 lesions.
    """
    psa = float(psa)
    prostate_volume_cc = float(prostate_volume_cc)

    if prostate_volume_cc <= 0:
        return {"error": "Prostate volume must be greater than 0."}

    psad = round(psa / prostate_volume_cc, 3)

    if psad < 0.10:
        interpretation = "Low risk. Biopsy may be deferred in PI-RADS 3 lesions."
    elif psad < 0.15:
        interpretation = "Intermediate risk. Shared decision-making recommended for PI-RADS 3 lesions."
    else:
        interpretation = "Higher risk. Supports biopsy recommendation, particularly for PI-RADS 3 lesions."

    return {
        "guideline": "PI-RADS v2.1 — PSA Density",
        "inputs": {
            "psa_ng_ml": psa,
            "prostate_volume_cc": prostate_volume_cc,
        },
        "results": {
            "psad_ng_mL_per_cc": psad,
        },
        "recommendation": f"PSA Density: {psad} ng/mL/cc — {interpretation}",
        "link": "/prostate/pi_rads/"
    }


def adrenal_nodule_calculator(
    size_cm: float,
    unenhanced_hu=None,
    cancer_history=False
) -> Dict[str, Any]:
    """
    Provides management recommendations for incidentally detected adrenal masses
    per ACR White Paper 2017.
    """
    size_cm = float(size_cm)
    unenhanced_hu = _to_float_or_none(unenhanced_hu)
    cancer_history = _to_bool(cancer_history)

    if size_cm < 1.0:
        if cancer_history:
            recommendation = "< 1 cm with known malignancy: Generally benign, but consider follow-up given oncologic context."
        else:
            recommendation = "< 1 cm: Benign. No follow-up needed."
    elif size_cm <= 4.0:
        if unenhanced_hu is not None and unenhanced_hu <= 10:
            recommendation = "1–4 cm with HU ≤ 10: Lipid-rich adenoma. No further follow-up needed."
        elif cancer_history:
            recommendation = ("1–4 cm, indeterminate, history of malignancy: "
                              "Consider adrenal washout CT, MRI (chemical shift), or PET/CT. "
                              "If not an adenoma or PET-avid, consider biopsy or resection.")
        else:
            recommendation = ("1–4 cm, indeterminate (HU > 10 or unknown), no cancer history: "
                              "Consider adrenal washout CT or MRI (chemical shift). "
                              "If still indeterminate, follow-up CT/MRI at 6–12 months. "
                              "If stable at 1 year, stop follow-up.")
    else:
        recommendation = ("> 4 cm: Resection is often recommended due to risk of adrenocortical carcinoma. "
                          "Biochemical evaluation required before surgery to rule out pheochromocytoma. "
                          "Do NOT biopsy a potentially resectable adrenocortical carcinoma.")

    return {
        "guideline": "ACR Incidental Adrenal Mass 2017",
        "inputs": {
            "size_cm": size_cm,
            "unenhanced_hu": unenhanced_hu,
            "cancer_history": cancer_history,
        },
        "recommendation": recommendation,
        "link": "/abdominal/adrenal/adrenal_nodule/"
    }


# ─── OpenAI Tool Definitions ─────────────────────────────────────────────────

GUIDELINE_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "fleischner_calculator",
            "description": "Calculates the Fleischner Society 2017 recommendation for incidental pulmonary nodules.",
            "parameters": {
                "type": "object",
                "properties": {
                    "size_mm": {"type": "number", "description": "Nodule size in millimeters."},
                    "nodule_type": {"type": "string", "enum": ["solid", "part-solid", "ground-glass"]},
                    "patient_risk": {"type": "string", "enum": ["low", "high"]},
                    "multiplicity": {"type": "string", "enum": ["single", "multiple"]}
                },
                "required": ["size_mm", "nodule_type", "patient_risk", "multiplicity"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "adrenal_washout_calculator",
            "description": "Calculates adrenal CT washout to determine if a mass is an adenoma.",
            "parameters": {
                "type": "object",
                "properties": {
                    "unenhanced_hu": {"type": "number", "description": "HU on unenhanced phase."},
                    "venous_hu": {"type": "number", "description": "HU on portal venous phase."},
                    "delayed_hu": {"type": "number", "description": "HU on delayed phase."}
                },
                "required": ["unenhanced_hu", "venous_hu", "delayed_hu"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "tirads_calculator",
            "description": "Calculates ACR TI-RADS level and management recommendation for thyroid nodules.",
            "parameters": {
                "type": "object",
                "properties": {
                    "composition_pts": {"type": "integer", "description": "Points for composition: 0=cystic/spongiform, 1=mixed, 2=solid."},
                    "echogenicity_pts": {"type": "integer", "description": "Points for echogenicity: 0=anechoic, 1=hyperechoic/isoechoic, 2=hypoechoic, 3=very hypoechoic."},
                    "shape_pts": {"type": "integer", "description": "Points for shape: 0=wider-than-tall, 3=taller-than-wide."},
                    "margin_pts": {"type": "integer", "description": "Points for margin: 0=smooth/ill-defined, 2=lobulated/irregular, 3=extrathyroidal extension."},
                    "echogenic_foci_pts": {"type": "integer", "description": "Points for echogenic foci: 0=none/comet-tail, 1=macrocalcifications, 2=peripheral, 3=punctate."},
                    "size_cm": {"type": "number", "description": "Maximum nodule diameter in centimeters."}
                },
                "required": ["composition_pts", "echogenicity_pts", "shape_pts", "margin_pts", "echogenic_foci_pts", "size_cm"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "lung_rads_calculator",
            "description": "Calculates ACR Lung-RADS v1.1 category for lung cancer screening nodules.",
            "parameters": {
                "type": "object",
                "properties": {
                    "nodule_type": {"type": "string", "enum": ["solid", "part-solid", "ground-glass"]},
                    "size_mm": {"type": "number", "description": "Total nodule diameter in mm."},
                    "solid_component_mm": {"type": "number", "description": "Solid component diameter in mm (part-solid only)."},
                    "is_new": {"type": "boolean", "description": "True if this is a new nodule not seen on prior CT."},
                    "has_suspicious_features": {"type": "boolean", "description": "True if additional suspicious features present (spiculation, lymphadenopathy, endobronchial lesion)."}
                },
                "required": ["nodule_type", "size_mm"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "pirads_calculator",
            "description": "Calculates PI-RADS v2.1 overall score for prostate MRI lesions.",
            "parameters": {
                "type": "object",
                "properties": {
                    "zone": {"type": "string", "enum": ["peripheral", "transition"]},
                    "dwi_score": {"type": "integer", "description": "DWI score 1–5."},
                    "t2wi_score": {"type": "integer", "description": "T2WI score 1–5."},
                    "dce_positive": {"type": "boolean", "description": "True if DCE shows focal early enhancement (PZ only)."}
                },
                "required": ["zone", "dwi_score", "t2wi_score"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "psa_density_calculator",
            "description": "Calculates PSA density for prostate cancer risk stratification.",
            "parameters": {
                "type": "object",
                "properties": {
                    "psa": {"type": "number", "description": "PSA value in ng/mL."},
                    "prostate_volume_cc": {"type": "number", "description": "Prostate volume in cubic centimeters (cc)."}
                },
                "required": ["psa", "prostate_volume_cc"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "adrenal_nodule_calculator",
            "description": "Provides management recommendations for incidental adrenal masses per ACR 2017.",
            "parameters": {
                "type": "object",
                "properties": {
                    "size_cm": {"type": "number", "description": "Lesion size in centimeters."},
                    "unenhanced_hu": {"type": "number", "description": "Unenhanced CT attenuation in HU (optional)."},
                    "cancer_history": {"type": "boolean", "description": "True if patient has a history of known malignancy."}
                },
                "required": ["size_cm"]
            }
        }
    },
]


def execute_tool(tool_call) -> Dict[str, Any]:
    """Execute the appropriate guideline tool function based on the OpenAI tool call."""
    function_name = tool_call.function.name
    arguments = json.loads(tool_call.function.arguments)

    calculators = {
        "fleischner_calculator": fleischner_calculator,
        "adrenal_washout_calculator": adrenal_washout_calculator,
        "tirads_calculator": tirads_calculator,
        "lung_rads_calculator": lung_rads_calculator,
        "pirads_calculator": pirads_calculator,
        "psa_density_calculator": psa_density_calculator,
        "adrenal_nodule_calculator": adrenal_nodule_calculator,
    }

    fn = calculators.get(function_name)
    if fn is None:
        raise ValueError(f"Unknown tool: {function_name}")
    return fn(**arguments)
