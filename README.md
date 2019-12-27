# Happy Jira

### Work in progress!

```
 _   _                               _ _           _
| | | | __ _ _ __  _ __  _   _      | (_)_ __ __ _| |
| |_| |/ _` | '_ \| '_ \| | | |  _  | | | '__/ _` | |
|  _  | (_| | |_) | |_) | |_| | | |_| | | | | (_| |_|
|_| |_|\__,_| .__/| .__/ \__, |  \___/|_|_|  \__,_(_)
            |_|   |_|    |___/
```

### Description

CLI tool for communicating with JIRA API.

### Installling

`npm i @be-codified/happy-jira -g`

### Usage

#### Commands

| Command | Description |
|------------------------------|------------------------------------------------|
| `happy-jira config [--reset]`| Setting username and token for Jira authentication.<br>Sample: `happy-jira config`<br><br>Reseting username and token.<br>Sample: `happy-jira config --reset` |
| `happy-jira issue --id=id`      | Showing issue details.<br>Sample: `happy-jira issue --id=JIRA-ISSUE-ID`      |
| `happy-jira worklog --id=id`    | Showing worklog of issue.<br>Sample: `happy-jira worklog --id=JIRA-ISSUE-ID` |

#### Options

| Options     | Description |
|-------------|-----------------------------------------------------------------|
| `--version` | Showing version number.<br>Usage sample: `happy-jira --version` |
| `--help`    | Showing help.<br>Usage sample: `happy-jira --help`              |
