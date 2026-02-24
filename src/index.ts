import { renderMermaidAscii } from 'beautiful-mermaid';
import { type Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";

export interface MermaidRendererOptions {
  /** Mermaid diagram syntax */
  diagram: string;
  /** Use ASCII instead of Unicode (default: false) */
  useAscii?: boolean;
  /** Horizontal spacing between nodes (default: 5) */
  paddingX?: number;
  /** Vertical spacing between nodes (default: 5) */
  paddingY?: number;
  /** Padding inside node boxes (default: 1) */
  boxBorderPadding?: number;
}

export interface MermaidRendererResult {
  /** The rendered ASCII/Unicode diagram */
  output: string;
  /** Whether the rendering was successful */
  success: boolean;
  /** Error message if rendering failed */
  error?: string;
}

export function mermaidRenderer(options: MermaidRendererOptions): MermaidRendererResult {
  try {
    const { diagram, useAscii = false, paddingX = 5, paddingY = 5, boxBorderPadding = 1 } = options;

    if (!diagram || diagram.trim().length === 0) {
      return {
        output: '',
        success: false,
        error: 'Diagram content is required'
      };
    }

    const output = renderMermaidAscii(diagram, {
      useAscii,
      paddingX,
      paddingY,
      boxBorderPadding
    });

    return {
      output,
      success: true
    };
  } catch (error) {
    return {
      output: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export const MermaidRendererPlugin: Plugin = async () => {
  return {
    tool: {
      "mermaid-renderer": tool({
        description: "Render mermaid diagrams as beautiful Unicode art. Supports any valid mermaid diagram type including flowcharts, sequence diagrams, class diagrams, ER diagrams, state diagrams, and more.",
        args: {
          diagram: tool.schema
            .string()
            .describe("The mermaid diagram syntax"),
          useAscii: tool.schema
            .boolean()
            .optional()
            .default(false)
            .describe("Use ASCII instead of Unicode, use default unless instructed otherwise(default: false)"),
          paddingX: tool.schema
            .number()
            .optional()
            .default(5)
            .describe("Horizontal spacing between nodes (default: 5)"),
          paddingY: tool.schema
            .number()
            .optional()
            .default(5)
            .describe("Vertical spacing between nodes (default: 5)"),
          boxBorderPadding: tool.schema
            .number()
            .optional()
            .default(1)
            .describe("Padding inside node boxes (default: 1)"),
        },
        async execute(args: any) {
          const result = mermaidRenderer({
            diagram: args.diagram,
            useAscii: args.useAscii,
            paddingX: args.paddingX,
            paddingY: args.paddingY,
            boxBorderPadding: args.boxBorderPadding,
          });
          
          if (!result.success) {
            return `Error: ${result.error}`;
          }
          
          return `\`\`\`\n${result.output}\n\`\`\``;
        },
      }),
    },
  };
};

export default MermaidRendererPlugin;
