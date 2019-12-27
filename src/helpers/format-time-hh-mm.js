import moment from 'moment';

const formatTimeHHmm = (seconds) => {
  const hours = moment.utc(seconds * 1000).format('HH');
  const minutes = moment.utc(seconds * 1000).format('mm');

  return `${hours}h ${minutes}m`;
};

export default formatTimeHHmm;
