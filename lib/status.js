const fs = require('fs-extra');
const path = require('path');
const { loadConfig } = require('./config');

async function check(projectDir = process.cwd()) {
  const dadPath = path.join(projectDir, '.dad');
  const installed = await fs.pathExists(dadPath);
  
  if (!installed) {
    return {
      installed: false,
      integrations: {
        claude: false,
        cursor: false
      }
    };
  }
  
  const config = await loadConfig(projectDir);
  const claudePath = path.join(projectDir, '.claude');
  const cursorPath = path.join(projectDir, '.cursor');
  
  return {
    installed: true,
    version: config?.version,
    installedAt: config?.installedAt,
    integrations: {
      claude: await fs.pathExists(claudePath),
      cursor: await fs.pathExists(cursorPath)
    },
    config
  };
}

module.exports = { check };