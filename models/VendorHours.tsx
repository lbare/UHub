import { VENDOR_NAMES } from "./Constants";

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const daysOfWeekInOrder: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type TimeRange = {
  open: string;
  close: string;
};

type VendorHours = {
  [key in DayOfWeek]: TimeRange[];
};

type VendorHoursWithId = {
  vendor_name: string;
  hours: VendorHours;
};

const formatTimeRange = (timeRange: TimeRange): string => {
  return `${timeRange.open} - ${timeRange.close}`;
};

const getVendorHoursForDayString = (
  vendorHours: VendorHours,
  day: DayOfWeek,
  includeDay: boolean = false
): string => {
  let hoursString = "Closed";
  const timeRanges = vendorHours[day];

  if (timeRanges.length > 0) {
    var dayHoursString = "";
    if (includeDay) {
      dayHoursString += `${day}: `;
    }
    dayHoursString += timeRanges.map(formatTimeRange).join(", ");
    hoursString = dayHoursString;
  }

  return hoursString.trim(); // Trim to remove any trailing newline
};

const getVendorHoursForTodayString = (
  vendorHours: VendorHours,
  includeDay: boolean = false
): string => {
  let hoursString = "";
  const day = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as DayOfWeek;
  const timeRanges = vendorHours[day];

  if (timeRanges.length > 0) {
    var dayHoursString = "";
    if (includeDay) {
      dayHoursString += `${day}: `;
    }
    dayHoursString += timeRanges.map(formatTimeRange).join(", ");
    hoursString += dayHoursString;
  }

  return hoursString.trim(); // Trim to remove any trailing newline
};

const vendorHoursToString = (vendorHours: VendorHours): string => {
  let hoursString = "";

  for (const day in vendorHours) {
    hoursString += getVendorHoursForDayString(vendorHours, day as DayOfWeek);
  }

  return hoursString;
};

//Needs unit tests
const dateFromStringTime = (timeString: string): Date => {
  // Split the string into hours and minutes
  var timeParts = timeString.split(":");
  var hours = parseInt(timeParts[0], 10);
  var minutes = parseInt(timeParts[1].split(" ")[0], 10);

  // Convert 12-hour format to 24-hour format if necessary
  if (timeParts[1].indexOf("PM") !== -1 && hours < 12) {
    hours += 12;
  } else if (timeParts[1].indexOf("AM") !== -1 && hours === 12) {
    hours = 0;
  }

  // Create a new Date object with today's date and the specified time
  var date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  return date;
};

const compareTime = (time1: string, time2: string): number => {
  //Hacky way to use Date to compare time
  const date1 = dateFromStringTime(time1);
  const date2 = dateFromStringTime(time2);

  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
};

const isVendorOpenHelper = (
  vendorHours: VendorHours,
  day: DayOfWeek,
  currentTime: string
): boolean => {
  const todayHours = vendorHours[day];

  if (!todayHours) {
    return false;
  }

  for (const timeRange of todayHours) {
    if (
      compareTime(currentTime, timeRange.open) >= 0 &&
      compareTime(currentTime, timeRange.close) <= 0
    ) {
      return true;
    }
  }

  return false;
};

const isVendorCurrentlyOpen = (vendorHours: VendorHours): boolean => {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as DayOfWeek;
  return isVendorOpenHelper(vendorHours, currentDay, currentTime);
};

const isVendorHoursEvenThere = (vendorHours: VendorHours): boolean => {
  for (const day in vendorHours) {
    if (vendorHours[day as DayOfWeek].length > 0) {
      return true;
    }
  }
  return false;
}

const vendorNextOpenOrCloseTimeString = (vendorHours: VendorHours): string => {
  var returnString = "Closed Today";

  if (!isVendorHoursEvenThere(vendorHours)) {
    return "No hours info available.";
  }

  const isOpen = isVendorCurrentlyOpen(vendorHours);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currentTimeAsDate = dateFromStringTime(currentTime);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as DayOfWeek;
  const todayHours = vendorHours[currentDay];

  for (const timeRange of todayHours) {
    if (compareTime(currentTime, timeRange.close) <= 0) {
      if (compareTime(currentTime, timeRange.open) >= 0) {
        return `Closes ${timeRange.close}`;
      } else {
        return `Opens ${timeRange.open}`;
      }
    }
  }

  return returnString;
};

const todaysDay = new Date().toLocaleDateString("en-US", {
  weekday: "long",
}) as DayOfWeek;
const isDayToday = (day: DayOfWeek): boolean => {
  return day === todaysDay;
};

const UndefinedHours: VendorHoursWithId = {
  vendor_name: "NONE",
  hours: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
};

// Library Building
const bibliocafeHours: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.BIBLIO,
  hours: {
    Monday: [{ open: "08:00 AM", close: "8:00 PM" }],
    Tuesday: [{ open: "08:00 AM", close: "8:00 PM" }],
    Wednesday: [{ open: "08:00 AM", close: "8:00 PM" }],
    Thursday: [{ open: "08:00 AM", close: "8:00 PM" }],
    Friday: [{ open: "08:00 AM", close: "4:00 PM" }],
    Saturday: [{ open: "10:00 AM", close: "04:00 PM" }],
    Sunday: [{ open: "10:00 AM", close: "04:00 PM" }],
  },
};

const macsHours: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.MACS,
  hours: {
    Monday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Tuesday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Wednesday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Thursday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Friday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Saturday: [],
    Sunday: [],
  }
};

