import chalk from 'chalk';
import { isConfigSet } from './auth';
import worklogList from './worklog-list';
import worklogAdd from './worklog-add';

const { log } = console;

const worklog = (argv) => {
  if (isConfigSet()) {
    if (!argv.id) {
      log(chalk.red('You\'re missing id of issue. Sample: `happy-jira worklog --id=JIRA-ISSUE-ID`\n'));
    } else if (argv.list) {
      worklogList(argv.id);
    } else if (argv.time) {
      if (typeof argv.time === 'boolean') {
        log(chalk.red('You\'re missing time for worklog. Sample: `happy-jira worklog --id=JIRA-ISSUE-ID --time=3600 --comment="Worklog comment."`\n'));
      } else if (!argv.comment) {
        log(chalk.red('You\'re missing comment for worklog. Sample: `happy-jira worklog --id=JIRA-ISSUE-ID --time=3600 --comment="Worklog comment."`\n'));
      } else {
        worklogAdd(argv.id, argv.time, argv.comment);
      }
    }
  }
};

export default worklog;
