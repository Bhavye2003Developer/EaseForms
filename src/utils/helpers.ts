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
