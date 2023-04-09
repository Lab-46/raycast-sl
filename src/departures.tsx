import { Detail, useNavigation } from "@raycast/api";
import Stations from "./components/Stations";
import Departures from "./components/Departures";

export default function Command() {
  const { push } = useNavigation();

  return (
    <Stations
      onSelectStation={(station) => {
        push(<Departures station={station} />);
      }}
    />
  );
}
