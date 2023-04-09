import axios from "axios";
import { API_URL } from "./constants";
import { Station } from "../types";

export async function getStations(search: string) {
  if (!search || typeof search !== "string") {
    return [];
  }

  return axios.get<Station[]>(API_URL + `/stations?search=${search}`).then((res) => res.data);
}
