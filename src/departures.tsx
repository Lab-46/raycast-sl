import { Detail, useNavigation } from "@raycast/api";
import Stations from "./components/stations";
import Departures from "./components/departures";

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
