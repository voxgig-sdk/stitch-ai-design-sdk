# DesignGeneration entity test

import json
import os
import time

import pytest

from stitchaidesign_sdk.utility.voxgig_struct import voxgig_struct as vs
from stitchaidesign_sdk import StitchAiDesignSDK
from stitchaidesign_sdk.core import helpers
from stitchaidesign_sdk.config import shared_config
from stitchaidesign_sdk.feature.base_feature import StitchAiDesignBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestDesignGenerationEntity:

    def test_should_create_instance(self):
        testsdk = StitchAiDesignSDK.test(None, None)
        ent = testsdk.DesignGeneration(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = StitchAiDesignSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.DesignGeneration(None).create({"colorScheme": 1, "prompt": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _design_generation_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "design_generation." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        design_generation_ref01_ent = client.DesignGeneration(None)
        design_generation_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.design_generation"), "design_generation_ref01"))

        design_generation_ref01_data = helpers.to_map(runner.entity_data(design_generation_ref01_ent.create(design_generation_ref01_data, None)))
        assert design_generation_ref01_data is not None



def _design_generation_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/design_generation/DesignGenerationTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = StitchAiDesignSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["design_generation01", "design_generation02", "design_generation03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID": idmap,
        "STITCH_AI_DESIGN_TEST_LIVE": "FALSE",
        "STITCH_AI_DESIGN_TEST_EXPLAIN": "FALSE",
        "STITCH_AI_DESIGN_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("STITCH_AI_DESIGN_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("STITCH_AI_DESIGN_APIKEY"),
            },
            extra or {},
        ])
        client = StitchAiDesignSDK(helpers.to_map(merged_opts))

    _live = env.get("STITCH_AI_DESIGN_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("STITCH_AI_DESIGN_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
