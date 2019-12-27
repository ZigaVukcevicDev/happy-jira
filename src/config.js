import inquirer from 'inquirer';
import Configstore from 'configstore';
import chalk from 'chalk';

const packageJson = require('../package.json');

const { log } = console;

const config = (argv) => {
  if (argv.reset) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'Do you want to reset config?',
          name: 'reset',
        },
      ])
      .then((answers) => {
        if (answers.reset) {
          log(chalk.green('Config has been resetted.'));

          const store = new Configstore(packageJson.name);

          store.set('subdomain', null);
          store.set('username', null);
          store.set('token', null);
        } else {
          log(chalk.red('Resetting config canceled.'));
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter subdomain (e.g. your-space.atlassian.net):',
          name: 'subdomain',
          validate: (value) => (!value.length ? 'Subdomain can\'t be empty.' : true),
        },
        {
          type: 'input',
          message: 'Enter username:',
          name: 'username',
          validate: (value) => (!value.length ? 'Username can\'t be empty.' : true),
        },
        {
          type: 'password',
          message: 'Enter token:',
          name: 'token',
          mask: '*',
          validate: (value) => (!value.length ? 'Token can\'t be empty.' : true),
        },
      ])
      .then((answers) => {
        const store = new Configstore(packageJson.name);

        store.set('subdomain', answers.subdomain);
        store.set('username', answers.username);
        store.set('token', answers.token);

        log(chalk.green('\nConfig has been successfully set.\n'));
      });
  }
};

export default config;
