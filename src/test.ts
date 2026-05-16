import { mermaidRenderer, formatMermaidToolResponse } from './index.js';

console.log('=== Mermaid Renderer Plugin Test ===\n');

// Test 1: Flowchart
console.log('1. Flowchart (TD):');
const flowchartResult = mermaidRenderer({
  diagram: `
    graph TD
      A[Start] --> B{Decision}
      B -->|Yes| C[Action]
      B -->|No| D[End]
  `
});

if (flowchartResult.success) {
  console.log(flowchartResult.output);
  console.log('(output length:', flowchartResult.output.trim().length, 'chars)');
} else {
  console.error('Error:', flowchartResult.error);
}

console.log('\n---\n');

// Test 2: Sequence Diagram
console.log('2. Sequence Diagram:');
const sequenceResult = mermaidRenderer({
  diagram: `
    sequenceDiagram
      Alice->>Bob: Hello Bob!
      Bob-->>Alice: Hi Alice!
      Alice->>Bob: How are you?
      Bob-->>Alice: Great, thanks!
  `
});

if (sequenceResult.success) {
  console.log(sequenceResult.output);
  console.log('(output length:', sequenceResult.output.trim().length, 'chars)');
} else {
  console.error('Error:', sequenceResult.error);
}

console.log('\n---\n');

// Test 3: Class Diagram
console.log('3. Class Diagram:');
const classResult = mermaidRenderer({
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

if (classResult.success) {
  console.log(classResult.output);
  console.log('(output length:', classResult.output.trim().length, 'chars)');
} else {
  console.error('Error:', classResult.error);
}

console.log('\n---\n');

// Test 4: Flowchart (LR)
console.log('4. Flowchart (LR):');
const lrResult = mermaidRenderer({
  diagram: `
    graph LR
      A --> B --> C
  `
});

if (lrResult.success) {
  console.log(lrResult.output);
  console.log('(output length:', lrResult.output.trim().length, 'chars)');
} else {
  console.error('Error:', lrResult.error);
}

console.log('\n---\n');

// Test 5: State Diagram
console.log('5. State Diagram:');
const stateResult = mermaidRenderer({
  diagram: `
    stateDiagram-v2
      [*] --> Idle
      Idle --> Processing: start
      Processing --> Complete: done
      Complete --> [*]
  `
});

if (stateResult.success) {
  console.log(stateResult.output);
  console.log('(output length:', stateResult.output.trim().length, 'chars)');
} else {
  console.error('Error:', stateResult.error);
}

console.log('\n---\n');

// Test 6: Error handling (empty diagram)
console.log('6. Error handling (empty diagram):');
const errorResult = mermaidRenderer({
  diagram: ''
});

console.log('Success:', errorResult.success);
console.log('Error:', errorResult.error);

console.log('\n---\n');

// Test 7: formatMermaidToolResponse always includes output
console.log('7. Tool response never omits output:');
const toolResult = formatMermaidToolResponse(flowchartResult);

if (!toolResult.success || !toolResult.output || toolResult.output.trim().length === 0) {
  console.error('FAIL: tool response missing output on success');
  process.exit(1);
}

if (!toolResult.rendered || toolResult.rendered.trim().length === 0) {
  console.error('FAIL: tool response missing rendered field on success');
  process.exit(1);
}

if (!toolResult.content.includes(toolResult.output)) {
  console.error('FAIL: tool content does not include rendered output');
  process.exit(1);
}

if (!toolResult.content.includes('Include the rendered diagram above verbatim')) {
  console.error('FAIL: tool content missing chat-display instruction');
  process.exit(1);
}

console.log('PASS: successful render includes output, rendered, and content fields');
console.log('content preview:', toolResult.content.substring(0, 80) + '...');

console.log('\n---\n');

// Test 8: formatMermaidToolResponse for error case
console.log('8. Tool response for error:');
const errorToolResult = formatMermaidToolResponse(errorResult);

if (errorToolResult.success) {
  console.error('FAIL: error result should have success=false');
  process.exit(1);
}

if (!errorToolResult.error || errorToolResult.error.length === 0) {
  console.error('FAIL: error result missing error message');
  process.exit(1);
}

if (!errorToolResult.content.startsWith('Error:')) {
  console.error('FAIL: error result content should be displayable');
  process.exit(1);
}

console.log('PASS: error response has success=false and error message');

console.log('\n=== All tests completed ===');
