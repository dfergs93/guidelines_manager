from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
import os

from guideline_tools import (
    fleischner_calculator,
    adrenal_washout_calculator,
    tirads_calculator,
    lung_rads_calculator,
    pirads_calculator,
    psa_density_calculator,
    adrenal_nodule_calculator,
    GUIDELINE_TOOLS,
)

app = FastAPI()

ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:8002",
    "http://127.0.0.1:8002",
    "https://dfergs93.github.io",
    "https://dfergs93.github.io/guidelines-manager/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Legacy typed endpoints ───────────────────────────────────────────────────

class FleischnerRequest(BaseModel):
    size_mm: float
    nodule_type: str
    patient_risk: str
    multiplicity: str


class AdrenalWashoutRequest(BaseModel):
    unenhanced_hu: float
    venous_hu: float
    delayed_hu: float


@app.post("/api/fleischner")
def fleischner(request: FleischnerRequest):
    return fleischner_calculator(
        size_mm=request.size_mm,
        nodule_type=request.nodule_type,
        patient_risk=request.patient_risk,
        multiplicity=request.multiplicity,
    )


@app.post("/api/adrenal-washout")
def adrenal_washout(request: AdrenalWashoutRequest):
    return adrenal_washout_calculator(
        unenhanced_hu=request.unenhanced_hu,
        venous_hu=request.venous_hu,
        delayed_hu=request.delayed_hu,
    )


# ─── Generic calculator endpoint ─────────────────────────────────────────────

class GuidelineCalculateRequest(BaseModel):
    guideline_id: str
    parameters: dict


@app.post("/api/guideline-calculate")
def guideline_calculate(request: GuidelineCalculateRequest):
    gid = request.guideline_id
    p = request.parameters

    try:
        if gid == "fleischner":
            return fleischner_calculator(
                size_mm=p["size_mm"],
                nodule_type=p["nodule_type"],
                patient_risk=p["patient_risk"],
                multiplicity=p["multiplicity"],
            )
        elif gid == "adrenal_washout":
            return adrenal_washout_calculator(
                unenhanced_hu=p["unenhanced_hu"],
                venous_hu=p["venous_hu"],
                delayed_hu=p["delayed_hu"],
            )
        elif gid == "tirads":
            return tirads_calculator(
                composition_pts=p["composition_pts"],
                echogenicity_pts=p["echogenicity_pts"],
                shape_pts=p["shape_pts"],
                margin_pts=p["margin_pts"],
                echogenic_foci_pts=p["echogenic_foci_pts"],
                size_cm=p["size_cm"],
            )
        elif gid == "lung_rads":
            return lung_rads_calculator(
                nodule_type=p["nodule_type"],
                size_mm=p["size_mm"],
                solid_component_mm=p.get("solid_component_mm"),
                is_new=p.get("is_new", False),
                has_suspicious_features=p.get("has_suspicious_features", False),
            )
        elif gid == "pirads":
            return pirads_calculator(
                zone=p["zone"],
                dwi_score=p["dwi_score"],
                t2wi_score=p["t2wi_score"],
                dce_positive=p.get("dce_positive", False),
            )
        elif gid == "psa_density":
            return psa_density_calculator(
                psa=p["psa"],
                prostate_volume_cc=p["prostate_volume_cc"],
            )
        elif gid == "adrenal_nodule":
            return adrenal_nodule_calculator(
                size_cm=p["size_cm"],
                unenhanced_hu=p.get("unenhanced_hu"),
                cancer_history=p.get("cancer_history", False),
            )
        else:
            raise HTTPException(status_code=400, detail=f"Unknown guideline_id: '{gid}'")
    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Missing required parameter: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─── Health check ─────────────────────────────────────────────────────────────

@app.get("/api/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
