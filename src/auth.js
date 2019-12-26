import Configstore from 'configstore';
const packageJson = require('../package.json');

const config = new Configstore(packageJson.name);
const username = config.get('username');
const token = config.get('token');

const auth = () => {
  console.log('Checking credentials... ');

  if (!username && !token) {
    console.log('No credentials found.');
    return false;
  } else {
    console.log('Credentials found.');
    return true;
  }
}

export { auth, username, token };
