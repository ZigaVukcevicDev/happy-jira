import fetch from 'node-fetch';
import { encode } from "base-64";
import chalk from 'chalk';
import { auth, username, token } from './auth';

const issue = (argv) => {
  console.log(chalk.yellow(`>>> Getting issue with id ${argv.id}`))

  fetch('https://be-codified.atlassian.net/rest/api/3/issue/' + argv.id, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + encode(username + ':' + token),
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 404) {
      throw chalk.red('Issue not found.');
    }
  })
  .then(json => {
    // console.log(json);
    console.log('Project name:', json.fields.project.name);
  })
  .catch(error => console.log(error));
}

export default issue;
