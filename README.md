# opencode-beautiful-mermaid

An Opencode plugin for rendering Mermaid diagrams as beautiful ASCII/Unicode art.

## Features

- Render any valid mermaid diagram syntax to ASCII/Unicode art.
- Supported diagrams include: Flowcharts, Sequence Diagrams, Class Diagrams, ER Diagrams, State Diagrams, and more.
- Highly customizable with options for padding, box borders, and ASCII/Unicode modes.
- Powered by [beautiful-mermaid](https://github.com/beautiful-mermaid).

## Installation

You can install this plugin locally using:

```bash
bun add opencode-beautiful-mermaid
```

## Usage

This plugin registers the `mermaid-renderer` tool with Opencode. When a user asks to visualize a diagram, flow, or relationship, the Opencode agent can use this tool to render the diagram directly in the terminal output.

### Tool Parameters

- `diagram` (string, required): The mermaid diagram syntax.
- `useAscii` (boolean, optional): Use plain ASCII characters instead of Unicode (default: `false`).
- `paddingX` (number, optional): Horizontal padding between nodes (default: `5`).
- `paddingY` (number, optional): Vertical padding between nodes (default: `5`).
- `boxBorderPadding` (number, optional): Padding inside the drawn boxes (default: `1`).

## Example Tool Output

```
1. Flowchart (TD):
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

To develop and test the plugin locally:

```bash
# Install dependencies
bun install

# Run tests
bun run test

# Build the plugin
bun run build
```

## License

MIT
