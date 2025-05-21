export const getFormattedTime = (dt: Date) => {
  return `${dt.getHours()}:${dt.getMinutes()} ${
    dt.getHours() >= 12 ? "PM" : "AM"
  }`;
};

export const cn = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getEmailLogoText = (email: string) => {
  const splits = email.split("@")[0].split(".");
  const emailLogo =
    "" +
    splits
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  return emailLogo;
};

export const getTimeInSeconds = (hhmmss: string) => {
  // console.log("val: ", hhmmss);
  if (hhmmss === "") return 0;
  const [hh, mm, ss] = hhmmss.split(":");
  const totalSeconds = +hh * 60 + +mm * 60 + +ss;
  // console.log(hhmmss, totalSeconds);
  return totalSeconds;
};

const formatTimeSec = (xx: number) => {
  const tt = "" + Math.floor(xx);
  return tt.length > 1 ? tt : "0" + tt;
};

export const getTimeInHHMMSS = (seconds: number) => {
  if (seconds === 0) return "00:00:00";
  const hh = formatTimeSec(seconds / 3600);
  const mmss = seconds % 3600;
  const mm = formatTimeSec(mmss / 60);
  const ss = formatTimeSec(mmss % 60);
  return `${hh}:${mm}:${ss}`;
};

export const getFormattedHHMMSS = (hhmmss: string) => {
  const [hh, mm, ss] = hhmmss.split(":");
  console.log(hh, mm, ss);
  let timeString = " ";
  if (+hh > 0) timeString += +hh + " hours ";
  if (+mm > 0) timeString += +mm + " minutes ";
  if (+ss > 0) timeString += " and " + +ss + " seconds ";
  return timeString;
};
