import { Menu, STATIC_GetMenuForVendor } from "./Menu";
import Coordinates from "./Coordinates";
import { VendorHours, STATIC_GetVendorHoursFor } from "./VendorHours";
import { Building } from "./Building";
import { BUILDING_CODES, VENDOR_NAMES } from "./Constants";

type FoodVendor = {
  name: string;
  building_code: string;
  description: string;
  image: string;
  location: Coordinates;
  hours: VendorHours;
  menu: Menu;
};

const getNextFoodVendorInBuilding = (vendor: FoodVendor, building: Building) => {
  const vendorsInBuilding = building.vendors;
  const index = vendorsInBuilding.findIndex((v) => v.name === vendor.name);
  return vendorsInBuilding[(index + 1) % vendorsInBuilding.length];
}

const getPreviousFoodVendorInBuilding = (vendor: FoodVendor, building: Building) => {
  const vendorsInBuilding = building.vendors;
  const index = vendorsInBuilding.findIndex((v) => v.name === vendor.name);
  return vendorsInBuilding[(index - 1 + vendorsInBuilding.length) % vendorsInBuilding.length];
}

// FOOD VENDOR GENERATORS

type FV_GENERATOR = {
  vendor_name: string,
  building_code: string,
  description: string,
  image: string,
  latitude: number,
  longitude: number
}

