import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderMermaidAscii } from 'beautiful-mermaid';
import { type Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface MermaidRendererOptions {
  /** Mermaid diagram syntax */
  diagram: string;
  /** Horizontal spacing between nodes (default: 5) */
  paddingX?: number;
  /** Vertical spacing between nodes (default: 5) */
  paddingY?: number;
  /** Padding inside node boxes (default: 1) */
  boxBorderPadding?: number;
}

export interface MermaidRendererResult {
  /** The rendered Unicode diagram */
  output: string;
  /** Whether the rendering was successful */
  success: boolean;
  /** Error message if rendering failed */
  error?: string;
}

export interface MermaidRendererToolResponse {
  /** Whether the rendering was successful */
  success: boolean;
  /** The rendered Unicode diagram */
  output: string;
  /** Markdown-ready display content for hosts/UIs */
  rendered?: string;
  /** Full tool result text returned to the model */
  content: string;
  /** Error message if rendering failed */
  error?: string;
}

function getBundledSkillsPath(): string | undefined {
  const candidates = [
    path.join(__dirname, "..", "skills"),
    path.join(__dirname, "skills"),
  ];

  return candidates.find((candidate) => existsSync(candidate));
}

export function mermaidRenderer(options: MermaidRendererOptions): MermaidRendererResult {
  try {
    const { diagram, paddingX = 5, paddingY = 5, boxBorderPadding = 1 } = options;

    if (!diagram || diagram.trim().length === 0) {
      return {
        output: '',
        success: false,
        error: 'Diagram content is required'
      };
    }

    const output = renderMermaidAscii(diagram, {
      useAscii: false,
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

export function formatMermaidToolResponse(result: MermaidRendererResult): MermaidRendererToolResponse {
  if (!result.success) {
    return {
      success: false,
      output: '',
      content: `Error: ${result.error ?? 'Unknown error occurred'}`,
      error: result.error ?? 'Unknown error occurred'
    };
  }

  const trimmedOutput = result.output.trim();

  if (trimmedOutput.length === 0) {
    return {
      success: false,
      output: '',
      content: 'Error: Renderer returned empty output',
      error: 'Renderer returned empty output'
    };
  }

  const rendered = "Rendered Mermaid diagram:\n\n```text\n" + result.output + "\n```";

  return {
    success: true,
    output: result.output,
    rendered,
    content: [
      rendered,
      '',
      'IMPORTANT: Include the rendered diagram above verbatim in your chat response. Do not summarize or omit it.'
    ].join('\n')
  };
}

export const MermaidRendererPlugin: Plugin = async () => {
  return {
    config: async (config: any) => {
      const skillsPath = getBundledSkillsPath();
      if (!skillsPath) return;

      config.skills ??= {};
      config.skills.paths ??= [];

      if (!config.skills.paths.includes(skillsPath)) {
        config.skills.paths.push(skillsPath);
      }
    },
    "tool.definition": async (input, output) => {
      if (input.toolID !== "mermaid-renderer") return;

      output.description = [
        output.description,
        "Use this automatically for diagram creation or visualization requests, then include the rendered Unicode output verbatim in the final response."
      ].join(" ");
    },
    tool: {
      "mermaid-renderer": tool({
        description: "Render mermaid diagrams as beautiful Unicode art. Supports any valid mermaid diagram type including flowcharts, sequence diagrams, class diagrams, ER diagrams, state diagrams, and more. After using this tool, include the returned rendered diagram verbatim in your chat response so the user can see it.",
        args: {
          diagram: tool.schema
            .string()
            .describe("The mermaid diagram syntax"),
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
        async execute(args: any): Promise<string> {
          const result = mermaidRenderer({
            diagram: args.diagram,
            paddingX: args.paddingX,
            paddingY: args.paddingY,
            boxBorderPadding: args.boxBorderPadding,
          });

          const response = formatMermaidToolResponse(result);
          return response.content;
        },
      }),
    },
  };
};

export default MermaidRendererPlugin;
