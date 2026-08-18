<?php
declare(strict_types=1);

// StitchAiDesign SDK configuration

class StitchAiDesignConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "StitchAiDesign",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://stitch.withgoogle.com/api",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "design_generation" => [],
                ],
            ],
            "entity" => [
        'design_generation' => [
          'fields' => [
            [
              'name' => 'colorScheme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'components',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'design',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'designId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'exportFormats',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'platform',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'preview',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'prompt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'style',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'design_generation',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/generate',
                  'parts' => [
                    'generate',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return StitchAiDesignFeatures::make_feature($name);
    }
}
