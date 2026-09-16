

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StitchAiDesignSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DesignGenerationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STITCH_AI_DESIGN_TEST_LIVE=TRUE.
  afterEach(liveDelay('STITCH_AI_DESIGN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StitchAiDesignSDK.test()
    const ent = testsdk.DesignGeneration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STITCH_AI_DESIGN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'design_generation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"colorScheme","req":false,"short":"Preferred color scheme for the design","type":"`$STRING`","index$":0},{"active":true,"name":"components","req":false,"short":"Specific UI components to include","type":"`$ARRAY`","index$":1},{"active":true,"name":"design","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"designId","req":false,"short":"Unique identifier for the generated design","type":"`$STRING`","index$":3},{"active":true,"name":"exportFormats","req":false,"short":"Available export formats for the design","type":"`$ARRAY`","index$":4},{"active":true,"name":"platform","req":false,"short":"Target platform for the UI design","type":"`$STRING`","index$":5},{"active":true,"format":"uri","name":"preview","req":false,"short":"URL to preview image of the generated design","type":"`$STRING`","index$":6},{"active":true,"name":"prompt","req":true,"short":"Description of the desired UI design","type":"`$STRING`","index$":7},{"active":true,"name":"style","req":false,"short":"Design style preferences","type":"`$STRING`","index$":8},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":9}],"name":"design_generation","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /generate","json":"{\"operationId\":\"generateUIDesign\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"colorScheme\":{\"description\":\"Preferred color scheme for the design\",\"example\":\"blue and white\",\"type\":\"string\"},\"components\":{\"description\":\"Specific UI components to include\",\"example\":[\"button\",\"input field\",\"logo\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"platform\":{\"description\":\"Target platform for the UI design\",\"enum\":[\"web\",\"mobile\",\"ios\",\"android\"],\"example\":\"mobile\",\"type\":\"string\"},\"prompt\":{\"description\":\"Description of the desired UI design\",\"example\":\"Create a modern login screen for a mobile banking app\",\"type\":\"string\"},\"style\":{\"description\":\"Design style preferences\",\"example\":\"minimalist\",\"type\":\"string\"}},\"required\":[\"prompt\"],\"type\":\"object\"}}},\"description\":\"Design generation parameters and requirements\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"design\":{\"properties\":{\"components\":{\"description\":\"Array of UI components in the design\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"layout\":{\"description\":\"Layout structure and component positioning\",\"type\":\"object\"},\"styles\":{\"description\":\"CSS or style definitions for the design\",\"type\":\"object\"}},\"type\":\"object\"},\"designId\":{\"description\":\"Unique identifier for the generated design\",\"example\":\"design_abc123xyz\",\"type\":\"string\"},\"exportFormats\":{\"description\":\"Available export formats for the design\",\"example\":[\"figma\",\"sketch\",\"html\",\"react\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"preview\":{\"description\":\"URL to preview image of the generated design\",\"example\":\"https://stitch.withgoogle.com/previews/design_abc123xyz.png\",\"format\":\"uri\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated UI design\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid prompt or missing required parameters\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid API key\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error occurred\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/generate","segments":[{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"design_generation","name__orig":"design_generation","Name":"DesignGeneration","name_":"design_generation","name-":"design-generation","NAME":"DESIGN_GENERATION","index$":0}, {"active":true,"entity":"design_generation","key$":"BasicDesignGenerationFlow","kind":"basic","name":"BasicDesignGenerationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"design_generation_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DesignGeneration')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const design_generation_ref01_ent = client.DesignGeneration()
    let design_generation_ref01_data = setup.data.new.design_generation['design_generation_ref01']

    design_generation_ref01_data = (await design_generation_ref01_ent.create(design_generation_ref01_data)).data()
    assert(null != design_generation_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/design_generation/DesignGenerationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = StitchAiDesignSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['design_generation01','design_generation02','design_generation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID': idmap,
    'STITCH_AI_DESIGN_TEST_LIVE': 'FALSE',
    'STITCH_AI_DESIGN_TEST_EXPLAIN': 'FALSE',
    'STITCH_AI_DESIGN_APIKEY': '',
  })

  idmap = env['STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID']

  const live = 'TRUE' === env.STITCH_AI_DESIGN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STITCH_AI_DESIGN_TEST_DESIGN_GENERATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new StitchAiDesignSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
