import { Menu, menuExample } from './Menu';

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

type Coordinates = {
  latitude: number;
  longitude: number;
};

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
    location: Coordinates;
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

const foodVendorExample: FoodVendor = {
  name: "Greens",
  description: "Plant Based Eats Made to Order",
  image: "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
  location: {
    latitude: 48.46421250,
    longitude: -123.30723440,
  },
  hours: vendorHoursExample,
  menu: menuExample,
};

export { FoodVendor, VendorHours, foodVendorExample}


