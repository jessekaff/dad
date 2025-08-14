const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function install(config) {
  const targetDir = process.cwd();
  const sourceDir = path.join(__dirname, '..');
  
  console.log(chalk.gray(`Installing DAD to: ${targetDir}`));
  
  // Copy .dad folder
  const dadSource = path.join(sourceDir, '.dad');
  const dadTarget = path.join(targetDir, '.dad');
  
  if (await fs.pathExists(dadTarget)) {
    console.log(chalk.yellow('⚠️  .dad folder already exists. Merging contents...'));
    await mergeDadFolder(dadSource, dadTarget);
  } else {
    await fs.copy(dadSource, dadTarget, {
      filter: (src) => !src.includes('.DS_Store')
    });
    console.log(chalk.green('✓ Created .dad folder'));
  }
  
  // Handle Claude integration
  if (config.integrations.claude) {
    await setupClaudeIntegration(sourceDir, targetDir);
  }
  
  // Handle Cursor integration  
  if (config.integrations.cursor) {
    await setupCursorIntegration(sourceDir, targetDir);
  }
  
  // Update .gitignore if requested
  if (config.gitignore) {
    await updateGitignore(targetDir);
  }
  
  // Save config
  await saveConfig(targetDir, config);
}

async function setupClaudeIntegration(sourceDir, targetDir) {
  const claudeSource = path.join(sourceDir, 'agents', '.claude');
  const claudeTarget = path.join(targetDir, '.claude');
  
  if (await fs.pathExists(claudeTarget)) {
    console.log(chalk.yellow('⚠️  .claude folder already exists. Merging DAD commands...'));
    await mergeClaudeIntegration(claudeSource, claudeTarget);
  } else {
    await fs.ensureDir(claudeTarget);
    
    // Copy base Claude settings (only if they don't exist)
    const settingsSource = path.join(claudeSource, 'settings.local.json');
    const settingsTarget = path.join(claudeTarget, 'settings.local.json');
    if (await fs.pathExists(settingsSource) && !await fs.pathExists(settingsTarget)) {
      await fs.copy(settingsSource, settingsTarget);
    }
    
    // Copy DAD-specific folders
    const foldersToAdd = ['agents', 'commands'];
    
    for (const folder of foldersToAdd) {
      const sourcePath = path.join(claudeSource, folder);
      const targetPath = path.join(claudeTarget, folder);
      
      if (await fs.pathExists(sourcePath)) {
        if (!await fs.pathExists(targetPath)) {
          await fs.copy(sourcePath, targetPath);
        } else {
          // Merge DAD files into existing folder
          await mergeDadFolder(sourcePath, targetPath);
        }
      }
    }
    
    console.log(chalk.green('✓ Claude Code integration configured'));
  }
}

async function setupCursorIntegration(sourceDir, targetDir) {
  const cursorSource = path.join(sourceDir, 'agents', '.cursor');
  const cursorTarget = path.join(targetDir, '.cursor');
  
  await fs.ensureDir(cursorTarget);
  
  // Handle .cursorignore carefully
  const ignoreSource = path.join(cursorSource, '.cursorignore');
  const ignoreTarget = path.join(cursorTarget, '.cursorignore');
  
  if (await fs.pathExists(ignoreSource)) {
    if (await fs.pathExists(ignoreTarget)) {
      console.log(chalk.yellow('⚠️  .cursorignore exists. Creating backup and preserving existing...'));
      await fs.copy(ignoreTarget, `${ignoreTarget}.backup`);
      console.log(chalk.gray('  Preserving existing: .cursorignore'));
    } else {
      await fs.copy(ignoreSource, ignoreTarget);
    }
  }
  
  // Copy cursor rules folder
  const rulesSource = path.join(cursorSource, 'rules');
  const rulesTarget = path.join(cursorTarget, 'rules');
  
  if (await fs.pathExists(rulesSource)) {
    if (!await fs.pathExists(rulesTarget)) {
      await fs.copy(rulesSource, rulesTarget);
    } else {
      // Merge DAD rules into existing rules folder
      await mergeDadFolder(rulesSource, rulesTarget);
    }
  }
  
  console.log(chalk.green('✓ Cursor integration configured'));
}