// Mystic Market Building
const generalStoreHours: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.GENERAL_STORE,
  hours: {
    Monday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Tuesday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Wednesday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Thursday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Friday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const boardWalkCafe: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.BROADWALK_CAFE,
  hours: {
    Monday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Tuesday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Wednesday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Thursday: [{ open: "08:00 AM", close: "5:00 PM" }],
    Friday: [{ open: "08:00 AM", close: "3:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const boosterJuice: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.BOOSTER,
  hours: {
    Monday: [{ open: "10:00 AM", close: "2:00 PM" }],
    Tuesday: [{ open: "10:00 AM", close: "2:00 PM" }],
    Wednesday: [{ open: "10:00 AM", close: "2:00 PM" }],
    Thursday: [{ open: "10:00 AM", close: "2:00 PM" }],
    Friday: [{ open: "10:00 AM", close: "2:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const mystic_common_hours: VendorHours = {
  Monday: [{ open: "11:00 AM", close: "3:00 PM" }],
  Tuesday: [{ open: "11:00 AM", close: "3:00 PM" }],
  Wednesday: [{ open: "11:00 AM", close: "3:00 PM" }],
  Thursday: [{ open: "11:00 AM", close: "3:00 PM" }],
  Friday: [{ open: "11:00 AM", close: "3:00 PM" }],
  Saturday: [],
  Sunday: [],
};

const chopBox: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.CHOPBOX,
  hours: mystic_common_hours,
};

const flaminChicken: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.FLAMINCHICKEN,
  hours: mystic_common_hours,
};

const fresco: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.FRESCO,
  hours: mystic_common_hours,
};

const pickle_and_spice: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.PICKLE_SPICE,
  hours: mystic_common_hours,
};

const tofinos: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.TOFINOS,
  hours: mystic_common_hours,
};

const treks: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.TREKS,
  hours: mystic_common_hours,
};

const beanThereCafe: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.BEAN_THERE_CAFE,
  hours: {
    Monday: [{ open: "07:00 AM", close: "5:00 PM" }],
    Tuesday: [{ open: "07:00 AM", close: "5:00 PM" }],
    Wednesday: [{ open: "07:00 AM", close: "5:00 PM" }],
    Thursday: [{ open: "07:00 AM", close: "5:00 PM" }],
    Friday: [{ open: "07:00 AM", close: "5:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const felicitas: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.FELICITAS,
  hours: {
    Monday: [{ open: "11:30 AM", close: "11:00 PM" }],
    Tuesday: [{ open: "11:30 AM", close: "11:00 PM" }],
    Wednesday: [{ open: "11:30 AM", close: "11:00 PM" }],
    Thursday: [{ open: "11:30 AM", close: "11:59 PM" }],
    Friday: [{ open: "11:30 AM", close: "11:59 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const theGrill: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.GRILL,
  hours: {
    Monday: [{ open: "08:30 AM", close: "4:00 PM" }],
    Tuesday: [{ open: "08:30 AM", close: "4:00 PM" }],
    Wednesday: [{ open: "08:30 AM", close: "4:00 PM" }],
    Thursday: [{ open: "08:30 AM", close: "4:00 PM" }],
    Friday: [{ open: "08:30 AM", close: "4:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};

const munchieBar: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.MUNCHIE,
  hours: {
    Monday: [{ open: "08:00 AM", close: "7:30 PM" }],
    Tuesday: [{ open: "08:00 AM", close: "7:30 PM" }],
    Wednesday: [{ open: "08:00 AM", close: "7:30 PM" }],
    Thursday: [{ open: "08:00 AM", close: "7:30 PM" }],
    Friday: [{ open: "08:00 AM", close: "7:30 PM" }],
    Saturday: [{ open: "02:30 PM", close: "7:30 PM" }],
    Sunday: [{ open: "02:30 PM", close: "7:30 PM" }],
  },
};

const healthFoodBar: VendorHoursWithId = {
  vendor_name: VENDOR_NAMES.HEALTH_FB,
  hours: {
    Monday: [{ open: "10:00 AM", close: "4:00 PM" }],
    Tuesday: [{ open: "10:00 AM", close: "4:00 PM" }],
    Wednesday: [{ open: "10:00 AM", close: "4:00 PM" }],
    Thursday: [{ open: "10:00 AM", close: "4:00 PM" }],
    Friday: [{ open: "10:00 AM", close: "4:00 PM" }],
    Saturday: [],
    Sunday: [],
  },
};



const vendorHoursExamples: VendorHoursWithId[] = [
  bibliocafeHours,
  macsHours,
  generalStoreHours,
  boardWalkCafe,
  boosterJuice,
  chopBox,
  flaminChicken,
  fresco,
  pickle_and_spice,
  tofinos,
  treks,
  beanThereCafe,
  felicitas,
  theGrill,
  munchieBar,
  healthFoodBar,
];

const STATIC_GetVendorHoursFor = (vendorName: string): VendorHours => {
  const vendorHours = vendorHoursExamples.find(
    (vendor) => vendor.vendor_name === vendorName
  );

  if (!vendorHours) {
    console.warn(`NO HOURS FOR: ${vendorName}`);
    return UndefinedHours.hours;
  }

  return vendorHours.hours;

}

export {
  DayOfWeek,
  VendorHours,
  STATIC_GetVendorHoursFor,
  daysOfWeekInOrder,
  isVendorCurrentlyOpen,
  getVendorHoursForDayString,
  getVendorHoursForTodayString,
  vendorHoursToString,
  vendorNextOpenOrCloseTimeString,
  isDayToday,
};
