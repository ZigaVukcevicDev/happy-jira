import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import ora from 'ora';
import moment from 'moment';
import formatTimeHHmm from './helpers/format-time-hh-mm';
import {
  isConfigSet, subdomain, username, token,
} from './auth';

const { log } = console;

const issue = (argv) => {
  if (isConfigSet()) {
    const spinner = ora('Fetching...').start();
    // log(chalk.yellow(`\nGetting issue with id ${argv.id}`));

    fetch(`https://${subdomain}/rest/api/3/issue/${argv.id}`, {
      method: 'get',
      headers: {
        'Authorization': `Basic ${encode(`${username}:${token}`)}`, // eslint-disable-line quote-props
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 404) {
          throw chalk.red('Issue not found.');
        } else if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      })
      .then((json) => {
        spinner.stop();

        const { fields } = json;

        log('ID:          ', argv.id);
        log('Project name:', fields.project.name);
        log('Created:     ', moment(fields.created).format('dddd MM-DD-YYYY'));
        log('Assignee:    ', fields.assignee.displayName);
        log('Summary:     ', fields.summary);
        log('Status:      ', fields.status.name);
        log('Total time:  ', formatTimeHHmm(fields.timespent));
      })
      .catch((error) => {
        if (error.code === 'ENOTFOUND') {
          spinner.stop();
          log(chalk.red(`Subdomain ${subdomain} has not been found. Are you connected to Internet?\n`));
        } else {
          spinner.stop();
          log(error);
        }
      });
  }
};

export default issue;
