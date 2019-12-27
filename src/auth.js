import Configstore from 'configstore';

const packageJson = require('../package.json');

const { log } = console;
const config = new Configstore(packageJson.name);
const subdomain = config.get('subdomain');
const username = config.get('username');
const token = config.get('token');

const isConfigSet = () => {
  let isSet = true;

  if (!subdomain && !username && !token) {
    log('No config values found. Use `happy-jira config` to set them.');
    isSet = false;
  }

  return isSet;
};

export {
  isConfigSet, subdomain, username, token,
};
