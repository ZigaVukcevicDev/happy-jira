import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import ora from 'ora';
import { subdomain, username, token } from './auth';

const { log } = console;

const worklogAdd = (id, time, comment) => {
  const spinner = ora('Posting...').start();

  fetch(`https://${subdomain}/rest/api/3/issue/${id}/worklog`, {
    method: 'post',
    headers: {
      'Authorization': `Basic ${encode(`${username}:${token}`)}`, // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeSpentSeconds: time,
      comment: {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: comment,
                type: 'text',
              },
            ],
          },
        ],
      },
      started: new Date().toISOString,
    }),
  })
    .then((res) => {
      spinner.stop();

      if (res.status === 401) {
        throw chalk.red('Authentication failed, check your config.');
      } else if (res.status === 404) {
        throw chalk.red(`Issue ${id} not found.\n`);
      } else if (res.status === 201) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((json) => {
      log(chalk.green(`Added worklog with time ${json.timeSpentSeconds} and comment "${json.comment.content[0].content[0].text}".\n`));
    })
    .catch((error) => {
      spinner.stop();

      if (error.code === 'ENOTFOUND') {
        log(chalk.red(`Subdomain ${subdomain} has not been found. Are you connected to Internet?\n`));
      } else {
        log(error);
      }
    });
};

export default worklogAdd;
