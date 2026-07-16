<?php
declare(strict_types=1);

// StitchAiDesign SDK base feature

class StitchAiDesignBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(StitchAiDesignContext $ctx, array $options): void {}
    public function PostConstruct(StitchAiDesignContext $ctx): void {}
    public function PostConstructEntity(StitchAiDesignContext $ctx): void {}
    public function SetData(StitchAiDesignContext $ctx): void {}
    public function GetData(StitchAiDesignContext $ctx): void {}
    public function GetMatch(StitchAiDesignContext $ctx): void {}
    public function SetMatch(StitchAiDesignContext $ctx): void {}
    public function PrePoint(StitchAiDesignContext $ctx): void {}
    public function PreSpec(StitchAiDesignContext $ctx): void {}
    public function PreRequest(StitchAiDesignContext $ctx): void {}
    public function PreResponse(StitchAiDesignContext $ctx): void {}
    public function PreResult(StitchAiDesignContext $ctx): void {}
    public function PreDone(StitchAiDesignContext $ctx): void {}
    public function PreUnexpected(StitchAiDesignContext $ctx): void {}
}
