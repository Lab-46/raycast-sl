import { Departure as DepartureType } from "../types";
import { List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { TRANSPORT_MODE_TO_ICON } from "../lib/constants";
import { uppercaseFirst } from "../lib/utils";

interface DepartureProps {
  departure: DepartureType;
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
      title={[departure.LineNumber, departure.Destination].join(" → ")}
      key={departure.JourneyNumber}
      id={departure.JourneyNumber.toString()}
      icon={{
        source: TRANSPORT_MODE_TO_ICON[departure.TransportMode],
        tintColor: Color.SecondaryText,
      }}
      accessories={[
        {
          tag: {
            value: departure.DisplayTime,
            color: Color.PrimaryText,
          },
        },
        ...(departure.TransportMode === "METRO"
          ? [
              {
                text: uppercaseFirst(departure.GroupOfLine),
              },
              {
                icon: {
                  source: Icon.CircleFilled,
                  tintColor: Color[departure.Color],
                },
              },
            ]
          : []),
      ]}
    />
  );
}
