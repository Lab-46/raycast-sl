import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { ListStation as ListStationType } from "../types";

interface ListStationProps {
  station: ListStationType;
}

export default function ListStation({ station }: ListStationProps) {
  return (
    <List.Item
      accessories={[{ icon: Icon.ArrowRight }]}
      actions={
        <ActionPanel>
          <Action title="Select" />
        </ActionPanel>
      }
      id={[station.Name, station.Location].join("-")}
      subtitle={station.Location}
      title={station.Name}
    />
  );
}
