# DesignGeneration entity test

require "minitest/autorun"
require "json"
require_relative "../StitchAiDesign_sdk"
require_relative "runner"

class DesignGenerationEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = StitchAiDesignSDK.test(nil, nil)
    ent = testsdk.DesignGeneration(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = StitchAiDesignConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = StitchAiDesignSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.DesignGeneration(nil).create({ "colorScheme" => 1, "prompt" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = design_generation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "design_generation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    design_generation_ref01_ent = client.DesignGeneration(nil)
    design_generation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.design_generation"), "design_generation_ref01"))

    design_generation_ref01_data_result = design_generation_ref01_ent.create(design_generation_ref01_data, nil)
    design_generation_ref01_data = Helpers.to_map(design_generation_ref01_data_result.respond_to?(:data_get) ? design_generation_ref01_data_result.data_get : design_generation_ref01_data_result)
    assert !design_generation_ref01_data.nil?

  end
end

def design_generation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "design_generation", "DesignGenerationTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = StitchAiDesignSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["design_generation01", "design_generation02", "design_generation03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID" => idmap,
    "STITCH_AI_DESIGN_TEST_LIVE" => "FALSE",
    "STITCH_AI_DESIGN_TEST_EXPLAIN" => "FALSE",
    "STITCH_AI_DESIGN_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["STITCH_AI_DESIGN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["STITCH_AI_DESIGN_APIKEY"],
      },
      extra || {},
    ])
    client = StitchAiDesignSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["STITCH_AI_DESIGN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["STITCH_AI_DESIGN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
