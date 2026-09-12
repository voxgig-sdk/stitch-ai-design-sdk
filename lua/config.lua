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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://stitch.withgoogle.com/api",
      auth = {
        prefix = "",
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
            ["short"] = "Preferred color scheme for the design",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "components",
            ["short"] = "Specific UI components to include",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "design",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "designId",
            ["short"] = "Unique identifier for the generated design",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "exportFormats",
            ["short"] = "Available export formats for the design",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "platform",
            ["short"] = "Target platform for the UI design",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "preview",
            ["short"] = "URL to preview image of the generated design",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "prompt",
            ["req"] = true,
            ["short"] = "Description of the desired UI design",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "style",
            ["short"] = "Design style preferences",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "success",
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
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/generate",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "generate",
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
