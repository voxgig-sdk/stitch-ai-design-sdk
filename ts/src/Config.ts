
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'StitchAiDesign',
        slug: "stitch-ai-design",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://stitch.withgoogle.com/api",

    auth: {
      prefix: '',
      name: 'X-API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        design_generation: {
        },
  
    }
  }


  entity = {
    "design_generation": {
      "fields": [
        {
          "name": "colorScheme",
          "title": "Color Scheme",
          "type": "`$STRING`",
          "short": "Preferred color scheme for the design"
        },
        {
          "name": "components",
          "title": "Components",
          "type": "`$ARRAY`",
          "short": "Specific UI components to include"
        },
        {
          "name": "design",
          "title": "Design",
          "type": "`$OBJECT`"
        },
        {
          "name": "designId",
          "title": "Design Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the generated design"
        },
        {
          "name": "exportFormats",
          "title": "Export Formats",
          "type": "`$ARRAY`",
          "short": "Available export formats for the design"
        },
        {
          "name": "platform",
          "title": "Platform",
          "type": "`$STRING`",
          "short": "Target platform for the UI design"
        },
        {
          "name": "preview",
          "title": "Preview",
          "type": "`$STRING`",
          "short": "URL to preview image of the generated design",
          "format": "uri"
        },
        {
          "name": "prompt",
          "title": "Prompt",
          "type": "`$STRING`",
          "req": true,
          "short": "Description of the desired UI design"
        },
        {
          "name": "style",
          "title": "Style",
          "type": "`$STRING`",
          "short": "Design style preferences"
        },
        {
          "name": "success",
          "title": "Success",
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
              "kind": "http",
              "method": "POST",
              "orig": "/generate",
              "segments": [
                {
                  "lit": "generate"
                }
              ],
              "parts": [
                "generate"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

