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

const worklog = (argv) => {
  if (isConfigSet()) {
    const spinner = ora('Fetching...').start();

    fetch(`https://${subdomain}/rest/api/3/issue/${argv.id}/worklog`, {
      method: 'get',
      headers: {
        'Authorization': `Basic ${encode(`${username}:${token}`)}`, // eslint-disable-line quote-props
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 401) {
          spinner.stop();
          throw chalk.red('Authentication failed, check your config.');
        } else if (res.status === 404) {
          spinner.stop();
          throw chalk.red('Issue not found.');
        } else if (res.status === 200) {
          log(chalk.yellow(`\nGetting worklog of issue with id ${argv.id}`));
          return res.json();
        } else {
          return false;
        }
      })
      .then((json) => {
        spinner.stop();
        let timeTotal = 0;

        json.worklogs.forEach((item) => {
          log(
            moment(item.created).format('dddd MM-DD-YYYY'),
            item.author.displayName,
            formatTimeHHmm(item.timeSpentSeconds),
          );

          timeTotal += item.timeSpentSeconds;
        });

        log('Total time:', formatTimeHHmm(timeTotal));
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

export default worklog;
