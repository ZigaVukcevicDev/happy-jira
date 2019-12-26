import inquirer from 'inquirer';
import Configstore from 'configstore';
const packageJson = require('../package.json');

const validateInput = value => {
  if (!value.length) {
    return 'Value can\'t be empty.';
  } else {
    return true;
  }
};

const config = (argv) => {
  console.log('Setting config');

  inquirer
  .prompt([
    {
      type: 'username',
      message: 'Enter username:',
      name: 'username',
      validate: validateInput
    },
    {
      type: 'password',
      message: 'Enter token:',
      name: 'token',
      mask: '*',
      validate: validateInput
    }
  ])
  .then(answers => {
    console.log(packageJson.name);
    const config = new Configstore(packageJson.name);

    config.set('username', answers.username);
    config.set('token', answers.token);

    console.log(config.get('username'));
    console.log(config.get('token'));
  });
}

export default config;
