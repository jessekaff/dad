#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

module.exports = {
  install: require('./lib/install'),
  merge: require('./lib/merge'),
  config: require('./lib/config')
};