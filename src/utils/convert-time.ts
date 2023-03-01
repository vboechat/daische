export function convertToNumber(time: string) {
  return Number(time.replace(":", ""));
}

export function convertToTime(time: string) {
  const padded = `0000${time}`.slice(-4);
  const hours = padded.slice(0, 2).padStart(2, "0");
  const minutes = padded.slice(2).padStart(2, "0");

  return `${hours}:${minutes}`;
}
