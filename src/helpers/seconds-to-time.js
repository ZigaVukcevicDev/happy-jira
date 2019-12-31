const addLeadingZero = (value) => ((`000${value}`).slice(-2));

function secondsToTime(timeSeconds) {
  const timeParsed = parseFloat(timeSeconds).toFixed(3);

  const days = Math.floor(timeParsed / 60 / 60 / 24);
  const hours = Math.floor(timeParsed / 60 / 60) % 24;
  const minutes = Math.floor(timeParsed / 60) % 60;

  let time = '';

  time += days ? `${addLeadingZero(days)}d ` : '';
  time += hours ? `${addLeadingZero(hours)}h ` : '';
  time += `${addLeadingZero(minutes)}m`;

  return time;
}

export default secondsToTime;
