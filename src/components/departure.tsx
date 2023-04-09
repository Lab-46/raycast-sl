import { IDeparture } from "../types";
import { List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { TRANSPORT_MODE_TO_ICON } from "../lib/constants";
import { uppercaseFirst } from "../lib/utils";

interface DepartureProps {
  departure: IDeparture;
  onRefresh: () => void;
}

export default function Departure({ onRefresh, departure }: DepartureProps) {
  const isDeparturingNow = departure.DisplayTime === "Nu";

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
      icon={{
        source: TRANSPORT_MODE_TO_ICON[departure.TransportMode],
        tintColor: Color.SecondaryText,
      }}
      accessories={[
        ...(departure.TransportMode === "METRO"
          ? [
              ...(departure.Color
                ? [
                    {
                      text: {
                        value: `${uppercaseFirst(departure.Color.toLowerCase())} line`,
                        color: Color[departure.Color],
                      },
                      icon: {
                        source: Icon.Minus,
                        tintColor: Color[departure.Color],
                      },
                    },
                  ]
                : []),
            ]
          : []),
        {
          tag: {
            value: isDeparturingNow ? "Now" : departure.DisplayTime,
            color: isDeparturingNow ? Color.Green : Color.PrimaryText,
          },
        },
      ]}
    />
  );
}
