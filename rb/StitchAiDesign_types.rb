# frozen_string_literal: true

# Typed models for the StitchAiDesign SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# DesignGeneration entity data model.
#
# @!attribute [rw] color_scheme
#   @return [String, nil]
#
# @!attribute [rw] component
#   @return [Array, nil]
#
# @!attribute [rw] design
#   @return [Hash, nil]
#
# @!attribute [rw] design_id
#   @return [String, nil]
#
# @!attribute [rw] export_format
#   @return [Array, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] preview
#   @return [String, nil]
#
# @!attribute [rw] prompt
#   @return [String]
#
# @!attribute [rw] style
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
DesignGeneration = Struct.new(
  :color_scheme,
  :component,
  :design,
  :design_id,
  :export_format,
  :platform,
  :preview,
  :prompt,
  :style,
  :success,
  keyword_init: true
)

# Match filter for DesignGeneration#create (any subset of DesignGeneration fields).
#
# @!attribute [rw] color_scheme
#   @return [String, nil]
#
# @!attribute [rw] component
#   @return [Array, nil]
#
# @!attribute [rw] design
#   @return [Hash, nil]
#
# @!attribute [rw] design_id
#   @return [String, nil]
#
# @!attribute [rw] export_format
#   @return [Array, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] preview
#   @return [String, nil]
#
# @!attribute [rw] prompt
#   @return [String, nil]
#
# @!attribute [rw] style
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
DesignGenerationCreateData = Struct.new(
  :color_scheme,
  :component,
  :design,
  :design_id,
  :export_format,
  :platform,
  :preview,
  :prompt,
  :style,
  :success,
  keyword_init: true
)