async function mergeDadFolder(source, target) {
  const items = await fs.readdir(source);
  
  for (const item of items) {
    if (item === '.DS_Store') continue;
    
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    const stat = await fs.stat(sourcePath);
    
    if (stat.isDirectory()) {
      await fs.ensureDir(targetPath);
      await mergeDadFolder(sourcePath, targetPath);
    } else if (!await fs.pathExists(targetPath)) {
      // Only copy if file doesn't exist - never overwrite user customizations
      await fs.copy(sourcePath, targetPath);
    } else {
      // File exists - always preserve user's version
      const relativePath = path.relative(target, targetPath);
      console.log(chalk.gray(`  Preserving existing: ${relativePath}`));
    }
  }
}

async function mergeClaudeIntegration(source, target) {
  // Merge settings if both exist
  await mergeClaudeSettings(source, target);
  
  // Merge DAD-specific folders
  const foldersToMerge = ['agents', 'commands'];
  
  for (const folder of foldersToMerge) {
    const sourcePath = path.join(source, folder);
    const targetPath = path.join(target, folder);
    
    if (await fs.pathExists(sourcePath)) {
      if (!await fs.pathExists(targetPath)) {
        await fs.copy(sourcePath, targetPath);
      } else {
        // Merge DAD files into existing folder
        await mergeDadFolder(sourcePath, targetPath);
      }
    }
  }
  
  console.log(chalk.green('✓ Merged Claude integration'));
}

async function mergeClaudeSettings(source, target) {
  const settingsSource = path.join(source, 'settings.local.json');
  const settingsTarget = path.join(target, 'settings.local.json');
  
  if (await fs.pathExists(settingsSource) && await fs.pathExists(settingsTarget)) {
    // Merge settings
    const sourceSettings = await fs.readJson(settingsSource);
    const targetSettings = await fs.readJson(settingsTarget);
    
    // Merge permissions arrays
    if (sourceSettings.permissions && targetSettings.permissions) {
      targetSettings.permissions.allow = [
        ...new Set([
          ...(targetSettings.permissions.allow || []),
          ...(sourceSettings.permissions.allow || [])
        ])
      ];
    }
    
    await fs.writeJson(settingsTarget, targetSettings, { spaces: 2 });
    console.log(chalk.green('✓ Merged Claude settings'));
  } else if (await fs.pathExists(settingsSource) && !await fs.pathExists(settingsTarget)) {
    await fs.copy(settingsSource, settingsTarget);
  }
}

async function updateGitignore(targetDir) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  const entries = [
    '\n# DAD (Development Accelerator Documents)',
    '.dad/.config.json',
    '.dad/.DS_Store',
    '.dad/**/.DS_Store',
    '.dad/tasks/*',
    '!.dad/tasks/README.md',
    '.dad/context/',
    '\n# AI Assistant Integration', 
    '.claude/settings.local.json',
    '.cursor/.cursorignore.backup'
  ];
  
  let content = '';
  if (await fs.pathExists(gitignorePath)) {
    content = await fs.readFile(gitignorePath, 'utf-8');
  }
  
  // Check if DAD entries already exist
  if (!content.includes('# DAD (Development Accelerator Documents)')) {
    content += '\n' + entries.join('\n') + '\n';
    await fs.writeFile(gitignorePath, content);
    console.log(chalk.green('✓ Updated .gitignore'));
  }
}

async function saveConfig(targetDir, config) {
  const configPath = path.join(targetDir, '.dad', '.config.json');
  await fs.writeJson(configPath, {
    version: require('../package.json').version,
    installedAt: new Date().toISOString(),
    integrations: config.integrations
  }, { spaces: 2 });
}

module.exports = { install };