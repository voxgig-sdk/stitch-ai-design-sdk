

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StitchAiDesignSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = StitchAiDesignSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DesignGeneration().create({"colorScheme":1,"prompt":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STITCH_AI_DESIGN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'design_generation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"colorScheme":{"a":true,"h":"Color Scheme","n":"colorScheme","r":false,"sh":"Preferred color scheme for the design","t":"`$STRING`","key$":"colorScheme","index$":0},"components":{"a":true,"h":"Components","n":"components","r":false,"sh":"Specific UI components to include","t":"`$ARRAY`","key$":"components","index$":1},"design":{"a":true,"h":"Design","n":"design","r":false,"t":"`$OBJECT`","key$":"design","index$":2},"designId":{"a":true,"h":"Design Id","n":"designId","r":false,"sh":"Unique identifier for the generated design","t":"`$STRING`","key$":"designId","index$":3},"exportFormats":{"a":true,"h":"Export Formats","n":"exportFormats","r":false,"sh":"Available export formats for the design","t":"`$ARRAY`","key$":"exportFormats","index$":4},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"sh":"Target platform for the UI design","t":"`$STRING`","key$":"platform","index$":5},"preview":{"a":true,"fo":"uri","h":"Preview","n":"preview","r":false,"sh":"URL to preview image of the generated design","t":"`$STRING`","key$":"preview","index$":6},"prompt":{"a":true,"h":"Prompt","n":"prompt","r":true,"sh":"Description of the desired UI design","t":"`$STRING`","key$":"prompt","index$":7},"style":{"a":true,"h":"Style","n":"style","r":false,"sh":"Design style preferences","t":"`$STRING`","key$":"style","index$":8},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":9}},"name":"design_generation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["colorScheme","components","platform","prompt","style"],"co":{"id":"POST /generate","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/generate","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"generate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"design_generation","name__orig":"design_generation","Name":"DesignGeneration","name_":"design_generation","name-":"design-generation","NAME":"DESIGN_GENERATION","index$":0}, {"active":true,"entity":"design_generation","key$":"BasicDesignGenerationFlow","kind":"basic","name":"BasicDesignGenerationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"design_generation_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'DesignGeneration', {"POST /generate":{"protocol":"http","requestBody":{"description":"Design generation parameters and requirements","required":true,"content":{"application/json":{"schema":{"type":"object","required":["prompt"],"properties":{"prompt":{"type":"string","description":"Description of the desired UI design","example":"Create a modern login screen for a mobile banking app","key$":"prompt"},"platform":{"type":"string","enum":["web","mobile","ios","android"],"description":"Target platform for the UI design","example":"mobile","key$":"platform"},"style":{"type":"string","description":"Design style preferences","example":"minimalist","key$":"style"},"colorScheme":{"type":"string","description":"Preferred color scheme for the design","example":"blue and white","key$":"colorScheme"},"components":{"type":"array","description":"Specific UI components to include","items":{"type":"string"},"example":["button","input field","logo"],"key$":"components"}},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
