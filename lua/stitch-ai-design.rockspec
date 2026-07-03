package = "voxgig-sdk-stitch-ai-design"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/stitch-ai-design-sdk.git",
  tag = "lua/v0.0.1",
  dir = "stitch-ai-design-sdk/lua"
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
