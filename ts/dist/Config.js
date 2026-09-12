"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'StitchAiDesign',
        slug: "stitch-ai-design",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://stitch.withgoogle.com/api",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            design_generation: {},
        }
    };
    entity = {
        "design_generation": {
            "fields": [
                {
                    "name": "colorScheme",
                    "short": "Preferred color scheme for the design",
                    "type": "`$STRING`"
                },
                {
                    "name": "components",
                    "short": "Specific UI components to include",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "design",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "designId",
                    "short": "Unique identifier for the generated design",
                    "type": "`$STRING`"
                },
                {
                    "name": "exportFormats",
                    "short": "Available export formats for the design",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "platform",
                    "short": "Target platform for the UI design",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "preview",
                    "short": "URL to preview image of the generated design",
                    "type": "`$STRING`"
                },
                {
                    "name": "prompt",
                    "req": true,
                    "short": "Description of the desired UI design",
                    "type": "`$STRING`"
                },
                {
                    "name": "style",
                    "short": "Design style preferences",
                    "type": "`$STRING`"
                },
                {
                    "name": "success",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "design_generation",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/generate",
                            "segments": [
                                {
                                    "lit": "generate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "generate"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map