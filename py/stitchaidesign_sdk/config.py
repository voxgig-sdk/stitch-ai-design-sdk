# StitchAiDesign SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "StitchAiDesign",
            "slug": "stitch-ai-design",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://stitch.withgoogle.com/api",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "design_generation": {},
            },
        },
        "entity": {
      "design_generation": {
        "fields": [
          {
            "name": "colorScheme",
            "title": "Color Scheme",
            "type": "`$STRING`",
            "short": "Preferred color scheme for the design",
          },
          {
            "name": "components",
            "title": "Components",
            "type": "`$ARRAY`",
            "short": "Specific UI components to include",
          },
          {
            "name": "design",
            "title": "Design",
            "type": "`$OBJECT`",
          },
          {
            "name": "designId",
            "title": "Design Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the generated design",
          },
          {
            "name": "exportFormats",
            "title": "Export Formats",
            "type": "`$ARRAY`",
            "short": "Available export formats for the design",
          },
          {
            "name": "platform",
            "title": "Platform",
            "type": "`$STRING`",
            "short": "Target platform for the UI design",
          },
          {
            "name": "preview",
            "title": "Preview",
            "type": "`$STRING`",
            "short": "URL to preview image of the generated design",
            "format": "uri",
          },
          {
            "name": "prompt",
            "title": "Prompt",
            "type": "`$STRING`",
            "req": True,
            "short": "Description of the desired UI design",
          },
          {
            "name": "style",
            "title": "Style",
            "type": "`$STRING`",
            "short": "Design style preferences",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
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
                    "lit": "generate",
                  },
                ],
                "parts": [
                  "generate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
