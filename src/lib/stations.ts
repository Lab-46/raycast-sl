import axios from "axios";
import { API_URL } from "./constants";
import { ListStation } from "../types";

export async function getStations(search: string) {
  if (!search || typeof search !== "string") {
    return [];
  }

  return axios.get<ListStation[]>(API_URL + `/stations?search=${search}`).then((res) => res.data);
}
