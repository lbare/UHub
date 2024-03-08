import { FoodVendor, foodVendorExamples } from "./FoodVendor";
import Coordinates from "./Coordinates";

type Building = {
  name: string;
  description: string;
  image: string;
  location: Coordinates;
  vendors: FoodVendor[];
};

const coveBuildingExample: Building = {
  name: "Building One",
  description:
    "Dining facility featuring a 700 person seating capacity across two levels with an open concept and food court",
  image: "https://www.uvic.ca/services/food/assets/images/cove-stairs",
  location: {
    latitude: 48.4642124,
    longitude: -123.3072343,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: [foodVendorExamples.entree, foodVendorExamples.greens],
};

const subBuildingExample: Building = {
  name: "Student Union Building",
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
  vendors: [foodVendorExamples.felicitas, foodVendorExamples.thegrill, foodVendorExamples.munchie, foodVendorExamples.hfb],
};

const bookStoreBuildingExample: Building = {
  name: "University of Victoria Bookstore",
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
  vendors: [foodVendorExamples.starbucks, foodVendorExamples.uniClub],
};


const macBuildingExample: Building = {
  name: "MAC's",
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
  vendors: [foodVendorExamples.mac],
};

const MysticBuildingExample: Building = {
  name: "Jamie Cassels center",
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
  vendors: [foodVendorExamples.chopbox, foodVendorExamples.fresco, foodVendorExamples.treks ],
};

const GradBuildingExample: Building = {
  name: "Jamie Cassels center",
  description:
    "Home on campus for UVIC graduate students",
  image:
    "https://gss.uvic.ca/wp-content/uploads/2020/01/Orientation-Social-Image.jpg",
  location: { 
    latitude: 48.466136567816996, 
    longitude: -123.30747612930818,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  vendors: [foodVendorExamples.gradhouse],
};

const LibBuildingExample: Building = {
  name: "Mcpherson Library",
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
  vendors: [foodVendorExamples.biblio],
};

const buildingExamples: Building[] = [
  coveBuildingExample,
  subBuildingExample,
  bookStoreBuildingExample,
  macBuildingExample,
  GradBuildingExample,
  MysticBuildingExample,
  LibBuildingExample
];

export { Building, buildingExamples };
