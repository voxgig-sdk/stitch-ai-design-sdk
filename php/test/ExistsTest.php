<?php
declare(strict_types=1);

// StitchAiDesign SDK exists test

require_once __DIR__ . '/../stitchaidesign_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = StitchAiDesignSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
