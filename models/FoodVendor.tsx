import { Menu, menuExample } from './Menu';
import Coordinates from './Coordinates'
import {VendorHours, vendorHoursExample} from './VendorHours'

type FoodVendor = {
    name: string;
    description: string;
    image: string;
    location: Coordinates;
    hours: VendorHours;
    menu: Menu;
};

const foodVendorExample: FoodVendor = {
  name: "Greens",
  description: "Plant Based Eats Made to Order",
  image: "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
  location: {
    latitude: 48.46421250,
    longitude: -123.30723440,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  hours: vendorHoursExample,
  menu: menuExample,
};

export { FoodVendor, VendorHours, foodVendorExample}


