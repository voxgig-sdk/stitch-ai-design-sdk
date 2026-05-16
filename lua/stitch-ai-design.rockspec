package = "voxgig-sdk-stitch-ai-design"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/stitch-ai-design-sdk.git"
}
description = {
  summary = "StitchAiDesign SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["stitch-ai-design_sdk"] = "stitch-ai-design_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
