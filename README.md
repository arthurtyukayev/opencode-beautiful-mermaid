# OpenCode Beautiful Mermaid

An OpenCode plugin for rendering Mermaid diagrams as beautiful Unicode art.

## Tool

### `mermaid-renderer`

Render mermaid diagram syntax as Unicode art.

**Args**
- `diagram` (string, required): The mermaid diagram syntax
- `paddingX` (number, optional): Horizontal spacing between nodes (default: `5`)
- `paddingY` (number, optional): Vertical spacing between nodes (default: `5`)
- `boxBorderPadding` (number, optional): Padding inside node boxes (default: `1`)

**Returns**
- `success` (boolean): Whether rendering succeeded
- `output` (string): The rendered Unicode diagram
- `rendered` (string, optional): Markdown-wrapped display content (present on success)
- `error` (string, optional): Error message if rendering failed

**Supported Diagram Types**
- Flowcharts: `graph TD`, `graph LR`, `graph BT`, `graph RL`
- Sequence Diagrams: `sequenceDiagram`
- Class Diagrams: `classDiagram`
- ER Diagrams: `erDiagram`
- State Diagrams: `stateDiagram-v2`

## Installation

### npm (Recommended)

Add the package to your OpenCode config:

```json
{
  "plugin": ["opencode-beautiful-mermaid"]
}
```

Supported config locations:
- Global config: `~/.config/opencode/opencode.json`
- Project config: `.opencode/opencode.json`

Restart OpenCode so the plugin is loaded.

### Local Plugin

Install directly from this repo:

```bash
bun run install:local
```

This copies `index.ts` to:

```bash
~/.config/opencode/plugins/beautiful-mermaid.ts
```

Manual copy option:

```bash
mkdir -p ~/.config/opencode/plugins
cp src/index.ts ~/.config/opencode/plugins/beautiful-mermaid.ts
```

Restart OpenCode and the tool will be available automatically.

## Example Output

```
┌──────────┐            
│          │            
│  Start   │            
│          │            
└─────┬────┘            
      │                 
      ▼                 
┌──────────┐            
│          │            
│ Decision ├──No────┐   
│          │        │   
└─────┬────┘        │   
      │             │   
     Yes            │   
      │             │   
      ▼             ▼   
┌──────────┐     ┌─────┐
│          │     │     │
│  Action  │     │ End │
│          │     │     │
└──────────┘     └─────┘
```

## Development

```bash
bun install
bun run test
bun run build
```

## Publish Checklist

- Run type checks: `bun run typecheck`
- Build distributable file: `bun run build`
- Preview package contents: `bun pm pack --dry-run`
- Confirm version bump uses SemVer (`bun pm version patch|minor|major`)
- Publish: `bun publish`

## License

MIT
