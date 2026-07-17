-- StitchAiDesign SDK exists test

local sdk = require("stitch-ai-design_sdk")

describe("StitchAiDesignSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
