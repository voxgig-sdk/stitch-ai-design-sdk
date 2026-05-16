<?php
declare(strict_types=1);

// StitchAiDesign SDK utility: prepare_body

class StitchAiDesignPrepareBody
{
    public static function call(StitchAiDesignContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
