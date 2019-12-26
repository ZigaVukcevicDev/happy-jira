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
    // Issue
    .command(
      '<issue> [id]',
      'Showing issue details.\n Usage sample: `happy-jira issue --id JIRA-ISSUE-ID`',
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
      '<worklog> [id]',
      'Showing worklog of issue.\n Usage sample: `happy-jira worklog --id JIRA-ISSUE-ID`',
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
   // Config
   .command(
    '<config>',
    'Setting username and token for Jira authentication.\n Usage sample: `happy-jira config`',
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
    .help()
    .argv

 }
