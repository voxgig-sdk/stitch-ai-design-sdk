# StitchAiDesign SDK utility: feature_add
module StitchAiDesignUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
