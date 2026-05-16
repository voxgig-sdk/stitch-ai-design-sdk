<?php
declare(strict_types=1);

// StitchAiDesign SDK utility: result_headers

class StitchAiDesignResultHeaders
{
    public static function call(StitchAiDesignContext $ctx): ?StitchAiDesignResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
