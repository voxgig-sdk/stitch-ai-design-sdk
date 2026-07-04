<?php
declare(strict_types=1);

// Typed models for the StitchAiDesign SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** DesignGeneration entity data model. */
class DesignGeneration
{
    public ?string $color_scheme = null;
    public ?array $component = null;
    public ?array $design = null;
    public ?string $design_id = null;
    public ?array $export_format = null;
    public ?string $platform = null;
    public ?string $preview = null;
    public string $prompt;
    public ?string $style = null;
    public ?bool $success = null;
}

/** Match filter for DesignGeneration#create (any subset of DesignGeneration fields). */
class DesignGenerationCreateData
{
    public ?string $color_scheme = null;
    public ?array $component = null;
    public ?array $design = null;
    public ?string $design_id = null;
    public ?array $export_format = null;
    public ?string $platform = null;
    public ?string $preview = null;
    public ?string $prompt = null;
    public ?string $style = null;
    public ?bool $success = null;
}

