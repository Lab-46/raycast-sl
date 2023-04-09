import { Icon } from "@raycast/api";

export const API_URL = "http://localhost:1337";

export const TRANSPORT_MODE_TO_ICON: Record<string, Icon> = {
  METRO: Icon.Train,
  BUS: Icon.Car,
  SHIP: Icon.Boat,
  TRAM: Icon.Train,
  TRAIN: Icon.Train,
};
