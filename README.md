# Happy Jira

CLI tool for communicating with JIRA API.

### Installling

`npm i @be-codified/happy-jira -g`

Set up config

`happy-jira config`

Enter subdomain, username and token. See [how set token](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) in Jira.

### Usage

```
 _   _                               _ _
| | | | __ _ _ __  _ __  _   _      | (_)_ __ __ _
| |_| |/ _` | '_ \| '_ \| | | |  _  | | | '__/ _` |
|  _  | (_| | |_) | |_) | |_| | | |_| | | | | (_| |
|_| |_|\__,_| .__/| .__/ \__, |  \___/|_|_|  \__,_|
            |_|   |_|    |___/
```

#### Commands

| Command | Description |
|------------------------------|------------------------------------------------|
| `happy-jira config`<br /><br />`happy-jira config --reset`| Setting config data (subdomain, username and token) for Jira authentication.<br />Sample: `happy-jira config`<br /><br />Resetting config data.<br />Sample: `happy-jira config --reset` |
| `happy-jira issue --id=id`      | Showing issue details.<br />Sample: `happy-jira issue --id=JIRA-ISSUE-ID`      |
| `happy-jira worklog --id=id --list`<br /><br />`happy-jira worklog --id=id --time=time --comment="comment"`    | Showing worklog of issue.<br />Sample: `happy-jira worklog --id=JIRA-ISSUE-ID --list`<br /><br />Adding worklog.<br />Sample: `happy-jira worklog --id=JIRA-ISSUE-ID --time=3600 --comment="Worklog comment."` |

#### Options

| Options     | Description |
|-------------|-----------------------------------------------------------------|
| `--version` | Showing version number.<br />Usage sample: `happy-jira --version` |
| `--help`    | Showing help.<br />Usage sample: `happy-jira --help`              |
