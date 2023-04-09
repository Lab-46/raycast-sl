import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { IStation } from "../types";

interface ListStationProps {
  onSelect: (station: IStation) => void;
  station: IStation;
}

export default function ListStation({ onSelect, station }: ListStationProps) {
  return (
    <List.Item
      accessories={[{ icon: Icon.ArrowRight }]}
      actions={
        <ActionPanel>
          <Action
            title="Select"
            onAction={() => {
              onSelect(station);
            }}
          />
        </ActionPanel>
      }
      id={[station.Name, station.Location].join("-")}
      subtitle={station.Location}
      title={station.Name}
    />
  );
}
