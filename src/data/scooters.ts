import type { Scooter } from "@/types";
import { stations } from "./stations";

const batteryLevels = [
    98, 95, 93, 90, 88,
    85, 82, 80, 78, 76,
    73, 70, 68, 65, 63,
    60, 58, 55, 52, 50,
];

const createStationScooters = (): Scooter[] => {
    const scooters: Scooter[] = [];
    let batteryIndex = 0;

    stations.forEach((station) => {
        station.scooterIds.forEach((id) => {
            scooters.push({
                id,
                stationId: station.id,
                location: station.name,
                battery: batteryLevels[batteryIndex % batteryLevels.length],
                latitude: station.latitude,
                longitude: station.longitude,
                status: "available", 
            });

            batteryIndex++;
        });
    });

    return scooters;
};

const movingScooters: Scooter[] = [
    {
        id: "ZN002",
        battery: 87,
        location: "Em utilização",
        latitude: -9.389138, 
        longitude: -40.501658,
        status: "in_use"
    },
    {
        id: "ZN005",
        battery: 72,
        location: "Em utilização",
        latitude: -9.393750, 
        longitude: -40.496168,
        status: "in_use"
    },
    {
        id: "ZN007",
        battery: 64,
        location: "Em utilização",
        latitude: -9.397377,
        longitude: -40.502122,
        status: "in_use"
    },
    {
        id: "ZN013",
        battery: 81,
        location: "Em utilização",
        latitude: -9.396149, 
        longitude: -40.494067,
        status: "in_use"
    },
    {
        id: "ZN017",
        battery: 58,
        location: "Em utilização",
        latitude: -9.388111, 
        longitude: -40.496058,
        status: "in_use"
    },
    {
        id: "ZN033",
        battery: 91,
        location: "Em utilização",
        latitude: -9.402997, 
        longitude: -40.493555,
        status: "in_use"
    },
    {
        id: "ZN034",
        battery: 69,
        location: "Em utilização",
        latitude: -9.400550, 
        longitude: -40.510401,
        status: "in_use"
    },
    {
        id: "ZN035",
        battery: 76,
        location: "Em utilização",
        latitude: -9.398112, 
        longitude: -40.481146,
        status: "in_use"
    },
];

export const scooters: Scooter[] = [
    ...createStationScooters(),
    ...movingScooters,
];