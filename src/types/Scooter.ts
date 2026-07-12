export interface Scooter {
  id: string;
  stationId?: string;
  latitude: number;
  longitude: number;
  battery: number;
  location: string;
  status: "available" | "in_use"; 
}