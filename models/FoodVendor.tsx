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

const foodVendorExamples = {
  greens: {
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
    menu: menuExample.greens,
  },
  starbucks: {
    name: "Starbucks",
    description: "Coffee and Pastries",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    location: {
      latitude: 48.4664369,
      longitude: -123.3093606,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExample,
    menu: menuExample.starbucks,
  },
  thegrill: {
    name: "The Grill",
    description: "Serving up delicious grilled delights with a twist!",
    image: "https://uvss.ca/wp-content/uploads/2022/11/GrillLogoRed.png", // You can insert the URL of the vendor's image here
    location: {
      latitude: 48.46485803452279,
      longitude: -123.30817796788351,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    },
    hours: vendorHoursExample,
    menu: menuExample.theGrill
  },
  felicitas: {
    name: "Felicitas",
    description: "Tasty & affordable pub food. Diverse selection of local drink options. Fast & friendly service. Events.",
    image: "https://www.felicitas.ca/wp-content/uploads/2024/01/FELS_BOTB_Digicaster_1.2_web.jpg",
    location: {
      latitude: 48.46460219027596,
      longitude: -123.30794900242859,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    },
    hours: vendorHoursExample,
    menu: menuExample.felicitas
  },
  entree: {
    name: "Entree",
    description: "",
    image: "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.464306646410556, 
      longitude: -123.30712176290265,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    },
    hours: vendorHoursExample,
    menu: menuExample.entree
  },
  uniClub: {
    name: "University Club of Victoria",
    description: "Scenic cafe at University of Victoria offering burgers, sandwiches & salads, plus a pondside patio.",
    image: "https://www.google.com/maps/place/University+Club+of+Victoria/@48.4638812,-123.3175645,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMLYoNkZ0ahzJc1J96968ffKbGbfnzm4ovBhJl5!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMLYoNkZ0ahzJc1J96968ffKbGbfnzm4ovBhJl5%3Dw114-h86-k-no!7i4608!8i3456!4m16!1m8!3m7!1s0x548f71587386262b:0xdd7d72040264499a!2sUniversity+Club+of+Victoria!8m2!3d48.4638812!4d-123.3175645!10e1!16s%2Fg%2F1v6p8k42!3m6!1s0x548f71587386262b:0xdd7d72040264499a!8m2!3d48.4638812!4d-123.3175645!10e5!16s%2Fg%2F1v6p8k42?entry=ttu#",
    location: {
      latitude: 48.464051945701065,
      longitude:  -123.31754308323926,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    },
    hours: vendorHoursExample,
    menu: menuExample.uniclub
  }
};

export { FoodVendor, VendorHours, foodVendorExamples };
