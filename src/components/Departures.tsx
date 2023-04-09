import Departure from "./Departure";
import useSWR from "swr";
import { List, Toast, showToast } from "@raycast/api";
import { Station } from "../types";
import { getDepartures } from "../lib/departures";

interface StationProps {
  station: Station;
}

export default function Departures({ station }: StationProps) {
  const { data, isLoading, mutate, isValidating } = useSWR(
    [station.SiteId, "departures"],
    () => getDepartures(station.SiteId),
    {
      refreshInterval: 10 * 1000, // 10 sec
      onError: (error) => {
        showToast({
          title: error.response.data.title,
          message: error.response.data.description,
          style: Toast.Style.Failure,
        });
      },
    }
  );

  return (
    <List
      searchBarPlaceholder={`Search departures from ${station.Name}`}
      isLoading={isLoading || isValidating}
      navigationTitle={station.Name}
    >
      {data?.map((departure) => (
        <Departure
          key={departure.JourneyNumber}
          departure={departure}
          onRefresh={() => {
            mutate();
          }}
        />
      ))}
    </List>
  );
}
