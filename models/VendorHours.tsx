type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

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
  let hoursString = '';
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

const isVendorOpenHelper = (vendorHours: VendorHours, day: DayOfWeek, currentTime: string): boolean => {
  const todayHours = vendorHours[day];

  if (!todayHours) {
    return false;
  }

  for (const interval of todayHours) {
    const { open, close } = interval;
    if (currentTime >= open && currentTime <= close) {
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

const vendorHoursExample: VendorHours = {
  Monday: [
    { open: "09:00 AM", close: "12:00 PM" },
    { open: "01:00 PM", close: "06:00 PM" },
  ],
  Tuesday: [
    { open: "09:00 AM", close: "06:00 PM" },
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
    { open: "10:00 AM", close: "05:00 PM" },
  ],
};

export {DayOfWeek, VendorHours, vendorHoursExample, isVendorCurrentlyOpen, getVendorHoursForDayString, vendorHoursToString}