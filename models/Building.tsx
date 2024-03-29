import { FoodVendor, foodVendorExamples } from "./FoodVendor";
import { BUILDING_CODES } from "./Constants";
import Coordinates from "./Coordinates";

type Building = {
  name: string;
  code: string;
  description: string;
  image: string;
  location: Coordinates;
  vendors: FoodVendor[];
};

const coveBuildingExample: Building = {
  name: "The Cove",
  code: BUILDING_CODES.COVE,
  description:
    "Dining facility featuring a 700 person seating capacity across two levels with an open concept and food court",
  image: "https://www.uvic.ca/services/food/assets/images/cove-stairs",
  location: {
    latitude: 48.4642124,
    longitude: -123.3072343,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.COVE),
};

const subBuildingExample: Building = {
  name: "Student Union Building",
  code: BUILDING_CODES.SUB,
  description:
    "The Student Union Building (SUB) is the social hub of campus, providing a variety of services and amenities for students, faculty, staff and visitors.",
  image:
    "https://uvss.ca/wp-content/uploads/2024/01/SUB_WEBSLIDER_SPRING2019.jpg",
  location: {
    latitude: 48.46505016871948,
    longitude: -123.30813408180839,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.SUB),
};

const bookStoreBuildingExample: Building = {
  name: "University of Victoria Bookstore",
  code: BUILDING_CODES.BOOKSTORE,
  description:
    "The University of Victoria Bookstore is a not-for-profit corporation that serves the campus community. We are owned and operated by the University of Victoria Students' Society.",
  image:
    "https://uvss.ca/wp-content/uploads/2024/01/BOOKSTORE_WEBSLIDER_SPRING2019.jpg",
  location: {
    latitude: 48.46485803452279,
    longitude: -123.30817796788351,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.BOOKSTORE),
};

const macBuildingExample: Building = {
  name: "MacLaurin",
  code: BUILDING_CODES.MACLAUREN,
  description:
    "Mac's in the MacLaurin Building is the best place on campus to get a custom-made sandwich or wrap.",
  image:
    "https://uvss.ca/wp-content/uploads/2024/01/BOOKSTORE_WEBSLIDER_SPRING2019.jpg",
  location: {
    latitude: 48.46278553698842,
    longitude: -123.31336066821612,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.MACLAUREN),
};

const MysticBuildingExample: Building = {
  name: "Jamie Cassels Center",
  code: BUILDING_CODES.JAMIE_CASSELS_CENTER,
  description:
    "Jamie Cassels Centre (JCC) contains academic and administrative offices.",
  image:
    "https://www.uvic.ca/info/_assets/images/content-main/buildings-jamie-cassels-720x405.jpg",
  location: {
    latitude: 48.46497598248455,
    longitude: -123.31095511732323,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.JAMIE_CASSELS_CENTER),
};

const GradBuildingExample: Building = {
  name: "Halpern Centre for Graduate Students",
  code: BUILDING_CODES.GRADUATE_BUILDING,
  description: "Home on campus for UVIC graduate students",
  image:
    "https://gss.uvic.ca/wp-content/uploads/2020/01/Orientation-Social-Image.jpg",
  location: {
    latitude: 48.466136567816996,
    longitude: -123.30747612930818,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.GRADUATE_BUILDING),
};

const LibBuildingExample: Building = {
  name: "McPherson Library",
  code: BUILDING_CODES.MCPHERSON_LIBRARY,
  description:
    "The centre includes an enhanced learning commons, a media commons, an international commons, collaborative learning classrooms, the Bibliocafe and educational support services.",
  image:
    "https://www.uvic.ca/info/_assets/images/content-main/buildings-mearns-720x405.jpg",
  location: {
    latitude: 48.463314927944296,
    longitude: -123.30976598859489,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: foodVendorExamples.filter((vendor) => vendor.building_code === BUILDING_CODES.MCPHERSON_LIBRARY),
};

const buildingExamples: Building[] = [
  coveBuildingExample,
  subBuildingExample,
  bookStoreBuildingExample,
  macBuildingExample,
  GradBuildingExample,
  MysticBuildingExample,
  LibBuildingExample,
];

export { Building, buildingExamples };
