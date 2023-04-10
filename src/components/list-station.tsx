import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { IStation } from "../types";
import { ReactNode } from "react";

interface ListStationProps {
  onSelect: (station: IStation) => ReactNode;
  station: IStation;
}

export default function ListStation({ onSelect, station }: ListStationProps) {
  return (
    <List.Item
      accessories={[{ icon: Icon.ArrowRight }]}
      icon={{
        source: Icon.Pin,
        tintColor: Color.SecondaryText,
      }}
      actions={
        <ActionPanel>
          <Action.Push title="Select" target={onSelect(station)} />
        </ActionPanel>
      }
      subtitle={station.Location}
      title={station.Name}
    />
  );
}
