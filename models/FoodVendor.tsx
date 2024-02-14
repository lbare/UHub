import { Menu } from './Menu';

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

type VendorHours = {
  [key in DayOfWeek]: {
    open: string;
    close: string;
  };
};

type FoodVendor = {
    name: string;
    description: string;
    image: string;
    hours: VendorHours;
    menu: Menu;
};

const vendorHoursExample: VendorHours = {
  Monday: {
    open: "09:00 AM",
    close: "06:00 PM",
  },
  Tuesday: {
    open: "09:00 AM",
    close: "06:00 PM",
  },
  Wednesday: {
    open: "09:00 AM",
    close: "06:00 PM",
  },
  Thursday: {
    open: "09:00 AM",
    close: "06:00 PM",
  },
  Friday: {
    open: "09:00 AM",
    close: "08:00 PM",
  },
  Saturday: {
    open: "10:00 AM",
    close: "08:00 PM",
  },
  Sunday: {
    open: "10:00 AM",
    close: "05:00 PM",
  },
};

export { FoodVendor, VendorHours, vendorHoursExample}


