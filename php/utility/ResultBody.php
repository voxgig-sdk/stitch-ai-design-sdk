<?php
declare(strict_types=1);

// StitchAiDesign SDK utility: result_body

class StitchAiDesignResultBody
{
    public static function call(StitchAiDesignContext $ctx): ?StitchAiDesignResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
