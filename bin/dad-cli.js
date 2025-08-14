#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const { install } = require('../lib/install');
const { checkForUpdates } = require('../lib/check-updates');
const { validateEnvironment } = require('../lib/check-environment');
const { version } = require('../package.json');

program
  .version(version)
  .description('Development Accelerator Documents (DAD) - AI-assisted development system');

program
  .command('init')
  .description('Initialize DAD in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('--claude', 'Include Claude Code integration')
  .option('--cursor', 'Include Cursor integration')
  .action(async (options) => {
    console.log(chalk.blue.bold('\n🚀 Welcome to DAD (Development Accelerator Documents)\n'));
    
    // Check for updates (non-blocking)
    checkForUpdates();
    
    // Validate environment
    const isValid = await validateEnvironment({ 
      requireGit: true,
      requirePackageJson: false 
    });
    
    if (!isValid) {
      process.exit(1);
    }
    
    let config = {
      integrations: {
        claude: options.claude || false,
        cursor: options.cursor || false
      }
    };

    if (!options.yes && !options.claude && !options.cursor) {
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'integrations',
          message: 'Which AI assistant integrations would you like to enable?',
          choices: [
            { name: 'Claude Code', value: 'claude', checked: true },
            { name: 'Cursor', value: 'cursor', checked: true }
          ]
        },
        {
          type: 'confirm',
          name: 'gitignore',
          message: 'Would you like to add DAD entries to .gitignore?',
          default: true
        }
      ]);

      config.integrations.claude = answers.integrations.includes('claude');
      config.integrations.cursor = answers.integrations.includes('cursor');
      config.gitignore = answers.gitignore;
    } else if (options.yes) {
      config.integrations.claude = true;
      config.integrations.cursor = true;
      config.gitignore = true;
    }

    const spinner = ora('Installing DAD...').start();
    
    try {
      await install(config);
      spinner.succeed(chalk.green('DAD installed successfully!'));
      
      console.log(chalk.yellow('\n📚 Next steps:'));
      console.log('  1. Review the .dad folder to understand the structure');
      console.log('  2. Customize .dad/product/mission.md for your project');
      console.log('  3. Use AI commands: plan-product, analyze-product, plan-task, execute-task');
      
      if (config.integrations.claude) {
        console.log(chalk.cyan('\n🤖 Claude Code integration enabled:'));
        console.log('  - .claude folder symlinked to .dad');
        console.log('  - Custom commands available in .claude/commands');
      }
      
      if (config.integrations.cursor) {
        console.log(chalk.magenta('\n📝 Cursor integration enabled:'));
        console.log('  - .cursor folder symlinked to .dad');
        console.log('  - .cursorignore configured for optimal context');
      }
      
    } catch (error) {
      spinner.fail(chalk.red('Installation failed'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update DAD templates to latest version')
  .action(async () => {
    const spinner = ora('Updating DAD templates...').start();
    try {
      await require('../lib/update').update();
      spinner.succeed(chalk.green('DAD updated successfully!'));
    } catch (error) {
      spinner.fail(chalk.red('Update failed'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check DAD installation status')
  .action(async () => {
    const status = await require('../lib/status').check();
    console.log(chalk.blue.bold('\n📊 DAD Status\n'));
    console.log(`DAD Installed: ${status.installed ? chalk.green('✓') : chalk.red('✗')}`);
    if (status.installed) {
      console.log(`Version: ${status.version || 'Unknown'}`);
      console.log(`Claude Integration: ${status.integrations.claude ? chalk.green('✓') : chalk.gray('✗')}`);
      console.log(`Cursor Integration: ${status.integrations.cursor ? chalk.green('✓') : chalk.gray('✗')}`);
    }
  });

program
  .command('tutorial')
  .description('Interactive tutorial for using DAD with AI assistants')
  .action(async () => {
    await require('../lib/tutorial').runTutorial();
  });

program
  .command('commands')
  .description('List all DAD AI commands and their usage')
  .action(async () => {
    await require('../lib/commands-help').showCommands();
  });

// Custom help with better formatting
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name()
});

program.on('--help', () => {
  console.log('');
  console.log(chalk.yellow('Examples:'));
  console.log(chalk.gray('  $ dad init                  # Initialize DAD in current project'));
  console.log(chalk.gray('  $ dad init --claude         # Initialize with Claude Code support'));
  console.log(chalk.gray('  $ dad tutorial              # Learn how to use DAD with AI'));
  console.log(chalk.gray('  $ dad commands              # Show all AI commands'));
  console.log(chalk.gray('  $ dad status                # Check DAD installation'));
  console.log('');
  console.log(chalk.cyan('Learn more:'));
  console.log(chalk.gray('  https://github.com/jessekaff/dad'));
  console.log('');
});

if (!process.argv.slice(2).length) {
  // Show custom welcome message instead of just help
  console.log(chalk.blue.bold('\n🚀 DAD - Development Accelerator Documents\n'));
  console.log(chalk.gray('AI-assisted development for Claude, Cursor, and more.\n'));
  console.log(chalk.yellow('Quick Start:'));
  console.log(chalk.white('  dad init      ') + chalk.gray('Initialize DAD in your project'));
  console.log(chalk.white('  dad tutorial  ') + chalk.gray('Learn how to use DAD with AI'));
  console.log(chalk.white('  dad commands  ') + chalk.gray('Show all AI commands'));
  console.log(chalk.white('  dad --help    ') + chalk.gray('Show all CLI options'));
  console.log('');
} else {
  program.parse(process.argv);
}