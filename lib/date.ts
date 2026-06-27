// Arabic Hijri + Gregorian formatting using the Intl islamic calendar.

export function hijriDate(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(date);
  } catch {
    return "";
  }
}

export function gregorianDate(date = new Date()): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function isFriday(date = new Date()): boolean {
  return date.getDay() === 5;
}

export function arabicTime(date = new Date()): string {
  return new Intl.DateTimeFormat("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}
