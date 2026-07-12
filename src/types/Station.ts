export type Station = {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  capacity: number;

  availableScooters: number;

  scooterIds: string[];
};