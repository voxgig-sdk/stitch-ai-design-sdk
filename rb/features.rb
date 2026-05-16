# StitchAiDesign SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module StitchAiDesignFeatures
  def self.make_feature(name)
    case name
    when "base"
      StitchAiDesignBaseFeature.new
    when "test"
      StitchAiDesignTestFeature.new
    else
      StitchAiDesignBaseFeature.new
    end
  end
end
