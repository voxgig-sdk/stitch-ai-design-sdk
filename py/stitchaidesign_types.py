# Typed models for the StitchAiDesign SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class DesignGeneration:
    prompt: str
    color_scheme: Optional[str] = None
    component: Optional[list] = None
    design: Optional[dict] = None
    design_id: Optional[str] = None
    export_format: Optional[list] = None
    platform: Optional[str] = None
    preview: Optional[str] = None
    style: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class DesignGenerationCreateData:
    color_scheme: Optional[str] = None
    component: Optional[list] = None
    design: Optional[dict] = None
    design_id: Optional[str] = None
    export_format: Optional[list] = None
    platform: Optional[str] = None
    preview: Optional[str] = None
    prompt: Optional[str] = None
    style: Optional[str] = None
    success: Optional[bool] = None

