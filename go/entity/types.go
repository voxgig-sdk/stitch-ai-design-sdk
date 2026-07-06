// Typed models for the StitchAiDesign SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// DesignGeneration is the typed data model for the design_generation entity.
type DesignGeneration struct {
	ColorScheme *string `json:"color_scheme,omitempty"`
	Component *[]any `json:"component,omitempty"`
	Design *map[string]any `json:"design,omitempty"`
	DesignId *string `json:"design_id,omitempty"`
	ExportFormat *[]any `json:"export_format,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Preview *string `json:"preview,omitempty"`
	Prompt string `json:"prompt"`
	Style *string `json:"style,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DesignGenerationCreateData is the typed request payload for DesignGeneration.CreateTyped.
type DesignGenerationCreateData struct {
	ColorScheme *string `json:"color_scheme,omitempty"`
	Component *[]any `json:"component,omitempty"`
	Design *map[string]any `json:"design,omitempty"`
	DesignId *string `json:"design_id,omitempty"`
	ExportFormat *[]any `json:"export_format,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
