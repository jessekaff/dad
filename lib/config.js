const fs = require('fs-extra');
const path = require('path');

async function loadConfig(projectDir = process.cwd()) {
  const configPath = path.join(projectDir, '.dad', '.config.json');
  
  if (await fs.pathExists(configPath)) {
    return await fs.readJson(configPath);
  }
  
  return null;
}

async function saveConfig(config, projectDir = process.cwd()) {
  const configPath = path.join(projectDir, '.dad', '.config.json');
  await fs.ensureDir(path.dirname(configPath));
  await fs.writeJson(configPath, config, { spaces: 2 });
}

async function updateConfig(updates, projectDir = process.cwd()) {
  const current = await loadConfig(projectDir) || {};
  const updated = { ...current, ...updates };
  await saveConfig(updated, projectDir);
  return updated;
}

function getDefaultConfig() {
  return {
    version: require('../package.json').version,
    installedAt: new Date().toISOString(),
    integrations: {
      claude: false,
      cursor: false
    },
    preferences: {
      autoUpdate: true,
      telemetry: false
    }
  };
}

module.exports = {
  loadConfig,
  saveConfig,
  updateConfig,
  getDefaultConfig
};