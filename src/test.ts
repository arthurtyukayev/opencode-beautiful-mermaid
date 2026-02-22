import { mermaidRenderer } from './index.js';

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
} else {
  console.error('Error:', classResult.error);
}

console.log('\n---\n');

// Test 4: ASCII Mode
console.log('4. Flowchart (ASCII mode):');
const asciiResult = mermaidRenderer({
  diagram: `
    graph LR
      A --> B --> C
  `,
  useAscii: true
});

if (asciiResult.success) {
  console.log(asciiResult.output);
} else {
  console.error('Error:', asciiResult.error);
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
} else {
  console.error('Error:', stateResult.error);
}

console.log('\n---\n');

// Test 6: Error handling
console.log('6. Error handling (empty diagram):');
const errorResult = mermaidRenderer({
  diagram: ''
});

console.log('Success:', errorResult.success);
console.log('Error:', errorResult.error);

console.log('\n=== All tests completed ===');
