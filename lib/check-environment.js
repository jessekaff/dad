const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function checkEnvironment(targetDir = process.cwd()) {
  const checks = {
    isGitRepo: false,
    hasPackageJson: false,
    hasDadInstalled: false,
    isValidProject: false
  };
  
  // Check if it's a git repository
  const gitPath = path.join(targetDir, '.git');
  checks.isGitRepo = await fs.pathExists(gitPath);
  
  // Check for package.json
  const packagePath = path.join(targetDir, 'package.json');
  checks.hasPackageJson = await fs.pathExists(packagePath);
  
  // Check if DAD is already installed
  const dadPath = path.join(targetDir, '.dad');
  checks.hasDadInstalled = await fs.pathExists(dadPath);
  
  // Determine if it's a valid project
  checks.isValidProject = checks.isGitRepo || checks.hasPackageJson;
  
  return checks;
}

async function validateEnvironment(options = {}) {
  const { requireGit = true, requirePackageJson = false } = options;
  const env = await checkEnvironment();
  const errors = [];
  
  if (requireGit && !env.isGitRepo) {
    errors.push('Not a git repository. Run "git init" first or navigate to a git repository.');
  }
  
  if (requirePackageJson && !env.hasPackageJson) {
    errors.push('No package.json found. Run "npm init" first or navigate to a Node.js project.');
  }
  
  if (!env.isValidProject) {
    errors.push('This doesn\'t appear to be a valid project directory.');
  }
  
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ Cannot initialize DAD here:\n'));
    errors.forEach(err => console.log(chalk.yellow(`  • ${err}`)));
    console.log(chalk.gray('\nDAD should be initialized in the root of your project repository.\n'));
    return false;
  }
  
  if (env.hasDadInstalled) {
    console.log(chalk.yellow('\n⚠️  DAD is already installed in this project.'));
    const { confirm } = await require('inquirer').prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to reinstall/update DAD?',
      default: false
    }]);
    
    if (!confirm) {
      console.log(chalk.gray('Installation cancelled.'));
      return false;
    }
  }
  
  return true;
}

module.exports = {
  checkEnvironment,
  validateEnvironment
};