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
                "slug" => "stitch-ai-design",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://stitch.withgoogle.com/api",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
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
              'title' => 'Color Scheme',
              'type' => '`$STRING`',
              'short' => 'Preferred color scheme for the design',
            ],
            [
              'name' => 'components',
              'title' => 'Components',
              'type' => '`$ARRAY`',
              'short' => 'Specific UI components to include',
            ],
            [
              'name' => 'design',
              'title' => 'Design',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'designId',
              'title' => 'Design Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the generated design',
            ],
            [
              'name' => 'exportFormats',
              'title' => 'Export Formats',
              'type' => '`$ARRAY`',
              'short' => 'Available export formats for the design',
            ],
            [
              'name' => 'platform',
              'title' => 'Platform',
              'type' => '`$STRING`',
              'short' => 'Target platform for the UI design',
            ],
            [
              'name' => 'preview',
              'title' => 'Preview',
              'type' => '`$STRING`',
              'short' => 'URL to preview image of the generated design',
              'format' => 'uri',
            ],
            [
              'name' => 'prompt',
              'title' => 'Prompt',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Description of the desired UI design',
            ],
            [
              'name' => 'style',
              'title' => 'Style',
              'type' => '`$STRING`',
              'short' => 'Design style preferences',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
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
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/generate',
                  'segments' => [
                    [
                      'lit' => 'generate',
                    ],
                  ],
                  'parts' => [
                    'generate',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
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
