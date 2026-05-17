package voxgigstitchaidesignsdk

import (
	"github.com/voxgig-sdk/stitch-ai-design-sdk/go/core"
	"github.com/voxgig-sdk/stitch-ai-design-sdk/go/entity"
	"github.com/voxgig-sdk/stitch-ai-design-sdk/go/feature"
	_ "github.com/voxgig-sdk/stitch-ai-design-sdk/go/utility"
)

// Type aliases preserve external API.
type StitchAiDesignSDK = core.StitchAiDesignSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type StitchAiDesignEntity = core.StitchAiDesignEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type StitchAiDesignError = core.StitchAiDesignError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDesignGenerationEntityFunc = func(client *core.StitchAiDesignSDK, entopts map[string]any) core.StitchAiDesignEntity {
		return entity.NewDesignGenerationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewStitchAiDesignSDK = core.NewStitchAiDesignSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
