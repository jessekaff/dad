#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function preparePublish() {
  console.log(chalk.blue('Preparing package for publication...'));
  
  const rootDir = path.join(__dirname, '..');
  
  // Ensure all required directories exist
  const requiredDirs = ['.dad', 'agents', 'bin', 'lib', 'scripts'];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(rootDir, dir);
    if (!await fs.pathExists(dirPath)) {
      console.log(chalk.red(`Missing required directory: ${dir}`));
      process.exit(1);
    }
  }
  
  // Clean up any .DS_Store files
  const removeDsStore = async (dir) => {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = await fs.stat(itemPath);
      
      if (item === '.DS_Store') {
        await fs.remove(itemPath);
        console.log(chalk.gray(`Removed: ${itemPath}`));
      } else if (stat.isDirectory()) {
        await removeDsStore(itemPath);
      }
    }
  };
  
  await removeDsStore(rootDir);
  
  // Verify package.json
  const pkg = await fs.readJson(path.join(rootDir, 'package.json'));
  
  if (!pkg.name || !pkg.version) {
    console.log(chalk.red('Package.json missing required fields'));
    process.exit(1);
  }
  
  console.log(chalk.green('✓ Package ready for publication'));
  console.log(chalk.gray(`  Name: ${pkg.name}`));
  console.log(chalk.gray(`  Version: ${pkg.version}`));
}

preparePublish().catch(error => {
  console.error(chalk.red('Prepare publish failed:'), error);
  process.exit(1);
});