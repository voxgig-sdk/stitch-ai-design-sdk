# StitchAiDesign SDK exists test

require "minitest/autorun"
require_relative "../StitchAiDesign_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = StitchAiDesignSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
