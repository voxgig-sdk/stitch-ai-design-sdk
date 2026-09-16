# StitchAiDesign SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module StitchAiDesignFeatures
  def self.make_feature(name)
    case name
    when "base"
      StitchAiDesignBaseFeature.new
    when "ratelimit"
      StitchAiDesignRatelimitFeature.new
    when "retry"
      StitchAiDesignRetryFeature.new
    when "test"
      StitchAiDesignTestFeature.new
    when "timeout"
      StitchAiDesignTimeoutFeature.new
    else
      StitchAiDesignBaseFeature.new
    end
  end
end
