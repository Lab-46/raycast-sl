import ListStation from "./list-station";
import useSWR from "swr";
import { IStation } from "../types";
import { List, Toast, showToast } from "@raycast/api";
import { ReactNode, useState } from "react";
import { addStationToFavorites, getFavoritStations, getStations, removeStationFromFavorites } from "../lib/stations";

interface StationsProps {
  onSelectStation: (station: IStation) => ReactNode;
}

export default function Stations({ onSelectStation }: StationsProps) {
  // Local state
  const [search, setSearch] = useState<string>("");

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

  const {
    data: favoriteStationsData,
    isLoading: isFavoriteStationsLoading,
    isValidating: isFavoriteStationsValidating,
  } = useSWR("favorite-stations", getFavoritStations);

  return (
    <List
      filtering={false}
      isLoading={isLoading || isValidating || isFavoriteStationsLoading || isFavoriteStationsValidating}
      navigationTitle="Stations"
      onSearchTextChange={setSearch}
      searchBarPlaceholder="Search stations"
      throttle
    >
      {data && (
        <List.Section title="All stations">
          {data.map((station) => {
            const isFavorite = favoriteStationsData?.some(({ SiteId }) => SiteId === station.SiteId);

            return (
              <ListStation
                key={[station.Name, station.Location].join("-")}
                onSelect={onSelectStation}
                onToggleFavorite={isFavorite ? removeStationFromFavorites : addStationToFavorites}
                isFavorite={isFavorite}
                station={station}
              />
            );
          })}
        </List.Section>
      )}

      {favoriteStationsData && (
        <List.Section title="Favorite stations">
          {favoriteStationsData.map((station) => (
            <ListStation
              isFavorite
              key={["favorites", station.Name, station.Location].join("-")}
              onSelect={onSelectStation}
              onToggleFavorite={removeStationFromFavorites}
              station={station}
            />
          ))}
        </List.Section>
      )}
    </List>
  );
}
