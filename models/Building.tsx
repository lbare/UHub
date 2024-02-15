import { FoodVendor, foodVendorExample } from './FoodVendor';
import Coordinates from './Coordinates'

type Building = {
    name: string;
    description: string;
    image: string;
    location: Coordinates;
    vendors: FoodVendor[];
};

const coveBuildingExample = {
    name: "Building One",
    description: "Dining facility featuring a 700 person seating capacity across two levels with an open concept and food court",
    image: "https://www.uvic.ca/services/food/assets/images/cove-stairs",
    location: {
        latitude: 48.46421240,
        longitude: -123.30723430,
      },
    vendors: [foodVendorExample]
}

export {Building, coveBuildingExample}

