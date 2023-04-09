import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { Station } from "../types";

interface ListStationProps {
  onSelect: (station: Station) => void;
  station: Station;
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
