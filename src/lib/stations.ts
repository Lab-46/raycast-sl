import axios from "axios";
import { API_URL } from "./constants";
import { IStation } from "../types";

export async function getStations(search: string) {
  if (!search || typeof search !== "string") {
    return [];
  }

  return axios.get<IStation[]>(API_URL + `/stations?search=${search}`).then((res) => res.data);
}
