
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


  main = {
    name: 'StitchAiDesign',
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
          "type": "`$STRING`"
        },
        {
          "name": "components",
          "type": "`$ARRAY`"
        },
        {
          "name": "design",
          "type": "`$OBJECT`"
        },
        {
          "name": "designId",
          "type": "`$STRING`"
        },
        {
          "name": "exportFormats",
          "type": "`$ARRAY`"
        },
        {
          "name": "platform",
          "type": "`$STRING`"
        },
        {
          "name": "preview",
          "type": "`$STRING`"
        },
        {
          "name": "prompt",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "style",
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

