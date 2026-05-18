#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

TARGET_DIR="${1:-$HOME/.config/opencode/plugins}"
TARGET_FILE="$TARGET_DIR/mermaid-renderer.js"
SKILLS_TARGET_DIR="$TARGET_DIR/skills"

echo "Building plugin..."
cd "$PLUGIN_ROOT"
bun run build

echo "Installing mermaid-renderer plugin to $TARGET_FILE..."

mkdir -p "$TARGET_DIR"

# Copy the bundled plugin file
cp "$PLUGIN_ROOT/dist/index.js" "$TARGET_FILE"

mkdir -p "$SKILLS_TARGET_DIR"
cp -R "$PLUGIN_ROOT/skills/mermaid-renderer" "$SKILLS_TARGET_DIR/"

echo "✅ Successfully installed plugin to: $TARGET_FILE"
echo "✅ Successfully installed bundled skills to: $SKILLS_TARGET_DIR"
echo "Restart OpenCode to load the updated plugin."
