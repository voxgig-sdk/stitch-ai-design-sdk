-- StitchAiDesign SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "StitchAiDesign",
      slug = "stitch-ai-design",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://stitch.withgoogle.com/api",
      auth = {
        prefix = "",
        name = "X-API-Key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["design_generation"] = {},
      },
    },
    entity = {
      ["design_generation"] = {
        ["fields"] = {
          {
            ["name"] = "colorScheme",
            ["title"] = "Color Scheme",
            ["type"] = "`$STRING`",
            ["short"] = "Preferred color scheme for the design",
          },
          {
            ["name"] = "components",
            ["title"] = "Components",
            ["type"] = "`$ARRAY`",
            ["short"] = "Specific UI components to include",
          },
          {
            ["name"] = "design",
            ["title"] = "Design",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "designId",
            ["title"] = "Design Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the generated design",
          },
          {
            ["name"] = "exportFormats",
            ["title"] = "Export Formats",
            ["type"] = "`$ARRAY`",
            ["short"] = "Available export formats for the design",
          },
          {
            ["name"] = "platform",
            ["title"] = "Platform",
            ["type"] = "`$STRING`",
            ["short"] = "Target platform for the UI design",
          },
          {
            ["name"] = "preview",
            ["title"] = "Preview",
            ["type"] = "`$STRING`",
            ["short"] = "URL to preview image of the generated design",
            ["format"] = "uri",
          },
          {
            ["name"] = "prompt",
            ["title"] = "Prompt",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Description of the desired UI design",
          },
          {
            ["name"] = "style",
            ["title"] = "Style",
            ["type"] = "`$STRING`",
            ["short"] = "Design style preferences",
          },
          {
            ["name"] = "success",
            ["title"] = "Success",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "design_generation",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/generate",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                },
                ["parts"] = {
                  "generate",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
