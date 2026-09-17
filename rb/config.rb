# StitchAiDesign SDK configuration

module StitchAiDesignConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "StitchAiDesign",
        "slug" => "stitch-ai-design",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://stitch.withgoogle.com/api",
        "auth" => {
          "prefix" => "",
          "name" => "X-API-Key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "design_generation" => {},
        },
      },
      "entity" => {
        "design_generation" => {
          "fields" => [
            {
              "name" => "colorScheme",
              "short" => "Preferred color scheme for the design",
              "type" => "`$STRING`",
            },
            {
              "name" => "components",
              "short" => "Specific UI components to include",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "design",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "designId",
              "short" => "Unique identifier for the generated design",
              "type" => "`$STRING`",
            },
            {
              "name" => "exportFormats",
              "short" => "Available export formats for the design",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "platform",
              "short" => "Target platform for the UI design",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "preview",
              "short" => "URL to preview image of the generated design",
              "type" => "`$STRING`",
            },
            {
              "name" => "prompt",
              "req" => true,
              "short" => "Description of the desired UI design",
              "type" => "`$STRING`",
            },
            {
              "name" => "style",
              "short" => "Design style preferences",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "design_generation",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/generate",
                  "segments" => [
                    {
                      "lit" => "generate",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "generate",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    StitchAiDesignFeatures.make_feature(name)
  end
end
