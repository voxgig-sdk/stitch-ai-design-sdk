-- StitchAiDesign SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "StitchAiDesign",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "components",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "design",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "designId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "exportFormats",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "platform",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "preview",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "prompt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "style",
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
                ["parts"] = {
                  "generate",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
