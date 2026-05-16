# Mermaid Renderer Plugin for Opencode

This plugin provides a `mermaid-renderer` tool for rendering mermaid diagrams as beautiful Unicode art.

## When to Use

Use the `mermaid-renderer` tool when:
- The user asks to create or visualize a diagram
- You need to render any mermaid diagram to Unicode art
- The user wants to see a visual representation of relationships, flows, or structures

## Supported Diagram Types

This tool can render **any valid mermaid diagram**, including:
- **Flowcharts**: `graph TD`, `graph LR`, `graph BT`, `graph RL`
- **Sequence Diagrams**: `sequenceDiagram`
- **Class Diagrams**: `classDiagram`
- **ER Diagrams**: `erDiagram`
- **State Diagrams**: `stateDiagram-v2`
- And any other valid mermaid syntax

## Tool Usage

### mermaid-renderer

Renders mermaid diagram syntax as Unicode art.

**Parameters:**
- `diagram` (string, required): The mermaid diagram syntax
- `paddingX` (number, optional): Horizontal spacing between nodes (default: 5)
- `paddingY` (number, optional): Vertical spacing between nodes (default: 5)
- `boxBorderPadding` (number, optional): Padding inside node boxes (default: 1)

**Returns:**
- `success` (boolean): Whether rendering succeeded
- `output` (string): The rendered Unicode diagram
- `rendered` (string, optional): Markdown-wrapped display content (present on success)
- `error` (string, optional): Error message if rendering failed

**Important:** Always check `success` before using `output`. On a successful render, `output` is guaranteed to be non-empty and `rendered` will contain a markdown-wrapped version. On failure, `error` will contain the error message.

## Examples

### Sequence Diagram

```typescript
const result = await mermaidRenderer({
  diagram: `
    sequenceDiagram
      Alice->>Bob: Hello Bob!
      Bob-->>Alice: Hi Alice!
      Alice->>Bob: How are you?
      Bob-->>Alice: Great, thanks!
  `
});
```

### Flowchart

```typescript
const result = await mermaidRenderer({
  diagram: `
    graph TD
      A[Start] --> B{Decision}
      B -->|Yes| C[Action]
      B -->|No| D[End]
  `
});
```

### Class Diagram

```typescript
const result = await mermaidRenderer({
  diagram: `
    classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal: +int age
      Animal: +isMammal() bool
      Duck: +String beakColor
      Duck: +swim()
  `
});
```

### ER Diagram

```typescript
const result = await mermaidRenderer({
  diagram: `
    erDiagram
      CUSTOMER ||--o{ ORDER : places
      ORDER ||--|{ LINE_ITEM : contains
      PRODUCT ||--o{ LINE_ITEM : "is in"
  `
});
```

### State Diagram

```typescript
const result = await mermaidRenderer({
  diagram: `
    stateDiagram-v2
      [*] --> Idle
      Idle --> Processing: start
      Processing --> Complete: done
      Complete --> [*]
  `
});
```

## Best Practices

1. **Always validate the result**: Check `result.success` before using `result.output`
2. **Use appropriate diagram types**: Choose the diagram type that best represents the information
3. **Keep diagrams simple**: Complex diagrams may not render well in terminal output
4. **Adjust spacing if needed**: Increase `paddingX` or `paddingY` for larger diagrams

## Error Handling

If rendering fails, the tool returns:
```typescript
{
  success: false,
  output: '',
  error: 'Error message here'
}
```

Always check `success` before displaying the output to the user.