# StitchAiDesign SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

StitchAiDesignUtility.registrar = ->(u) {
  u.clean = StitchAiDesignUtilities::Clean
  u.done = StitchAiDesignUtilities::Done
  u.make_error = StitchAiDesignUtilities::MakeError
  u.feature_add = StitchAiDesignUtilities::FeatureAdd
  u.feature_hook = StitchAiDesignUtilities::FeatureHook
  u.feature_init = StitchAiDesignUtilities::FeatureInit
  u.fetcher = StitchAiDesignUtilities::Fetcher
  u.make_fetch_def = StitchAiDesignUtilities::MakeFetchDef
  u.make_context = StitchAiDesignUtilities::MakeContext
  u.make_options = StitchAiDesignUtilities::MakeOptions
  u.make_request = StitchAiDesignUtilities::MakeRequest
  u.make_response = StitchAiDesignUtilities::MakeResponse
  u.make_result = StitchAiDesignUtilities::MakeResult
  u.make_point = StitchAiDesignUtilities::MakePoint
  u.make_spec = StitchAiDesignUtilities::MakeSpec
  u.make_url = StitchAiDesignUtilities::MakeUrl
  u.param = StitchAiDesignUtilities::Param
  u.prepare_auth = StitchAiDesignUtilities::PrepareAuth
  u.prepare_body = StitchAiDesignUtilities::PrepareBody
  u.prepare_headers = StitchAiDesignUtilities::PrepareHeaders
  u.prepare_method = StitchAiDesignUtilities::PrepareMethod
  u.prepare_params = StitchAiDesignUtilities::PrepareParams
  u.prepare_path = StitchAiDesignUtilities::PreparePath
  u.prepare_query = StitchAiDesignUtilities::PrepareQuery
  u.result_basic = StitchAiDesignUtilities::ResultBasic
  u.result_body = StitchAiDesignUtilities::ResultBody
  u.result_headers = StitchAiDesignUtilities::ResultHeaders
  u.transform_request = StitchAiDesignUtilities::TransformRequest
  u.transform_response = StitchAiDesignUtilities::TransformResponse
}
