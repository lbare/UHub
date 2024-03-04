import { collection, getDocs, doc } from "firebase/firestore"; 
import {db} from "../src/firebase";
import { Building, buildingExamples } from "../models/Building";
import { FoodVendor } from "../models/FoodVendor";

class DataFetcher {
    collectionName: string;

    //Our app is making excessive calls to the database, quick fix to cache the data
    //need to come up with a better solution for milestone 2
    buildings_cache : Building[] = [];

    fetch_count : number = 0;
  
    constructor(collectionName: string = "Building") {
      this.collectionName = collectionName;
    }
  
    getAllBuildings(success: (data: Building[]) => void) {

      this.fetch_count++;
      console.log("Fetching buildings: ", this.fetch_count);
      
      if (this.buildings_cache.length > 0) {
        success(this.buildings_cache);
        return;
      }
      
      success(buildingExamples);
      return;

      const dataCollection = collection(db, this.collectionName);
      getDocs(dataCollection)
        .then( documents => {
          const buildings = documents.docs.map(doc => doc.data() as Building);
          this.buildings_cache = buildings;
          success(buildings);
        })
        .catch(error => {
          console.error("Error fetching buildings: ", error);
        });

  }

  getAllFoodVendorsInBuilding(building: Building) : FoodVendor[] {
      return building.vendors;
  }
}

export default DataFetcher;


