import yargs from 'yargs';
import config from './config';
import logo from './logo';
import issue from './issue';
import worklog from './worklog';

const { log } = console;

const commands = () => {
  logo();

  yargs // eslint-disable-line no-unused-expressions
    .scriptName('happy-jira')
    .usage('$0 <command> [options]')
    // Default
    .command('$0', 'default command', () => {}, () => {
      log('Run `happy-jira --help` to see options.\n');
    })
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
      'worklog [id] [list] [time] [comment]',
      'Showing worklog of issue\nSample: `happy-jira worklog --id=JIRA-ISSUE-ID --list`\n\nAdding worklog\nSample: `happy-jira worklog --id=JIRA-ISSUE-ID --time=3600 --comment="Worklog comment."`\n',
      (params) => {
        params.positional('worklog', {
          type: 'string',
          default: 'None',
          describe: 'Get or add worklog',
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
