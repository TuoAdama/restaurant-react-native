export const currentDate = () => {
  const date = new Date();
  return date.toLocaleDateString().replace(/\//g, "-");
};

export const currentTime = () => {
  const date = new Date();
  return date.toLocaleTimeString();
};

export const currentDateTime = () => {
  return currentDate() + " " + currentTime();
};
