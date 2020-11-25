export const hoursMinsFormatter = (d: Date | string) => {
  if (typeof d === "string") {
    d = new Date(d);
  }

  const hours = d.getHours();
  const mins = d.getMinutes();

  const hoursStr = `${hours < 10 ? "0" : ""}${hours}`;
  const minsStr = `${mins < 10 ? "0" : ""}${mins}`;
  return `${hoursStr}:${minsStr}`;
};