const CreateVendor = (generator: FV_GENERATOR): FoodVendor => {
  return {
    name: generator.vendor_name,
    building_code: generator.building_code,
    description: generator.description,
    image: generator.image,
    location: {
      latitude: generator.latitude,
      longitude: generator.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    hours: STATIC_GetVendorHoursFor(generator.vendor_name),
    menu: STATIC_GetMenuForVendor(generator.vendor_name),
  }
}

const foodVendorExamples: FoodVendor[] = [
  CreateVendor({
    vendor_name: VENDOR_NAMES.STARBUCKS,
    building_code: BUILDING_CODES.BOOKSTORE,
    description: "Coffee and Pastries",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    latitude: 48.4664369,
    longitude: -123.3093606
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.UNICLUB,
    building_code: BUILDING_CODES.BOOKSTORE,
    description:
      "Scenic cafe at University of Victoria offering burgers, sandwiches & salads, plus a pondside patio.",
    image: "https://vitp.ca/wp-content/uploads/2012/12/UVIC-SS3lr1.jpg",
    latitude: 48.464051945701065,
    longitude: -123.31754308323926
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.MACS,
    building_code: BUILDING_CODES.MACLAUREN,
    description:
      "Mac's in the MacLaurin Building is the best place on campus to get a custom-made sandwich or wrap.",
    image: "https://www.uvic.ca/services/food/assets/images/photos/main/sandwichmain.jpg",
    latitude: 48.46277996731299,
    longitude: -123.31336220834122
  }),

  // The Cove
  CreateVendor({
    vendor_name: VENDOR_NAMES.GREENS,
    building_code: BUILDING_CODES.COVE,
    description: "Plant Based Eats Made to Order",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.46419,
    longitude: -123.3072344
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.SOUP_SALAD_COVE,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.4642395,
    longitude: -123.3071744
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.SHAWARMA,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.46424,
    longitude: -123.307045,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.GRILL_COVE,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.464288542529324,
    longitude: -123.30705262720585
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.ENTREE,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.464306646410556,
    longitude: -123.30712176290265
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.PIZZA_COVE,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
      latitude: 48.4643025,
    longitude: -123.30721087753773,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.DELI_COVE,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
    latitude: 48.464299,
    longitude: -123.30727,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.STIRFRY,
    building_code: BUILDING_CODES.COVE,
    description: "",
    image:
      "https://www.uvic.ca/news-management/stories/2022/cove-dining-hall/photos/outside-cove.jpg",
      latitude: 48.464297,
      longitude: -123.30734,
  }),

  // Mystic Market Building 
  CreateVendor({
    vendor_name: VENDOR_NAMES.CHOPBOX,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Asian inspired noodles",
    image: "https://www.currentmillwork.com/wp-content/uploads/2021/01/UVIC-Food-Service-Gallery-10.jpg",
    latitude: 48.46543324062987,
    longitude: -123.31178605556488,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.FRESCO,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Tacos ",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.465392112867924,
    longitude: -123.31165093928576,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.TREKS,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Soups, salad bar, flatbread sandwiches",
    image: "https://images.squarespace-cdn.com/content/v1/5dfc50e0a548615174b0c1e6/1585847093300-RVHUNOOHKRS2N378EIR0/DSCN0064.JPG",
    latitude: 48.46529473997975,
    longitude: -123.31165228039025,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.FLAMINCHICKEN,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.46538544349798,
    longitude: -123.31186082214116,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.PICKLE_SPICE,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Indian cuisine",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.465316081998616,
    longitude: -123.31189401447773,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.TOFINOS,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Fish and Chips",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.465234493190515,
    longitude: -123.31187825649977,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.BOOSTER,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Smoothies",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.46507620608253,
    longitude: -123.3116851374507,
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.BROADWALK_CAFE,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Coffee and Pastries",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.46519914541006,
    longitude: -123.31158690154552
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.GENERAL_STORE,
    building_code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
    description:
      "Convenience store",
    image: "https://www.uvic.ca/services/food/assets/images/mystic-outside.jpg",
    latitude: 48.465123558878666,
    longitude: -123.31187725067139
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.GRADHOUSE,
    building_code: BUILDING_CODES.GRADUATE_BUILDING,
    description:
      "Home on campus for UVIC graduate students",
    image: "https://gss.uvic.ca/wp-content/uploads/2020/01/Orientation-Social-Image.jpg",
    latitude: 48.466136567816996,
    longitude: -123.30747612930818
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.BIBLIO,
    building_code: BUILDING_CODES.MCPHERSON_LIBRARY,
    description:
      "A great place to enjoy coffee, and grab a quick bite to eat on campus",
    image: "https://live.staticflickr.com/3106/2899508226_65cfd6a0db_b.jpg",
    latitude: 48.463514414260366,
    longitude: -123.30989988311102
  }),

  // SUB Building
  CreateVendor({
    vendor_name: VENDOR_NAMES.HEALTH_FB,
    building_code: BUILDING_CODES.SUB,
    description:
      "House made items, rice bowls, wraps, sandwiches, fresh juice, smoothies, vegan & gluten free options.",
    image: "https://uvss.ca/wp-content/uploads/2021/06/SUBBrands_HFB600px.png",
    latitude: 48.46501468824788,
    longitude: -123.30821467799807
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.FELICITAS,
    building_code: BUILDING_CODES.SUB,
    description:
      "All your pub food favourites and a wide selection of beer.",
    image:
      "https://uvss.ca/wp-content/uploads/2021/06/SUBBrands_FEL600px.png",
    latitude: 48.46460219027596,
    longitude: -123.30794900242859
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.GRILL,
    building_code: BUILDING_CODES.SUB,
    description: "Dahls, curries, burgers, chicken strips, Tex-Mex items & more - vegan & gluten free options. Also open for breakfast.",
    image: "https://uvss.ca/wp-content/uploads/2022/11/GrillLogoRed.png",
    latitude: 48.46485803452279,
    longitude: -123.30817796788351
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.MUNCHIE,
    building_code: BUILDING_CODES.SUB,
    description:
      "Handmade espresso beverages, quality baking with vegan, organic and gluten free options. Delicious Italian-style sandwiches.",
    image: "https://uvss.ca/wp-content/uploads/2021/06/SUBBrands_MUN600px.png",
    latitude: 48.46555743717081,
    longitude: -123.30808186056898
  }),

  CreateVendor({
    vendor_name: VENDOR_NAMES.BEAN_THERE_CAFE,
    building_code: BUILDING_CODES.SUB,
    description:
      "Pizza, sushi, bagels, muffins, breakfast sandwiches and coffee.",
    image: "https://uvss.ca/wp-content/uploads/2021/06/SUBBrands_BT600px.png",
    latitude: 48.464741845175446,
    longitude: -123.30815870314835,
  }),

  
]

export { FoodVendor, VendorHours, foodVendorExamples, getNextFoodVendorInBuilding, getPreviousFoodVendorInBuilding };
