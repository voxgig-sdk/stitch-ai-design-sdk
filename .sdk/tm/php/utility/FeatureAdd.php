<?php
declare(strict_types=1);

// StitchAiDesign SDK utility: feature_add

class StitchAiDesignFeatureAdd
{
    public static function call(StitchAiDesignContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
