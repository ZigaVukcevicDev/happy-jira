import yargs from 'yargs';
import config from './config';
import logo from './logo';
import issue from './issue';
import worklog from './worklog';

const commands = () => {
  logo();

  yargs // eslint-disable-line no-unused-expressions
    .scriptName('happy-jira')
    .usage('$0 <command> [options]')
    // Config
    .command(
      'config [reset]',
      'Setting config data (subdomain, username and token) for Jira authentication.\nSample: `happy-jira config`\n\nResetting config data.\nSample: `happy-jira config --reset`\n',
      (params) => {
        params.positional('config', {
          type: 'string',
          default: 'None',
          describe: 'Set config',
        });
      }, (argv) => {
        if (argv.config) {
          config(argv);
        }
      },
    )
    // Issue
    .command(
      'issue [id]',
      'Showing issue details.\nSample: `happy-jira issue --id=JIRA-ISSUE-ID`\n',
      (params) => {
        params.positional('issue', {
          type: 'string',
          default: 'None',
          describe: 'Get issue',
        });
      }, (argv) => {
        if (argv.issue) {
          issue(argv);
        }
      },
    )
    // Worklog
    .command(
      'worklog [id]',
      'Showing worklog of issue.\nSample: `happy-jira worklog --id=JIRA-ISSUE-ID`',
      (params) => {
        params.positional('worklog', {
          type: 'string',
          default: 'None',
          describe: 'Get worklog',
        });
      }, (argv) => {
        if (argv.worklog) {
          worklog(argv);
        }
      },
    )
    // Help
    .help()
    .argv;
};

export { commands }; // eslint-disable-line import/prefer-default-export
