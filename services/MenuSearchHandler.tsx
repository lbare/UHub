import Fuse from "fuse.js";
import { Building, buildingExamples } from "../models/Building";
import { menuExample, Menu } from "../models/Menu";
import { FoodVendor } from "../models/FoodVendor";

class MenuSearchHandler {

  fuse_obj: any;
  myArray: any[] = [];

  constructor() {
    this.fuse_obj = new Fuse(buildingExamples, {
      keys: [], // TODO: add proper keys
    });
  }

  searchMenu(searchString: string) : Menu[] {
    return this.fuse_obj.search(searchString);
  }
}

export default MenuSearchHandler;


