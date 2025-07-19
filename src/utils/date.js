var breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192,
  2262, 2324, 2394, 2456, 3178,
];

export function toJalaali(date) {
  const jsDate = new Date(date);
  return {
    date: jsDate.toLocaleString("fa-IR", { dateStyle: "short" }),
    year: toEnDigit(jsDate.toLocaleString("fa-IR", { year: "numeric" })),
    month: {
      persian: jsDate.toLocaleString("fa-IR", { month: "long" }),
      numeric: toEnDigit(jsDate.toLocaleString("fa-IR", { month: "2-digit" })),
    },
    day: {
      persian: jsDate.toLocaleString("fa-IR", { weekday: "long" }),
      numeric: toEnDigit(jsDate.toLocaleString("fa-IR", { day: "2-digit" })),
    },
    time: jsDate.toLocaleString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function toGregorian(jy, jm, jd) {
  const result = d2g(j2d(jy, jm, jd));
  return {
    year: result.gy.toString().padStart(2, "0"),
    month: result.gm.toString().padStart(2, "0"),
    day: result.gd.toString().padStart(2, "0"),
  };
}

function isValidJalaaliDate(jy, jm, jd) {
  return (
    jy >= -61 &&
    jy <= 3177 &&
    jm >= 1 &&
    jm <= 12 &&
    jd >= 1 &&
    jd <= jalaaliMonthLength(jy, jm)
  );
}

function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}

function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  if (isLeapJalaaliYear(jy)) return 30;
  return 29;
}

function jalCalLeap(jy) {
  var bl = breaks.length,
    jp = breaks[0],
    jm,
    jump,
    leap,
    n,
    i;

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error("Invalid Jalaali year " + jy);

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    jp = jm;
  }
  n = jy - jp;

  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return leap;
}

function jalCal(jy, withoutLeap) {
  var bl = breaks.length,
    gy = jy + 621,
    leapJ = -14,
    jp = breaks[0],
    jm,
    jump,
    leap,
    leapG,
    march,
    n,
    i;

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error("Invalid Jalaali year " + jy);

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  march = 20 + leapJ - leapG;
  if (withoutLeap) return { gy: gy, march: march };
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return { leap: leap, gy: gy, march: march };
}

function j2d(jy, jm, jd) {
  var r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn) {
  var gy = d2g(jdn).gy,
    jy = gy - 621,
    r = jalCal(jy, false),
    jdn1f = g2d(gy, 3, r.march),
    jd,
    jm,
    k;

  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy: jy, jm: jm, jd: jd };
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy: jy, jm: jm, jd: jd };
}
function g2d(gy, gm, gd) {
  var d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn) {
  var j, i, gd, gm, gy;
  j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  i = div(mod(j, 1461), 4) * 5 + 308;
  gd = div(mod(i, 153), 5) + 1;
  gm = mod(div(i, 153), 12) + 1;
  gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy: gy, gm: gm, gd: gd };
}

export function jalaaliWeek(jy, jm, jd) {
  var dayOfWeek = jalaaliToDateObject(jy, jm, jd).getDay();
  var startDayDifference = dayOfWeek == 6 ? 0 : -(dayOfWeek + 1);
  var endDayDifference = 6 + startDayDifference;

  return {
    saturday: d2j(j2d(jy, jm, jd + startDayDifference)),
    friday: d2j(j2d(jy, jm, jd + endDayDifference)),
  };
}

function jalaaliToDateObject(jy, jm, jd, h, m, s, ms) {
  var gregorianCalenderDate = toGregorian(jy, jm, jd);

  return new Date(
    gregorianCalenderDate.year,
    gregorianCalenderDate.month - 1,
    gregorianCalenderDate.day,
    h || 0,
    m || 0,
    s || 0,
    ms || 0
  );
}

function div(a, b) {
  return ~~(a / b);
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

export const getPersianWeekName = (date) => {
  return date.toLocaleDateString("fa-Ir", { weekday: "long" });
};

export function toEnDigit(s) {
  return s?.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a) {
    return a?.charCodeAt(0) & 15;
  });
}
