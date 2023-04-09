import ListStation from "./list-station";
import useSWR from "swr";
import { IStation } from "../types";
import { List, Toast, showToast } from "@raycast/api";
import { ReactNode, useState } from "react";
import { getStations } from "../lib/stations";

interface StationsProps {
  onSelectStation: (station: IStation) => ReactNode;
}

export default function Stations({ onSelectStation }: StationsProps) {
  // Local state
  const [search, setSearch] = useState<string>("T-centralen");

  // Server state
  const { data, isLoading, isValidating } = useSWR(["stations", search], () => getStations(search), {
    keepPreviousData: true,
    onError: (error) => {
      showToast({
        title: error.response?.data?.title || "Failed to retrieve stations",
        message: error.response?.data?.description,
        style: Toast.Style.Failure,
      });
    },
  });

  return (
    <List
      filtering={false}
      isLoading={isLoading || isValidating}
      navigationTitle="Stations"
      onSearchTextChange={setSearch}
      searchBarPlaceholder="Search stations"
      throttle
    >
      {data?.map((station) => (
        <ListStation onSelect={onSelectStation} key={[station.Name, station.Location].join("-")} station={station} />
      ))}
    </List>
  );
}
