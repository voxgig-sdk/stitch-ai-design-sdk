-- Typed models for the StitchAiDesign SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class DesignGeneration
---@field color_scheme? string
---@field component? table
---@field design? table
---@field design_id? string
---@field export_format? table
---@field platform? string
---@field preview? string
---@field prompt string
---@field style? string
---@field success? boolean

---@class DesignGenerationCreateData

local M = {}

return M
