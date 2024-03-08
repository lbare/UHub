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
  vendors: [foodVendorExamples.felicitas, foodVendorExamples.thegrill],
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

const buildingExamples: Building[] = [
  coveBuildingExample,
  subBuildingExample,
  bookStoreBuildingExample,
];

export { Building, buildingExamples };
