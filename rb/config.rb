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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://stitch.withgoogle.com/api",
        "auth" => {
          "prefix" => "",
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
              "type" => "`$STRING`",
            },
            {
              "name" => "components",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "design",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "designId",
              "type" => "`$STRING`",
            },
            {
              "name" => "exportFormats",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "platform",
              "type" => "`$STRING`",
            },
            {
              "name" => "preview",
              "type" => "`$STRING`",
            },
            {
              "name" => "prompt",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "style",
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
                  "parts" => [
                    "generate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
