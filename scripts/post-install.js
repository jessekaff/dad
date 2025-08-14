#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

// Check if we're in the actual package install (not dev)
const isDevInstall = process.env.npm_lifecycle_event === 'install' && 
                     process.cwd().includes('dad');

if (isDevInstall) {
  // Skip post-install in development
  process.exit(0);
}

console.log(chalk.blue.bold('\n🚀 DAD (Development Accelerator Documents) installed!\n'));

// Check if this is a global install
if (process.env.npm_config_global === 'true') {
  console.log(chalk.green('✓ Installed globally! You can now use "dad" command in any project.\n'));
  console.log(chalk.yellow('To get started:'));
  console.log(chalk.white.bold('  1. Navigate to your project directory'));
  console.log(chalk.white.bold('  2. Run: dad init'));
  console.log(chalk.gray('  3. Select your AI assistant integrations'));
  console.log(chalk.gray('  4. Start using AI commands\n'));
} else {
  console.log(chalk.yellow('To get started:'));
  console.log(chalk.gray('  1. Run: ') + chalk.white.bold('npx dad init'));
  console.log(chalk.gray('  2. Select your AI assistant integrations (Claude Code, Cursor, etc.)'));
  console.log(chalk.gray('  3. Start using AI commands like plan-product, plan-task, execute-task\n'));
  
  console.log(chalk.cyan('💡 Pro tip:'));
  console.log(chalk.gray('  Install globally with ') + chalk.white('npm install -g dad') + chalk.gray(' to use "dad" command anywhere\n'));
}

console.log(chalk.cyan('📚 Documentation:'));
console.log(chalk.gray('  https://github.com/jessekaff/dad\n'));