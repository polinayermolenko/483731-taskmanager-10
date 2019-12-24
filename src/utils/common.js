const custTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = custTimeFormat(date.getHours() % 12);
  const minutes = custTimeFormat(date.getMinutes());
  const interval = date.getHours() < 11 ? `AM` : `PM`;

  return `${hours}: ${minutes} ${interval}`;
};

