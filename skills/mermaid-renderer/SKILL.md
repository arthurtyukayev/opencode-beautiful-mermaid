---
name: mermaid-renderer
description: Use when users ask to create, draw, render, preview, show, visualize, or improve Mermaid diagrams; renders diagrams as Unicode art with the mermaid-renderer tool.
license: MIT
compatibility: opencode
metadata:
  plugin: opencode-beautiful-mermaid
  tool: mermaid-renderer
---

# Mermaid Renderer

Use the `mermaid-renderer` tool to turn Mermaid diagram syntax into terminal-friendly Unicode art that can be shown directly in chat.

## When to use

Use this skill when the user asks to:

- Create, draw, render, preview, show, or visualize a diagram
- Convert Mermaid syntax into a visible diagram
- Show flows, architecture, relationships, state transitions, timelines, class diagrams, ER diagrams, or sequences
- Improve an existing Mermaid diagram so it is easier to inspect in a terminal

## Workflow

1. Choose or write valid Mermaid syntax for the requested diagram.
2. Call the `mermaid-renderer` tool with the full Mermaid source.
3. Check the tool result before responding.
4. If rendering succeeds, include the rendered Unicode diagram verbatim in the final answer.
5. If rendering fails, fix the Mermaid syntax and retry when practical; otherwise explain the error.

## Response rules

- Always include the rendered Unicode diagram when rendering succeeds.
- Do not only describe the diagram; show it.
- Keep diagrams focused and readable.
- Prefer multiple smaller diagrams over one crowded rendering.
- Increase `paddingX`, `paddingY`, or `boxBorderPadding` if labels overlap or the diagram is cramped.
