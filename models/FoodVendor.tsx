import { Menu, menuExample } from "./Menu";
import Coordinates from "./Coordinates";
import { VendorHours, vendorHoursExample } from "./VendorHours";

type FoodVendor = {
  name: string;
  description: string;
  image: string;
  location: Coordinates;
  hours: VendorHours;
  menu: Menu;
};

const foodVendorExamples: FoodVendor[] = [
  {
    name: "Greens",
    description: "Plant Based Eats Made to Order",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4642125,
      longitude: -123.3072344,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
  {
    name: "Booster Juice",
    description: "Smoothies and Fresh Juices",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4648918,
      longitude: -123.3116604,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
  {
    name: "Mac's",
    description: "Burgers and Fries",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4629012,
      longitude: -123.3133088,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
  {
    name: "Arts Place",
    description: "Cafe and Bakery",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4621044,
      longitude: -123.3166884,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
  {
    name: "University Club",
    description: "Fine Dining",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4640182,
      longitude: -123.3175574,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
  {
    name: "Starbucks",
    description: "Coffee and Pastries",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4664369,
      longitude: -123.3093606,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample,
  },
];

export { FoodVendor, VendorHours, foodVendorExamples };
