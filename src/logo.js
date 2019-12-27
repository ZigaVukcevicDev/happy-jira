import figlet from 'figlet';

const { log } = console;

const logo = () => {
  log(figlet.textSync('Happy Jira!'), '\n');
};

export default logo;
