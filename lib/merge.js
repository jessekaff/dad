const fs = require('fs-extra');
const path = require('path');

async function mergeFiles(sourcePath, targetPath, options = {}) {
  const { backup = true, strategy = 'preserve' } = options;
  
  if (!await fs.pathExists(sourcePath)) {
    throw new Error(`Source file does not exist: ${sourcePath}`);
  }
  
  if (await fs.pathExists(targetPath)) {
    if (backup) {
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      await fs.copy(targetPath, backupPath);
    }
    
    if (strategy === 'preserve') {
      // Don't overwrite existing file
      return { merged: false, reason: 'File exists and preserve strategy selected' };
    } else if (strategy === 'overwrite') {
      await fs.copy(sourcePath, targetPath);
      return { merged: true, method: 'overwrite' };
    } else if (strategy === 'merge') {
      // Attempt intelligent merge based on file type
      const ext = path.extname(targetPath);
      
      if (ext === '.json') {
        return await mergeJsonFiles(sourcePath, targetPath);
      } else if (ext === '.md' || ext === '.txt') {
        return await mergeTextFiles(sourcePath, targetPath);
      } else {
        // Default to preserve for unknown types
        return { merged: false, reason: 'Unknown file type for merge' };
      }
    }
  } else {
    // Target doesn't exist, just copy
    await fs.copy(sourcePath, targetPath);
    return { merged: true, method: 'created' };
  }
}

async function mergeJsonFiles(sourcePath, targetPath) {
  try {
    const sourceData = await fs.readJson(sourcePath);
    const targetData = await fs.readJson(targetPath);
    
    // Deep merge objects
    const merged = deepMerge(targetData, sourceData);
    
    await fs.writeJson(targetPath, merged, { spaces: 2 });
    return { merged: true, method: 'json-merge' };
  } catch (error) {
    return { merged: false, reason: `JSON merge failed: ${error.message}` };
  }
}

async function mergeTextFiles(sourcePath, targetPath) {
  const sourceContent = await fs.readFile(sourcePath, 'utf-8');
  const targetContent = await fs.readFile(targetPath, 'utf-8');
  
  // Simple append strategy for text files
  // Check if source content already exists in target
  if (targetContent.includes(sourceContent)) {
    return { merged: false, reason: 'Content already exists' };
  }
  
  // Append with separator
  const merged = targetContent + '\n\n<!-- DAD Merged Content -->\n\n' + sourceContent;
  await fs.writeFile(targetPath, merged);
  
  return { merged: true, method: 'text-append' };
}

function deepMerge(target, source) {
  const output = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(target[key])) {
        output[key] = deepMerge(target[key], source[key]);
      } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        // Merge arrays by concatenating and removing duplicates
        output[key] = [...new Set([...target[key], ...source[key]])];
      } else {
        // Source value takes precedence
        output[key] = source[key];
      }
    }
  }
  
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

module.exports = {
  mergeFiles,
  mergeJsonFiles,
  mergeTextFiles,
  deepMerge
};