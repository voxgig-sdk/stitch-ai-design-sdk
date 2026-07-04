// Typed models for the StitchAiDesign SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface DesignGeneration {
  color_scheme?: string
  component?: any[]
  design?: Record<string, any>
  design_id?: string
  export_format?: any[]
  platform?: string
  preview?: string
  prompt: string
  style?: string
  success?: boolean
}

export type DesignGenerationCreateData = Partial<DesignGeneration>

