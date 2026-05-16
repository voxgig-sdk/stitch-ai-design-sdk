# DesignGeneration entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from stitchaidesign_sdk import StitchAiDesignSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestDesignGenerationEntity:

    def test_should_create_instance(self):
        testsdk = StitchAiDesignSDK.test(None, None)
        ent = testsdk.DesignGeneration(None)
        assert ent is not None

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
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        design_generation_ref01_ent = client.DesignGeneration(None)
        design_generation_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.design_generation"), "design_generation_ref01"))

        design_generation_ref01_data_result, err = design_generation_ref01_ent.create(design_generation_ref01_data, None)
        assert err is None
        design_generation_ref01_data = helpers.to_map(design_generation_ref01_data_result)
        assert design_generation_ref01_data is not None



def _design_generation_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/design_generation/DesignGenerationTestData.json")
    with open(entity_data_file, "r") as f:
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

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID": idmap,
        "STITCHAIDESIGN_TEST_LIVE": "FALSE",
        "STITCHAIDESIGN_TEST_EXPLAIN": "FALSE",
        "STITCHAIDESIGN_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("STITCHAIDESIGN_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("STITCHAIDESIGN_APIKEY"),
            },
            extra or {},
        ])
        client = StitchAiDesignSDK(helpers.to_map(merged_opts))

    _live = env.get("STITCHAIDESIGN_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("STITCHAIDESIGN_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
