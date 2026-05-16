package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/stitch-ai-design-sdk"
	"github.com/voxgig-sdk/stitch-ai-design-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestDesignGenerationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DesignGeneration(nil)
		if ent == nil {
			t.Fatal("expected non-nil DesignGenerationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := design_generationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "design_generation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		designGenerationRef01Ent := client.DesignGeneration(nil)
		designGenerationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "design_generation"}, setup.data), "design_generation_ref01"))

		designGenerationRef01DataResult, err := designGenerationRef01Ent.Create(designGenerationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		designGenerationRef01Data = core.ToMapAny(designGenerationRef01DataResult)
		if designGenerationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func design_generationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "design_generation", "DesignGenerationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read design_generation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse design_generation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"design_generation01", "design_generation02", "design_generation03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID": idmap,
		"STITCHAIDESIGN_TEST_LIVE":      "FALSE",
		"STITCHAIDESIGN_TEST_EXPLAIN":   "FALSE",
		"STITCHAIDESIGN_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["STITCHAIDESIGN_TEST_DESIGN_GENERATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["STITCHAIDESIGN_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["STITCHAIDESIGN_APIKEY"],
			},
			extra,
		})
		client = sdk.NewStitchAiDesignSDK(core.ToMapAny(mergedOpts))
	}

	live := env["STITCHAIDESIGN_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["STITCHAIDESIGN_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
