package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDesignGenerationEntityFunc func(client *StitchAiDesignSDK, entopts map[string]any) StitchAiDesignEntity

