import Fuse, { FuseResult } from "fuse.js";
import { Building } from "../models/Building";
import { menuExample, Menu, MenuItem, MenuItemTag } from "../models/Menu";
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
  curTagFilters: MenuItemTag[] = [];

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

  public addTagFilter = (tag: MenuItemTag) => {
    this.curTagFilters.push(tag);
    console.log("Added Tag Filter:", tag);
    console.log("curTagFilters:", this.curTagFilters);
  };

  public removeTagFilter = (tag: MenuItemTag) => {
    this.curTagFilters = this.curTagFilters.filter((t) => t !== tag);
    console.log("Remove Tag Filter:", tag);
    console.log("curTagFilters:", this.curTagFilters);
  };

  public clearTagFilters = () => {
    this.curTagFilters = [];
  };

  public searchAllMenuItems = (
    searchString: string
  ): Map<MenuItem, FoodVendor> => {
    if (this.fuse_obj === undefined) return new Map<MenuItem, FoodVendor>();

    // TODO: for testing only. Remove after
    // this.addTagFilter(MenuItemTag.GlutenFreeOption);

    let searchResults = this.fuse_obj.search(searchString);
    let fuseSearchResults = searchResults as FuseResult<MenuItem>[];

    console.log("fuseSearchResults:", fuseSearchResults);

    let filteredResults = fuseSearchResults.filter((fuseResultMenuItem) => {
      let item = fuseResultMenuItem.item;
      for (let i = 0; i < this.curTagFilters.length; i++) {
        console.log("item.name:", item?.name);
        console.log("item.tags:", item?.tags);
        if (!item?.tags?.includes(this.curTagFilters[i])) {
          return false;
        }
      }
      return true;
    });

    console.log("filteredResults:", filteredResults);

    const mapItemVenor = new Map<MenuItem, FoodVendor>();
    filteredResults.forEach((fuseResultMenuItem) => {
      const item = fuseResultMenuItem.item;
      const foodVendor = this.allMenuItemWithVendors.get(item);
      if (foodVendor !== undefined) {
        mapItemVenor.set(item, foodVendor);
      }
    });

    console.log("Search Results:", mapItemVenor);
    return mapItemVenor;
  };
}

export default MenuSearch;
