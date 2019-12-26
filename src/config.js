import inquirer from 'inquirer';
import Configstore from 'configstore';
const packageJson = require('../package.json');

const config = (argv) => {
  if (argv.reset) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'Do you want to reset credentials?',
          name: 'reset'
        },
      ])
      .then(answers => {
        if (answers.reset) {
          console.log('Reseting credentials.');
          const config = new Configstore(packageJson.name);
          config.set('username', null);
          config.set('token', null);
        } else {
          console.log('Aborting reseting credentials.');
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter username:',
          name: 'username',
          validate: (value) => !value.length ? 'Username can\'t be empty.' : true
        },
        {
          type: 'password',
          message: 'Enter token:',
          name: 'token',
          mask: '*',
          validate: (value) => !value.length ? 'Token can\'t be empty.' : true
        }
      ])
      .then(answers => {
        const config = new Configstore(packageJson.name);
        config.set('username', answers.username);
        config.set('token', answers.token);

        console.log('Credentials successfully set up.');
      });
  }
}

export default config;
