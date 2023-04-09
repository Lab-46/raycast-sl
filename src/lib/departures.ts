import axios from "axios";
import { API_URL } from "./constants";
import { IDeparture } from "../types";

export async function getDepartures(siteId: string) {
  if (!siteId || typeof siteId !== "string") {
    return [];
  }

  return axios.get<IDeparture[]>(API_URL + `/departures?siteId=${siteId}`).then((res) => res.data);
}
