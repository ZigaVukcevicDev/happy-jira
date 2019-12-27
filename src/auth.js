import Configstore from 'configstore';
import chalk from 'chalk';

const packageJson = require('../package.json');

const { log } = console;
const config = new Configstore(packageJson.name);
const subdomain = config.get('subdomain');
const username = config.get('username');
const token = config.get('token');

const isConfigSet = () => {
  let isSet = true;

  if (!subdomain && !username && !token) {
    log(chalk.red('No config data found. Use `happy-jira config` to set it up.\n'));
    isSet = false;
  }

  return isSet;
};

export {
  isConfigSet, subdomain, username, token,
};
