#!/usr/bin/env node

require = require('esm')(module); // eslint-disable-line no-global-assign
require('../src/commands').commands(process.argv);
