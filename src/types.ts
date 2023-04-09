export interface Station {
  Location?: string;
  Name: string;
  Products: null;
  SiteId: string;
  Type: string;
  X: string;
  Y: string;
}

export interface Departure {
  GroupOfLine: string;
  DisplayTime: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime: string;
  JourneyNumber: number;
  Deviations: null;
  Color: "Green" | "Red" | "Blue";
}
