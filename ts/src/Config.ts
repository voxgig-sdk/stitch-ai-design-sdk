
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://stitch.withgoogle.com/api",

    auth: {
      prefix: '',
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
              "parts": [
                "generate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

