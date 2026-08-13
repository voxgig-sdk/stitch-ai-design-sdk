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
    public ?string $colorScheme = null;
    public ?array $components = null;
    public ?array $design = null;
    public ?string $designId = null;
    public ?array $exportFormats = null;
    public ?string $platform = null;
    public ?string $preview = null;
    public string $prompt;
    public ?string $style = null;
    public ?bool $success = null;
}

/** Request payload for DesignGeneration#create. */
class DesignGenerationCreateData
{
    public ?string $colorScheme = null;
    public ?array $components = null;
    public ?array $design = null;
    public ?string $designId = null;
    public ?array $exportFormats = null;
    public ?string $platform = null;
    public ?string $preview = null;
    public string $prompt;
    public ?string $style = null;
    public ?bool $success = null;
}

