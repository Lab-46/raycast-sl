import ListStation from "../components/ListStation";
import useSWR from "swr";
import { List, Toast, showToast } from "@raycast/api";
import { Station } from "../types";
import { getStations } from "../lib/stations";
import { useState } from "react";

interface StationsProps {
  onSelectStation: (station: Station) => void;
}

export default function Stations({ onSelectStation }: StationsProps) {
  const [search, setSearch] = useState<string>("T-centralen");

  const { data, isLoading, isValidating } = useSWR(["stations", search], () => getStations(search), {
    keepPreviousData: true,
    onError: (error) => {
      showToast({
        title: error.response.data.title,
        message: error.response.data.description,
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
