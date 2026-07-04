# DesignGeneration entity test

require "minitest/autorun"
require "json"
require_relative "../StitchAiDesign_sdk"
require_relative "runner"

class DesignGenerationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = StitchAiDesignSDK.test(nil, nil)
    ent = testsdk.DesignGeneration(nil)
    assert !ent.nil?
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    design_generation_ref01_ent = client.DesignGeneration(nil)
    design_generation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.design_generation"), "design_generation_ref01"))

    design_generation_ref01_data_result = design_generation_ref01_ent.create(design_generation_ref01_data, nil)
    design_generation_ref01_data = Helpers.to_map(design_generation_ref01_data_result)
    assert !design_generation_ref01_data.nil?

  end
end

def design_generation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "design_generation", "DesignGenerationTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID" => idmap,
    "STITCHAIDESIGN_TEST_LIVE" => "FALSE",
    "STITCHAIDESIGN_TEST_EXPLAIN" => "FALSE",
    "STITCHAIDESIGN_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["STITCHAIDESIGN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["STITCHAIDESIGN_APIKEY"],
      },
      extra || {},
    ])
    client = StitchAiDesignSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["STITCHAIDESIGN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["STITCHAIDESIGN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
