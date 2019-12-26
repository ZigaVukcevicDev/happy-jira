import yargs from 'yargs';
import config from './config'
import logo from './logo';
import issue from './issue';
import worklog from './worklog';

export function cli(args) {
  logo();

  yargs
    .scriptName("happy-jira")
    .usage('$0 <command> [options]')
    // Config
    .command(
      'config [--reset]',
      'Setting username and token for Jira authentication.\nSample: `happy-jira config`\n\nReseting username and token.\nSample: `happy-jira config --reset`\n',
      (yargs) => {
        yargs.positional('config', {
          type: 'string',
          default: 'None',
          describe: 'Set config'
        })
      }, (argv) => {
        if (argv.config) {
          config(argv);
        }
      })
    // Issue
    .command(
      'issue --id',
      'Showing issue details.\nSample: `happy-jira issue --id JIRA-ISSUE-ID`\n',
      (yargs) => {
        yargs.positional('issue', {
          type: 'string',
          default: 'None',
          describe: 'Get issue'
        })
    }, (argv) => {
      if (argv.issue) {
        issue(argv);
      }
    })
    // Worklog
    .command(
      'worklog --id',
      'Showing worklog of issue.\nSample: `happy-jira worklog --id JIRA-ISSUE-ID`',
      (yargs) => {
        yargs.positional('worklog', {
          type: 'string',
          default: 'None',
          describe: 'Get worklog'
        })
    }, (argv) => {
      if (argv.worklog) {
        worklog(argv);
      }
    })
    .help()
    .argv

 }
