import { Menu, menuExample } from "./Menu";
import Coordinates from "./Coordinates";
import { VendorHours, vendorHoursExamples, bibliocafeHours } from "./VendorHours";
import { Building } from "./Building";
import { BUILDING_CODES } from "./Constants";

type FoodVendor = {
  name: string;
  building_code: string;
  description: string;
  image: string;
  location: Coordinates;
  hours: VendorHours;
  menu: Menu;
};

const getNextFoodVendorInBuilding = (vendor: FoodVendor, building : Building) => {
  const vendorsInBuilding = building.vendors;
  const index = vendorsInBuilding.findIndex((v) => v.name === vendor.name);
  return vendorsInBuilding[(index + 1) % vendorsInBuilding.length];
}

const getPreviousFoodVendorInBuilding = (vendor: FoodVendor, building : Building) => {
  const vendorsInBuilding = building.vendors;
  const index = vendorsInBuilding.findIndex((v) => v.name === vendor.name);
  return vendorsInBuilding[(index - 1 + vendorsInBuilding.length) % vendorsInBuilding.length];
}

const foodVendorExamples : FoodVendor[] = [

  {
    name: "Starbucks",
    building_code: BUILDING_CODES.BOOKSTORE,
    description: "Coffee and Pastries",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    location: {
      latitude: 48.4664369,
      longitude: -123.3093606,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "starbucks")!,
  },

  {
    name: "University Club of Victoria",
    building_code: BUILDING_CODES.BOOKSTORE,
    description:
      "Scenic cafe at University of Victoria offering burgers, sandwiches & salads, plus a pondside patio.",
    image: "https://vitp.ca/wp-content/uploads/2012/12/UVIC-SS3lr1.jpg",
    location: {
      latitude: 48.464051945701065,
      longitude: -123.31754308323926,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "uniclub")!,
  },

  {
    name: "Mac",
    building_code: BUILDING_CODES.MACLAUREN,
    description:
      "Mac's in the MacLaurin Building is the best place on campus to get a custom-made sandwich or wrap.",
    image: "https://www.uvic.ca/services/food/assets/images/photos/main/sandwichmain.jpg",
    location: {
      latitude: 48.46277996731299,
      longitude: -123.31336220834122,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "mac")!,
  },

  // The Cove

  // Entree
  {
    name: "Entree",
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.464306646410556,
      longitude: -123.30712176290265,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "entree")!,
  },

  // Greens
  {
    name: "Greens",
    building_code: BUILDING_CODES.COVE,
    description: "Plant Based Eats Made to Order",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    location: {
      latitude: 48.4642125,
      longitude: -123.3072344,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "greens")!,
  },

  // Mystic Market Vendors

  // Chopbox
  {
    name: "Chopbox",
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Asian inspired noodles",
    image: "https://www.currentmillwork.com/wp-content/uploads/2021/01/UVIC-Food-Service-Gallery-10.jpg",
    location: {
      latitude: 48.464842271379375,
      longitude: -123.31178290713422,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "mystic_common_hours")!.hours,
    menu: menuExample.find((menu) => menu.id === "chopbox")!,
  },
  
  // Freshco Taco
  {
    name: "Fresco Taco",
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Tacos ",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    location: {
      latitude: 48.46483425099296, 
      longitude: -123.3116956137913,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "mystic_common_hours")!.hours,
    menu: menuExample.find((menu) => menu.id === "fresco")!,
  },

  // Treks
  {
    name: "Treks",
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Soups, salad bar, flatbread sandwiches",
    image: "https://images.squarespace-cdn.com/content/v1/5dfc50e0a548615174b0c1e6/1585847093300-RVHUNOOHKRS2N378EIR0/DSCN0064.JPG",
    location: {
      latitude: 48.46480437387054, 
      longitude: -123.31174779073204,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "mystic_common_hours")!.hours,
    menu: menuExample.find((menu) => menu.id === "treks")!,
  },

  // GradHouse Building
  // Gradhouse
  {
    name: "Gradhouse",
    building_code: BUILDING_CODES.GRADUATE_BUILDING,
    description:
      "Home on campus for UVIC graduate students",
    image: "https://gss.uvic.ca/wp-content/uploads/2020/01/Orientation-Social-Image.jpg",
    location: {
      latitude: 48.466136567816996, 
      longitude: -123.30747612930818,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "gradhouse")!,
  },

  // Library Building
  // Biblio
  {
    name: "Biblio",
    building_code: BUILDING_CODES.MCPHERSON_LIBRARY,
    description:
    "A great place to enjoy coffee, and grab a quick bite to eat on campus",
    image: "https://live.staticflickr.com/3106/2899508226_65cfd6a0db_b.jpg",
    location: {
      latitude: 48.463514414260366, 
      longitude: -123.30989988311102,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "biblio")!,
  },

  // Student Union Building
  // Health Food Bar
  {
    name: "Health Food Bar",
    building_code: BUILDING_CODES.SUB,
    description:
    "House made items, rice bowls, wraps, sandwiches, fresh juice, smoothies, vegan & gluten free options.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKKkBVJcCXP2XZv9CI8BxYdsHkgSFIDaSLw&usqp=CAU",
    location: {
 
      latitude: 48.46501468824788,
      longitude: -123.30821467799807,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "theGrill")!,
  },

  // Felicitas
  {
    name: "Felicitas",
    building_code: BUILDING_CODES.SUB,
    description:
      "Tasty & affordable pub food. Diverse selection of local drink options. Fast & friendly service. Events.",
    image:
      "https://www.felicitas.ca/wp-content/uploads/2024/01/FELS_BOTB_Digicaster_1.2_web.jpg",
    location: {
      latitude: 48.46460219027596,
      longitude: -123.30794900242859,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "felicitas")!,
  },

  // The Grill
  {
    name: "The Grill",
    building_code: BUILDING_CODES.SUB,
    description: "Serving up delicious grilled delights with a twist!",
    image: "https://uvss.ca/wp-content/uploads/2022/11/GrillLogoRed.png", // You can insert the URL of the vendor's image here
    location: {
      latitude: 48.46485803452279,
      longitude: -123.30817796788351,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "theGrill")!,
  },

  // Munchie Bar
  {
    name: "Munchie Bar",
    building_code: BUILDING_CODES.SUB,
    description:
    "Handmade espresso beverages, quality baking with vegan, organic and gluten free options. Delicious Italian-style sandwiches.",
    image: "https://events.uvic.ca/live/image/gid/19/width/1260/crop/1/6793_Cinecenta.jpg",
    location: {
       
      latitude: 48.46555743717081,
      longitude: -123.30808186056898,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: vendorHoursExamples.find((vendor) => vendor.id === "biblio")!.hours,
    menu: menuExample.find((menu) => menu.id === "starbucks")!,
  }, 
];

export { FoodVendor, VendorHours, foodVendorExamples, getNextFoodVendorInBuilding, getPreviousFoodVendorInBuilding};
