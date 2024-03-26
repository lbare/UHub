import Fuse, { FuseResult } from "fuse.js";
import { Building } from "../models/Building";
import { MenuItem, MenuItemTag } from "../models/Menu";
import DataFetcher from "./DataFetcher";
import { FoodVendor } from "../models/FoodVendor";
import { isVendorCurrentlyOpen } from "../models/VendorHours";

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
  curBuildingFilters: string[] = [];
  curVendorFilters: string[] = [];

  constructor(buildings: Building[]) {
    this.allBuildings = buildings;
    this.getAllMenuItems();

    this.fuse_obj = new Fuse(this.allMenuItem, {
      keys: ["name"],
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
  };

  public removeTagFilter = (tag: MenuItemTag) => {
    this.curTagFilters = this.curTagFilters.filter((t) => t !== tag);
  };

  public clearTagFilters = () => {
    this.curTagFilters = [];
  };

  public setBuildingFilters = (buildingFilters: string[]) => {
    this.curBuildingFilters = buildingFilters;
    this.createVendorFilterFromBuildingFilter();
  };

  private createVendorFilterFromBuildingFilter = () => {
    // rebuilding vendor list, reset existing filters
    this.curVendorFilters = [];

    // If filter includes "ALL" building tag, then no need to filter by vendors
    if (this.curBuildingFilters.includes("ALL")) {
      return;
    }

    // Add vendors from the chosen building to the filters
    this.curBuildingFilters.forEach((building) => {
      let buildingObj = this.allBuildings.find((b) => b.code === building);
      if (buildingObj === undefined) {
        return;
      }
      buildingObj.vendors.forEach((vendor) => {
        this.curVendorFilters.push(vendor.name);
      });
    });
  };

  public searchAllMenuItems = (
    searchString: string,
    openVendors: boolean = false
  ): Map<MenuItem, FoodVendor> => {
    if (this.fuse_obj === undefined) return new Map<MenuItem, FoodVendor>();

    // Search for menu items matching searchString
    let searchResults = this.fuse_obj.search(searchString);
    let fuseSearchResults = searchResults as FuseResult<MenuItem>[];

    // Filter found results by Menu Item tags
    let filteredByTag = fuseSearchResults.filter((fuseResultMenuItem) => {
      let item = fuseResultMenuItem.item;
      for (let i = 0; i < this.curTagFilters.length; i++) {
        if (!item?.tags?.includes(this.curTagFilters[i])) {
          return false;
        }
      }
      return true;
    });

    // Map vendors to remaining food item results
    const mapItemVendor = new Map<MenuItem, FoodVendor>();
    filteredByTag.forEach((fuseResultMenuItem) => {
      const item = fuseResultMenuItem.item;
      const foodVendor = this.allMenuItemWithVendors.get(item);
      if (foodVendor !== undefined) {
        mapItemVendor.set(item, foodVendor);
      }
    });

    // Filter remaining results by Vendor filters
    const mapItemVendorFiltered =
      this.curVendorFilters.length <= 0
        ? mapItemVendor
        : new Map<MenuItem, FoodVendor>(
            [...mapItemVendor].filter(([_, vendor]) => {
              return this.curVendorFilters?.includes(vendor?.name);
            })
          );

    // Filter remaining results by open vendors
    const mapItemVendorCurrentlyOpen = openVendors
      ? new Map<MenuItem, FoodVendor>(
          [...mapItemVendorFiltered].filter(([_, vendor]) => {
            return isVendorCurrentlyOpen(vendor.hours);
          })
        )
      : mapItemVendorFiltered;

    // return final filtered results
    return mapItemVendorCurrentlyOpen;
  };
}

export default MenuSearch;
