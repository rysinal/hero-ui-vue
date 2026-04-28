#!/usr/bin/env node

/**
 * Script to copy all component styles from React source to Vue package
 * Converts TypeScript imports to use single quotes
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceBase = join(__dirname, '../react-source/heroui/packages/styles/src/components');
const targetBase = join(__dirname, '../packages/styles/src/components');

// List of all component directories to copy
const components = [
  'accordion', 'alert', 'alert-dialog', 'autocomplete', 'avatar', 'badge',
  'breadcrumbs', 'button-group', 'calendar', 'calendar-year-picker', 'card',
  'checkbox', 'checkbox-group', 'chip', 'color-area', 'color-field',
  'color-input-group', 'color-picker', 'color-slider', 'color-swatch',
  'color-swatch-picker', 'combo-box', 'date-field', 'date-input-group',
  'date-picker', 'date-range-picker', 'disclosure', 'disclosure-group',
  'drawer', 'dropdown', 'empty-state', 'error-message', 'fieldset',
  'header', 'input', 'input-group', 'input-otp', 'list-box', 'list-box-item',
  'list-box-section', 'menu', 'menu-item', 'menu-section', 'meter', 'modal',
  'number-field', 'pagination', 'popover', 'progress-bar', 'progress-circle',
  'radio', 'radio-group', 'range-calendar', 'scroll-shadow', 'search-field',
  'select', 'skeleton', 'slider', 'surface', 'switch', 'switch-group',
  'table', 'tabs', 'tag', 'tag-group', 'textarea', 'textfield', 'time-field',
  'toast', 'toggle-button', 'toggle-button-group', 'toolbar', 'tooltip'
];

function convertQuotes(content) {
  // Convert double quotes to single quotes in imports
  return content
    .replace(/import type \{([^}]+)\} from "([^"]+)"/g, "import type {$1} from '$2'")
    .replace(/import \{([^}]+)\} from "([^"]+)"/g, "import {$1} from '$2'")
    .replace(/export \{([^}]+)\} from "([^"]+)"/g, "export {$1} from '$2'");
}

let copiedCount = 0;
let skippedCount = 0;

for (const component of components) {
  const sourceDir = join(sourceBase, component);
  const targetDir = join(targetBase, component);

  // Check if source directory exists
  if (!existsSync(sourceDir)) {
    console.log(`⚠️  Skipping ${component} - source not found`);
    skippedCount++;
    continue;
  }

  // Create target directory
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Copy .styles.ts file
  const stylesFile = `${component}.styles.ts`;
  const sourcePath = join(sourceDir, stylesFile);
  const targetPath = join(targetDir, stylesFile);

  if (existsSync(sourcePath)) {
    const content = readFileSync(sourcePath, 'utf-8');
    const converted = convertQuotes(content);
    writeFileSync(targetPath, converted);

    // Create index.ts
    const indexContent = `export * from './${stylesFile.replace('.ts', '')}'\n`;
    writeFileSync(join(targetDir, 'index.ts'), indexContent);

    copiedCount++;
    console.log(`✅ Copied ${component}`);
  } else {
    console.log(`⚠️  Skipping ${component} - styles file not found`);
    skippedCount++;
  }
}

// Update components/index.ts
const indexExports = components
  .filter(c => existsSync(join(targetBase, c)))
  .map(c => `export * from './${c}'`)
  .join('\n');

writeFileSync(join(targetBase, 'index.ts'), indexExports + '\n');

console.log(`\n✨ Done! Copied ${copiedCount} components, skipped ${skippedCount}`);
