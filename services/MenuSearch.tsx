import Fuse, { FuseResult } from "fuse.js";
import { Building } from "../models/Building";
import { menuExample, Menu, MenuItem } from "../models/Menu";
import DataFetcher from "./DataFetcher";
import { FoodVendor } from "../models/FoodVendor";

class MenuSearch {
  fuse_obj: any = undefined;
  dataFetcher = new DataFetcher();
  allBuildings: Building[] = [];

  allMenuItemWithVendors: Map<MenuItem, FoodVendor> = new Map<
    MenuItem,
    FoodVendor
  >();
  allMenuItem: MenuItem[] = [];

  constructor() {
    this.dataFetcher.getAllBuildings((buildings) => {
      this.allBuildings = buildings;
      this.getAllMenuItems();

      this.fuse_obj = new Fuse(this.allMenuItem, {
        keys: ["name"],
      });
    });
  }

  private getAllMenuItems = () => {
    let allFoodVendors: FoodVendor[] = [];
    this.allBuildings.forEach((building) => {
      building.vendors.forEach((foodVendor) => {
        allFoodVendors.push(foodVendor);
        foodVendor.menu.sections.forEach((section) => {
          section.items.forEach((item) => {
            this.allMenuItem.push(item);
            this.allMenuItemWithVendors.set(item, foodVendor);
          });
        });
      });
    });
  };

  public searchAllMenuItems = (
    searchString: string
  ): Map<MenuItem, FoodVendor> => {
    console.log(`searchTerm: ${searchString}`);

    if (this.fuse_obj === undefined) return new Map<MenuItem, FoodVendor>();

    let filteredMenu = this.fuse_obj.search(searchString);

    let filteredFuseMenuResult = filteredMenu as FuseResult<MenuItem>[];

    const mapItemVenor = new Map<MenuItem, FoodVendor>();
    filteredFuseMenuResult.forEach((fuseResultMenuItem) => {
      const item = fuseResultMenuItem.item;
      const foodVendor = this.allMenuItemWithVendors.get(item);
      if (foodVendor !== undefined) {
        mapItemVenor.set(item, foodVendor);
      }
    });

    console.log(filteredFuseMenuResult);

    return mapItemVenor;
  };
}

export default MenuSearch;
