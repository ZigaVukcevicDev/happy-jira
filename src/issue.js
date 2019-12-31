import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import ora from 'ora';
import moment from 'moment';
import secondsToTime from './helpers/seconds-to-time';
import {
  isConfigSet, subdomain, username, token,
} from './auth';

const { log } = console;

const issue = (argv) => {
  if (isConfigSet()) {
    if (!argv.id) {
      log(chalk.red('You\'re missing id of issue. Sample: `happy-jira issue --id=JIRA-ISSUE-ID`\n'));
    } else {
      const spinner = ora('Fetching...').start();

      fetch(`https://${subdomain}/rest/api/3/issue/${argv.id}`, {
        method: 'get',
        headers: {
          'Authorization': `Basic ${encode(`${username}:${token}`)}`, // eslint-disable-line quote-props
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          spinner.stop();

          if (res.status === 401) {
            throw chalk.red('Authentication failed, check your config.');
          } else if (res.status === 404) {
            throw chalk.red(`Issue ${argv.id} not found.\n`);
          } else if (res.status === 200) {
            return res.json();
          } else {
            return false;
          }
        })
        .then((json) => {
          const { fields } = json;

          log('ID:             ', argv.id);
          log('Project name:   ', fields.project.name);
          log('Created:        ', moment(fields.created).format('dddd MM-DD-YYYY'));
          log('Assignee:       ', fields.assignee.displayName);
          log('Summary:        ', fields.summary);
          log('Status:         ', fields.status.name);
          log('Total worklog:  ', secondsToTime(fields.timespent));
        })
        .catch((error) => {
          spinner.stop();

          if (error.code === 'ENOTFOUND') {
            log(chalk.red(`Subdomain ${subdomain} has not been found. Are you connected to Internet?\n`));
          } else {
            log(error);
          }
        });
    }
  }
};

export default issue;
