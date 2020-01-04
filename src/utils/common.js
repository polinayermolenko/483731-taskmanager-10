/*const customizeTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};*/
import moment from 'moment';

export const formatTime = (date) => {
  /*const hours = customizeTimeFormat(date.getHours() % 12);
  const minutes = customizeTimeFormat(date.getMinutes());
  const interval = date.getHours() < 11 ? `AM` : `PM`;

  return `${hours}: ${minutes} ${interval}`;*/
  return moment(date).format(`hh:mm A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};
