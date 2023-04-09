import Departure from "./departure";
import useSWR from "swr";
import { List, Toast, showToast } from "@raycast/api";
import { IStation } from "../types";
import { getDepartures } from "../lib/departures";
import { uppercaseFirst } from "../lib/utils";
import { TRANSPORT_MODES } from "../lib/constants";
import { useState } from "react";

interface StationProps {
  station: IStation;
}

export default function Departures({ station }: StationProps) {
  // Local state
  const [transportMode, setTransportMode] = useState<string>("all");

  // Server state
  const { data, isLoading, mutate, isValidating } = useSWR(
    [station.SiteId, "departures"],
    () => getDepartures(station.SiteId),
    {
      refreshInterval: 10 * 1000, // 10 sec
      onError: (error) => {
        showToast({
          title: error.response?.data?.title || "Failed to retrieve departures",
          message: error.response?.data?.description,
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
      searchBarAccessory={
        <List.Dropdown value={transportMode} tooltip="Transport mode" onChange={setTransportMode}>
          <List.Dropdown.Item title="All" value="all" key="all" />

          {TRANSPORT_MODES.map((TRANSPORT_MODE) => (
            <List.Dropdown.Item title={uppercaseFirst(TRANSPORT_MODE)} key={TRANSPORT_MODE} value={TRANSPORT_MODE} />
          ))}
        </List.Dropdown>
      }
    >
      {data &&
        Object.entries(data)
          .filter(([tm]) => (transportMode === "all" ? true : tm === transportMode))
          .map(([transportMode, departures]) => (
            <List.Section key={transportMode} title={uppercaseFirst(transportMode)}>
              {departures.map((departure) => (
                <Departure
                  key={departure.JourneyNumber}
                  departure={departure}
                  onRefresh={() => {
                    mutate();
                  }}
                />
              ))}
            </List.Section>
          ))}
    </List>
  );
}
