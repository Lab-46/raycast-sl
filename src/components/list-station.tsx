import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { IStation } from "../types";
import { ReactNode } from "react";

interface ListStationProps {
  onSelect: (station: IStation) => ReactNode;
  onToggleFavorite: (station: IStation) => void;
  isFavorite?: boolean;
  station: IStation;
}

export default function ListStation({ isFavorite, onSelect, onToggleFavorite, station }: ListStationProps) {
  return (
    <List.Item
      accessories={[
        ...(isFavorite ? [{ icon: { source: Icon.Heart, tintColor: Color.Red }, tooltip: "Favorite station" }] : []),
        { icon: Icon.ArrowRight },
      ]}
      icon={{
        source: Icon.Geopin,
        tintColor: Color.SecondaryText,
      }}
      actions={
        <ActionPanel>
          <Action.Push title="Select" target={onSelect(station)} icon={Icon.ArrowRight} />
          <Action
            title={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
            icon={{
              source: isFavorite ? Icon.HeartDisabled : Icon.Heart,
              tintColor: Color.Red,
            }}
            shortcut={{ modifiers: isFavorite ? ["cmd", "shift"] : ["cmd"], key: "s" }}
            onAction={() => {
              onToggleFavorite(station);
            }}
          />
        </ActionPanel>
      }
      subtitle={station.Location}
      title={station.Name}
    />
  );
}
