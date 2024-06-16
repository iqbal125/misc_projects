export async function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function transformMilliseconds(
  milliseconds: number,
  mode = "total",
  displaySeconds = false
) {
  if (!milliseconds) {
    return "";
  }

  let days;
  let hours;
  let minutes;
  let seconds;

  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;

  const dayWord = days > 1 ? "days" : "day";
  const hourWord = hours > 1 ? "hours" : "hour";

  const dayString = days > 0 ? `${days} ${dayWord}` : "";
  const hourString = hours > 0 ? `${hours} ${hourWord}` : "";
  const minuteString = minutes > 0 ? `${minutes} min` : "";
  const secondString =
    seconds > 0 && displaySeconds ? `${seconds} seconds` : "";

  if (mode === "total") {
    return `${dayString} ${hourString} ${minuteString} ${secondString}`;
  } else if (mode === "ago") {
    if (days > 0) {
      return dayString + " ago";
    } else if (hours > 0) {
      return hourString + " ago";
    } else if (minutes > 0) {
      return minuteString + " ago";
    } else {
      return secondString + " ago";
    }
  } else {
    console.error("Warning: Invalid mode!");
    return "";
  }
}
