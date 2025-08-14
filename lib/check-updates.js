const https = require('https');
const chalk = require('chalk');
const semver = require('semver');
const { version } = require('../package.json');

async function checkForUpdates() {
  return new Promise((resolve) => {
    https.get('https://registry.npmjs.org/dad/latest', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const latestVersion = JSON.parse(data).version;
          
          if (semver.gt(latestVersion, version)) {
            console.log(chalk.yellow.bold('\n📦 Update available!'));
            console.log(chalk.gray(`  Current: ${version}`));
            console.log(chalk.green(`  Latest:  ${latestVersion}`));
            console.log(chalk.cyan('\n  Update with:'));
            console.log(chalk.white('    npm update -g dad'));
            console.log(chalk.gray('    or'));
            console.log(chalk.white('    npx dad@latest init\n'));
          }
        } catch (err) {
          // Silently fail - don't interrupt user flow
        }
        resolve();
      });
    }).on('error', () => {
      // Silently fail - don't interrupt user flow  
      resolve();
    });
    
    // Timeout after 2 seconds to not slow down CLI
    setTimeout(resolve, 2000);
  });
}

module.exports = { checkForUpdates };