type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
const daysOfWeekInOrder: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type TimeRange = {
  open: string;
  close: string;
};

type VendorHours = {
  [key in DayOfWeek]: TimeRange[];
};

const formatTimeRange = (timeRange: TimeRange): string => {
  return `${timeRange.open} - ${timeRange.close}`;
};

const getVendorHoursForDayString = (vendorHours: VendorHours, day: DayOfWeek, includeDay: boolean = false): string => {
  let hoursString = 'Closed';
  const timeRanges = vendorHours[day];

  if (timeRanges.length > 0) {
    var dayHoursString = '';
    if(includeDay){
      dayHoursString += `${day}: `;
    }
    dayHoursString += timeRanges.map(formatTimeRange).join(', ');
    hoursString = dayHoursString;
  }

  return hoursString.trim(); // Trim to remove any trailing newline
};

const getVendorHoursForTodayString = (vendorHours: VendorHours, includeDay: boolean = false): string => {
  let hoursString = '';
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
  const timeRanges = vendorHours[day];

  if (timeRanges.length > 0) {
    var dayHoursString = '';
    if(includeDay){
      dayHoursString += `${day}: `;
    }
    dayHoursString += timeRanges.map(formatTimeRange).join(', ');
    hoursString += dayHoursString;
  }

  return hoursString.trim(); // Trim to remove any trailing newline
};

const vendorHoursToString = (vendorHours: VendorHours): string => {
  let hoursString = '';

  for (const day in vendorHours) {
    hoursString += getVendorHoursForDayString(vendorHours, day as DayOfWeek);
  }

  return hoursString;
}

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
}

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
}

const isVendorOpenHelper = (vendorHours: VendorHours, day: DayOfWeek, currentTime: string): boolean => {
  const todayHours = vendorHours[day];

  if (!todayHours) {
    return false;
  }

  for (const timeRange of todayHours) {
    if (compareTime(currentTime, timeRange.open) >= 0 && compareTime(currentTime, timeRange.close) <= 0) {
      return true;
    }
  }

  return false;
};

const isVendorCurrentlyOpen = (vendorHours: VendorHours): boolean => {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
  return isVendorOpenHelper(vendorHours, currentDay, currentTime);
};

const vendorNextOpenOrCloseTimeString = (vendorHours: VendorHours): string => {
  var returnString = 'Closed Today';

  const isOpen = isVendorCurrentlyOpen(vendorHours);

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentTimeAsDate = dateFromStringTime(currentTime);

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
  const todayHours = vendorHours[currentDay];

  for (const timeRange of todayHours) {
    if (compareTime(currentTime, timeRange.close) <= 0) {
      if (compareTime(currentTime, timeRange.open) >= 0) {
        return `Closes ${timeRange.close}`;
      }else{
        return `Opens ${timeRange.open}`;
      }
    }
  }

  return returnString;
}

const todaysDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
const isDayToday = (day: DayOfWeek): boolean => {
  return day === todaysDay;
}

const vendorHoursExample: VendorHours = {
  Monday: [
    { open: "09:00 AM", close: "12:00 PM" },
  ],
  Tuesday: [
    { open: "09:00 AM", close: "12:00 PM" },
    { open: "01:00 PM", close: "06:00 PM" },
  ],
  Wednesday: [
    { open: "09:00 AM", close: "12:00 PM" },
    { open: "01:00 PM", close: "06:00 PM" },
  ],
  Thursday: [
    { open: "09:00 AM", close: "06:00 PM" },
  ],
  Friday: [
    { open: "09:00 AM", close: "08:00 PM" },
  ],
  Saturday: [
    { open: "10:00 AM", close: "08:00 PM" },
  ],
  Sunday: [
  ],
};

export {DayOfWeek, VendorHours, vendorHoursExample, daysOfWeekInOrder, isVendorCurrentlyOpen, getVendorHoursForDayString, getVendorHoursForTodayString, vendorHoursToString, vendorNextOpenOrCloseTimeString, isDayToday}
