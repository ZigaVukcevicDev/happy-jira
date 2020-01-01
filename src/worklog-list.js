import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import ora from 'ora';
import moment from 'moment';
import Table from 'cli-table3';
import secondsToTime from './helpers/seconds-to-time';
import { subdomain, username, token } from './auth';

const { log } = console;

const worklogList = (id) => {
  const spinner = ora('Fetching...').start();

  fetch(`https://${subdomain}/rest/api/3/issue/${id}/worklog`, {
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
        throw chalk.red(`Issue ${id} not found.\n`);
      } else if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((json) => {
      const table = new Table({
        head: [
          chalk.white('Day'),
          chalk.white('Date'),
          chalk.white('Author'),
          chalk.white('Time'),
          chalk.white('Comment'),
        ],
      });

      let timeTotal = 0;

      json.worklogs.forEach((item) => {
        table.push(
          [
            moment(item.created).format('dddd'),
            moment(item.created).format('MM-DD-YYYY'),
            item.author.displayName,
            secondsToTime(item.timeSpentSeconds),
            item.comment.content[0].content[0].text,
          ],
        );

        timeTotal += item.timeSpentSeconds;
      });

      log(table.toString());
      log(`Total time: ${secondsToTime(timeTotal)}\n`);
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

export default worklogList;
