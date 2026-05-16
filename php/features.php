<?php
declare(strict_types=1);

// StitchAiDesign SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class StitchAiDesignFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new StitchAiDesignBaseFeature();
            case "test":
                return new StitchAiDesignTestFeature();
            default:
                return new StitchAiDesignBaseFeature();
        }
    }
}
