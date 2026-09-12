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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://stitch.withgoogle.com/api",
            "auth": {
                "prefix": "",
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
            "short": "Preferred color scheme for the design",
            "type": "`$STRING`",
          },
          {
            "name": "components",
            "short": "Specific UI components to include",
            "type": "`$ARRAY`",
          },
          {
            "name": "design",
            "type": "`$OBJECT`",
          },
          {
            "name": "designId",
            "short": "Unique identifier for the generated design",
            "type": "`$STRING`",
          },
          {
            "name": "exportFormats",
            "short": "Available export formats for the design",
            "type": "`$ARRAY`",
          },
          {
            "name": "platform",
            "short": "Target platform for the UI design",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "preview",
            "short": "URL to preview image of the generated design",
            "type": "`$STRING`",
          },
          {
            "name": "prompt",
            "req": True,
            "short": "Description of the desired UI design",
            "type": "`$STRING`",
          },
          {
            "name": "style",
            "short": "Design style preferences",
            "type": "`$STRING`",
          },
          {
            "name": "success",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/generate",
                "segments": [
                  {
                    "lit": "generate",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                ],
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
