-- StitchAiDesign SDK error

local StitchAiDesignError = {}
StitchAiDesignError.__index = StitchAiDesignError


function StitchAiDesignError.new(code, msg, ctx)
  local self = setmetatable({}, StitchAiDesignError)
  self.is_sdk_error = true
  self.sdk = "StitchAiDesign"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function StitchAiDesignError:error()
  return self.msg
end


function StitchAiDesignError:__tostring()
  return self.msg
end


return StitchAiDesignError
