const fs = require('fs-extra');
const path = require('path');
const { loadConfig, updateConfig } = require('./config');
const { mergeFiles } = require('./merge');
const chalk = require('chalk');

async function update(projectDir = process.cwd()) {
  const config = await loadConfig(projectDir);
  
  if (!config) {
    throw new Error('DAD is not installed in this project. Run "dad init" first.');
  }
  
  const sourceDir = path.join(__dirname, '..');
  const dadSource = path.join(sourceDir, '.dad');
  const dadTarget = path.join(projectDir, '.dad');
  
  console.log(chalk.gray('Updating DAD templates...'));
  
  // Update core DAD files
  await updateDadFiles(dadSource, dadTarget);
  
  // Update integrations if enabled
  if (config.integrations?.claude) {
    await updateClaudeIntegration(sourceDir, projectDir);
  }
  
  if (config.integrations?.cursor) {
    await updateCursorIntegration(sourceDir, projectDir);
  }
  
  // Update version in config
  await updateConfig({
    version: require('../package.json').version,
    lastUpdated: new Date().toISOString()
  }, projectDir);
  
  console.log(chalk.green('✓ DAD updated successfully'));
}

async function updateDadFiles(source, target, subPath = '') {
  const sourcePath = path.join(source, subPath);
  const targetPath = path.join(target, subPath);
  
  const items = await fs.readdir(sourcePath);
  
  for (const item of items) {
    if (item === '.DS_Store' || item === '.config.json') continue;
    
    const itemSourcePath = path.join(sourcePath, item);
    const itemTargetPath = path.join(targetPath, item);
    const stat = await fs.stat(itemSourcePath);
    
    if (stat.isDirectory()) {
      await fs.ensureDir(itemTargetPath);
      await updateDadFiles(source, target, path.join(subPath, item));
    } else {
      // Use merge strategy for certain files
      const ext = path.extname(item);
      const strategy = ext === '.md' ? 'preserve' : 'merge';
      
      const result = await mergeFiles(itemSourcePath, itemTargetPath, {
        strategy,
        backup: true
      });
      
      if (result.merged) {
        console.log(chalk.gray(`  Updated: ${subPath}/${item}`));
      }
    }
  }
}

async function updateClaudeIntegration(sourceDir, projectDir) {
  const claudeSource = path.join(sourceDir, 'agents', '.claude');
  const claudeTarget = path.join(projectDir, '.claude');
  
  if (!await fs.pathExists(claudeTarget)) {
    return;
  }
  
  // Update Claude commands and agents
  const foldersToUpdate = ['agents', 'commands'];
  
  for (const folder of foldersToUpdate) {
    const sourcePath = path.join(claudeSource, folder);
    const targetPath = path.join(claudeTarget, folder);
    
    if (await fs.pathExists(sourcePath)) {
      await fs.ensureDir(targetPath);
      await updateDadFiles(claudeSource, claudeTarget, folder);
    }
  }
  
  console.log(chalk.green('✓ Claude integration updated'));
}

async function updateCursorIntegration(sourceDir, projectDir) {
  const cursorSource = path.join(sourceDir, 'agents', '.cursor');
  const cursorTarget = path.join(projectDir, '.cursor');
  
  if (!await fs.pathExists(cursorTarget)) {
    return;
  }
  
  // Update .cursorignore with merge strategy
  const ignoreSource = path.join(cursorSource, '.cursorignore');
  const ignoreTarget = path.join(cursorTarget, '.cursorignore');
  
  if (await fs.pathExists(ignoreSource)) {
    await mergeFiles(ignoreSource, ignoreTarget, {
      strategy: 'preserve',
      backup: true
    });
  }
  
  console.log(chalk.green('✓ Cursor integration updated'));
}

module.exports = { update };