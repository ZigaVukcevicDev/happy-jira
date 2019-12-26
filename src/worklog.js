import fetch from 'node-fetch';
import { encode } from "base-64";
import chalk from 'chalk';
import moment from 'moment';
import ora from 'ora';
import { auth, username, token } from './auth';

const formatTime = (seconds) => {
  const hours = moment.utc(seconds * 1000).format('HH');
  const minutes = moment.utc(seconds * 1000).format('mm');

  return `${hours}h ${minutes}m`;
}

const worklog = (argv) => {
  if (auth()) {
    const spinner = ora('Fetching...').start();

    fetch('https://be-codified.atlassian.net/rest/api/3/issue/' + argv.id + '/worklog', {
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + encode(username + ':' + token),
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.status === 200) {
        console.log(chalk.yellow(`\n>>> Getting worklog of issue with id ${argv.id}`))
        return res.json();
      } else if (res.status === 401) {
        spinner.stop();
        throw chalk.red('Auth failed.');
      } else if (res.status === 404) {
        spinner.stop();
        throw chalk.red('Issue not found.');
      }
    })
    .then(json => {
      spinner.stop();
      let timeTotal = 0;

      json.worklogs.forEach(worklog => {
        // console.log(worklog);
        console.log(
          moment(worklog.created).format("dddd MM-DD-YYYY"),
          worklog.author.displayName,
          formatTime(worklog.timeSpentSeconds)
        );

        timeTotal = timeTotal + worklog.timeSpentSeconds;
      });

      console.log('Total time:', formatTime(timeTotal));
    })
    .catch(error => console.log(error));
  };
}

export default worklog;
