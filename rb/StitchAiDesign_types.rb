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
# @!attribute [rw] colorScheme
#   @return [String, nil]
#
# @!attribute [rw] components
#   @return [Array, nil]
#
# @!attribute [rw] design
#   @return [Hash, nil]
#
# @!attribute [rw] designId
#   @return [String, nil]
#
# @!attribute [rw] exportFormats
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
  :colorScheme,
  :components,
  :design,
  :designId,
  :exportFormats,
  :platform,
  :preview,
  :prompt,
  :style,
  :success,
  keyword_init: true
)

# Request payload for DesignGeneration#create.
#
# @!attribute [rw] colorScheme
#   @return [String, nil]
#
# @!attribute [rw] components
#   @return [Array, nil]
#
# @!attribute [rw] design
#   @return [Hash, nil]
#
# @!attribute [rw] designId
#   @return [String, nil]
#
# @!attribute [rw] exportFormats
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
DesignGenerationCreateData = Struct.new(
  :colorScheme,
  :components,
  :design,
  :designId,
  :exportFormats,
  :platform,
  :preview,
  :prompt,
  :style,
  :success,
  keyword_init: true
)

