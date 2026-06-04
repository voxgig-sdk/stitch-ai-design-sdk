# StitchAiDesign SDK

Generate mobile and web user interface designs from prompts using Google's Stitch AI

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Stitch AI Design

[Stitch](https://stitch.withgoogle.com/) is a Google experiment that uses AI to generate user interface designs for mobile and web applications, helping designers move from idea to prototype without hand-crafting each layout.

The SDK targets the `https://stitch.withgoogle.com/api` endpoint, which exposes Stitch's design-generation capability so callers can request UI mockups programmatically rather than only through the web tool.

The community catalogue page on [freepublicapis.com](https://freepublicapis.com/stitch-ai-design) lists the API as requiring an API key and notes that CORS is disabled, so browser-side calls are not supported and requests should originate from a server or trusted client.

## Try it

**TypeScript**
```bash
npm install stitch-ai-design
```

**Python**
```bash
pip install stitch-ai-design-sdk
```

**PHP**
```bash
composer require voxgig/stitch-ai-design-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/stitch-ai-design-sdk/go
```

**Ruby**
```bash
gem install stitch-ai-design-sdk
```

**Lua**
```bash
luarocks install stitch-ai-design-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { StitchAiDesignSDK } from 'stitch-ai-design'

const client = new StitchAiDesignSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o stitch-ai-design-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "stitch-ai-design": {
      "command": "/abs/path/to/stitch-ai-design-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **DesignGeneration** | AI-driven UI design generation requests sent to the Stitch API host. | `/generate` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from stitchaidesign_sdk import StitchAiDesignSDK

client = StitchAiDesignSDK({})

```

### PHP

```php
<?php
require_once 'stitchaidesign_sdk.php';

$client = new StitchAiDesignSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/stitch-ai-design-sdk/go"

client := sdk.NewStitchAiDesignSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "StitchAiDesign_sdk"

client = StitchAiDesignSDK.new({})

```

### Lua

```lua
local sdk = require("stitch-ai-design_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = StitchAiDesignSDK.test()
const result = await client.DesignGeneration().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = StitchAiDesignSDK.test(None, None)
result, err = client.DesignGeneration(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = StitchAiDesignSDK::test(null, null);
[$result, $err] = $client->DesignGeneration(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.DesignGeneration(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = StitchAiDesignSDK.test(nil, nil)
result, err = client.DesignGeneration(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:DesignGeneration(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Stitch AI Design

- Upstream: [https://stitch.withgoogle.com/](https://stitch.withgoogle.com/)

---

Generated from the Stitch AI Design OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
