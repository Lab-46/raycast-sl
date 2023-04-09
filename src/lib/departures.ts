import axios from "axios";
import { API_URL } from "./constants";
import { IDeparture } from "../types";

export async function getDepartures(siteId: string) {
  if (!siteId || typeof siteId !== "string") {
    return {
      metros: [],
      buses: [],
      trains: [],
      trams: [],
      ships: [],
    };
  }

  return axios
    .get<{
      metros: IDeparture[];
      buses: IDeparture[];
      trains: IDeparture[];
      trams: IDeparture[];
      ships: IDeparture[];
    }>(API_URL + `/departures?siteId=${siteId}`)
    .then((res) => res.data);
}
