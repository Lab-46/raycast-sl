import ListStation from "../components/ListStation";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { Icon, List } from "@raycast/api";
import { getStations } from "../lib/stations";
import { useState } from "react";

export default function Stations() {
  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading } = useSWR(["stations", search], () => getStations(search), {
    keepPreviousData: true,
  });

  return (
    <List
      onSearchTextChange={debounce(setSearch, 200)}
      searchBarPlaceholder="Search stations"
      navigationTitle="Stations"
      isLoading={isLoading}
      filtering={false}
    >
      {data?.length ? (
        data.map((station) => <ListStation key={[station.Name, station.Location].join("-")} station={station} />)
      ) : error ? (
        <List.EmptyView
          description="We could unfortunately not retrieve any stations"
          icon={Icon.ExclamationMark}
          title="Something went wrong"
        />
      ) : (
        <List.EmptyView
          description="Search for a metro or bus station in Stockholm"
          icon={Icon.Train}
          title="Search for a station"
        />
      )}
    </List>
  );
}
