// Typed models for the StitchAiDesign SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/stitch-ai-design-sdk/go/core"
)

// DesignGeneration is the typed data model for the design_generation entity.
type DesignGeneration struct {
	ColorScheme *string `json:"colorScheme,omitempty"`
	Components *[]any `json:"components,omitempty"`
	Design *map[string]any `json:"design,omitempty"`
	DesignId *string `json:"designId,omitempty"`
	ExportFormats *[]any `json:"exportFormats,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Preview *string `json:"preview,omitempty"`
	Prompt string `json:"prompt"`
	Style *string `json:"style,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DesignGenerationCreateData is the typed request payload for DesignGeneration.CreateTyped.
type DesignGenerationCreateData struct {
	ColorScheme *string `json:"colorScheme,omitempty"`
	Components *[]any `json:"components,omitempty"`
	Design *map[string]any `json:"design,omitempty"`
	DesignId *string `json:"designId,omitempty"`
	ExportFormats *[]any `json:"exportFormats,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Preview *string `json:"preview,omitempty"`
	Prompt string `json:"prompt"`
	Style *string `json:"style,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
