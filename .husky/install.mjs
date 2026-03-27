#!/usr/bin/env node

// Husky v9 installation script
// Husky v9 doesn't need explicit installation, but we ensure hooks are executable

import { chmod } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const hooks = ['pre-commit', 'commit-msg'];

hooks.forEach(hook => {
  const hookPath = join(__dirname, hook);
  chmod(hookPath, 0o755, (err) => {
    if (err) {
      console.error(`Error making ${hook} executable:`, err);
    } else {
      console.log(`✓ Made ${hook} executable`);
    }
  });
});

console.log('Husky hooks configured successfully!');
