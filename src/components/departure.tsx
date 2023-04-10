import { IDeparture } from "../types";
import { List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { TRANSPORT_MODE_TO_ICON } from "../lib/constants";
import { getDepartureAccessories } from "../lib/departures";

interface DepartureProps {
  departure: IDeparture;
  onRefresh: () => void;
}

export default function Departure({ onRefresh, departure }: DepartureProps) {
  return (
    <List.Item
      actions={
        <ActionPanel>
          <Action
            shortcut={{ key: "r", modifiers: ["cmd"] }}
            icon={Icon.ArrowClockwise}
            title="Refresh"
            onAction={onRefresh}
          />
        </ActionPanel>
      }
      title={[departure.LineNumber, departure.Destination].join(departure.JourneyDirection === 1 ? " ↑ " : " ↓ ")}
      key={departure.JourneyNumber}
      icon={{
        source: TRANSPORT_MODE_TO_ICON[departure.TransportMode],
        tintColor: Color.SecondaryText,
      }}
      accessories={getDepartureAccessories(departure)}
    />
  );
}
