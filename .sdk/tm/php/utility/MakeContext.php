<?php
declare(strict_types=1);

// StitchAiDesign SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class StitchAiDesignMakeContext
{
    public static function call(array $ctxmap, ?StitchAiDesignContext $basectx): StitchAiDesignContext
    {
        return new StitchAiDesignContext($ctxmap, $basectx);
    }
}
