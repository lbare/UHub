import { Context, createContext } from "react";
import { Building } from "../models/Building";

export const BuildingContext: Context<Building[]> = createContext<Building[]>(
  []
);
