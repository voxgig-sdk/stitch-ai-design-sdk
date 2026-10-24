# StitchAiDesign SDK utility: prepare_body
require_relative 'media'
module StitchAiDesignUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return StitchAiDesignUtilities.raw_body(ctx.reqdata) if StitchAiDesignUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
