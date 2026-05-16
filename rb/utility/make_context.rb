# StitchAiDesign SDK utility: make_context
require_relative '../core/context'
module StitchAiDesignUtilities
  MakeContext = ->(ctxmap, basectx) {
    StitchAiDesignContext.new(ctxmap, basectx)
  }
end
