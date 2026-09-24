"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DesignGenerationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STITCH_AI_DESIGN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STITCH_AI_DESIGN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StitchAiDesignSDK.test();
        const ent = testsdk.DesignGeneration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STITCH_AI_DESIGN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'design_generation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "colorScheme": { "a": true, "h": "Color Scheme", "n": "colorScheme", "r": false, "sh": "Preferred color scheme for the design", "t": "`$STRING`", "key$": "colorScheme", "index$": 0 }, "components": { "a": true, "h": "Components", "n": "components", "r": false, "sh": "Specific UI components to include", "t": "`$ARRAY`", "key$": "components", "index$": 1 }, "design": { "a": true, "h": "Design", "n": "design", "r": false, "t": "`$OBJECT`", "key$": "design", "index$": 2 }, "designId": { "a": true, "h": "Design Id", "n": "designId", "r": false, "sh": "Unique identifier for the generated design", "t": "`$STRING`", "key$": "designId", "index$": 3 }, "exportFormats": { "a": true, "h": "Export Formats", "n": "exportFormats", "r": false, "sh": "Available export formats for the design", "t": "`$ARRAY`", "key$": "exportFormats", "index$": 4 }, "platform": { "a": true, "h": "Platform", "n": "platform", "r": false, "sh": "Target platform for the UI design", "t": "`$STRING`", "key$": "platform", "index$": 5 }, "preview": { "a": true, "fo": "uri", "h": "Preview", "n": "preview", "r": false, "sh": "URL to preview image of the generated design", "t": "`$STRING`", "key$": "preview", "index$": 6 }, "prompt": { "a": true, "h": "Prompt", "n": "prompt", "r": true, "sh": "Description of the desired UI design", "t": "`$STRING`", "key$": "prompt", "index$": 7 }, "style": { "a": true, "h": "Style", "n": "style", "r": false, "sh": "Design style preferences", "t": "`$STRING`", "key$": "style", "index$": 8 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "t": "`$BOOLEAN`", "key$": "success", "index$": 9 } }, "name": "design_generation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/generate", "q": {}, "r": {}, "s": [{ "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "design_generation", "name__orig": "design_generation", "Name": "DesignGeneration", "name_": "design_generation", "name-": "design-generation", "NAME": "DESIGN_GENERATION", "index$": 0 }, { "active": true, "entity": "design_generation", "key$": "BasicDesignGenerationFlow", "kind": "basic", "name": "BasicDesignGenerationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "design_generation_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DesignGeneration', { "POST /generate": { "protocol": "http", "operationId": "generateUIDesign", "requestBody": { "description": "Design generation parameters and requirements", "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["prompt"], "properties": { "prompt": { "type": "string", "description": "Description of the desired UI design", "example": "Create a modern login screen for a mobile banking app", "key$": "prompt" }, "platform": { "type": "string", "enum": ["web", "mobile", "ios", "android"], "description": "Target platform for the UI design", "example": "mobile", "key$": "platform" }, "style": { "type": "string", "description": "Design style preferences", "example": "minimalist", "key$": "style" }, "colorScheme": { "type": "string", "description": "Preferred color scheme for the design", "example": "blue and white", "key$": "colorScheme" }, "components": { "type": "array", "description": "Specific UI components to include", "items": { "type": "string" }, "example": ["button", "input field", "logo"], "key$": "components" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Successfully generated UI design", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true, "key$": "success" }, "designId": { "type": "string", "description": "Unique identifier for the generated design", "example": "design_abc123xyz", "key$": "designId" }, "design": { "type": "object", "properties": { "layout": { "type": "object", "description": "Layout structure and component positioning" }, "components": { "type": "array", "description": "Array of UI components in the design", "items": { "type": "object" } }, "styles": { "type": "object", "description": "CSS or style definitions for the design" } }, "key$": "design" }, "preview": { "type": "string", "format": "uri", "description": "URL to preview image of the generated design", "example": "https://stitch.withgoogle.com/previews/design_abc123xyz.png", "key$": "preview" }, "exportFormats": { "type": "array", "description": "Available export formats for the design", "items": { "type": "string" }, "example": ["figma", "sketch", "html", "react"], "key$": "exportFormats" } }, "index$": 0 } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "Invalid prompt or missing required parameters" } } } } } }, "401": { "description": "Unauthorized - Invalid or missing API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "Invalid API key" } } } } } }, "429": { "description": "Too many requests - Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "Rate limit exceeded" } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "Internal server error occurred" } } } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const design_generation_ref01_ent = client.DesignGeneration();
        let design_generation_ref01_data = setup.data.new.design_generation['design_generation_ref01'];
        design_generation_ref01_data = (await design_generation_ref01_ent.create(design_generation_ref01_data)).data();
        (0, node_assert_1.default)(null != design_generation_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/design_generation/DesignGenerationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StitchAiDesignSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['design_generation01', 'design_generation02', 'design_generation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID': idmap,
        'STITCH_AI_DESIGN_TEST_LIVE': 'FALSE',
        'STITCH_AI_DESIGN_TEST_EXPLAIN': 'FALSE',
        'STITCH_AI_DESIGN_APIKEY': '',
    });
    idmap = env['STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID'];
    const live = 'TRUE' === env.STITCH_AI_DESIGN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.StitchAiDesignSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.STITCH_AI_DESIGN_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.STITCH_AI_DESIGN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DesignGenerationEntity.test.js.map