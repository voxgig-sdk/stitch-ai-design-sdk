-- Typed models for the StitchAiDesign SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class DesignGeneration
---@field colorScheme? string
---@field components? table
---@field design? table
---@field designId? string
---@field exportFormats? table
---@field platform? string
---@field preview? string
---@field prompt string
---@field style? string
---@field success? boolean

---@class DesignGenerationCreateData
---@field colorScheme? string
---@field components? table
---@field design? table
---@field designId? string
---@field exportFormats? table
---@field platform? string
---@field preview? string
---@field prompt string
---@field style? string
---@field success? boolean

local M = {}

return M
