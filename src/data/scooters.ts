import type { Scooter } from "@/types";
import { stations } from "./stations";



const batteryLevels = [

    98,95,93,90,88,

    85,82,80,78,76,

    73,70,68,65,63,

    60,58,55,52,50,

];



const createStationScooters = (): Scooter[] => {


    const scooters: Scooter[] = [];

    let batteryIndex = 0;



    stations.forEach((station)=>{


        station.scooterIds.forEach((id)=>{


            scooters.push({
                id,
                stationId: station.id,
                location: station.name,
                battery: batteryLevels[batteryIndex % batteryLevels.length],
                latitude: station.latitude,
                longitude: station.longitude,
                status: "available", // <-- AQUI
            });


            batteryIndex++;


        });


    });


    return scooters;

};





const movingScooters: Scooter[] = [


    {
        id:"ZN901",

        battery:87,

        location:"Em utilização",

        latitude:-9.3899,

        longitude:-40.5018,
        status: "in_use"
    },


    {
        id:"ZN902",

        battery:72,

        location:"Em utilização",

        latitude:-9.3928,

        longitude:-40.4966,
        status: "in_use"
    },


    {
        id:"ZN903",

        battery:64,

        location:"Em utilização",

        latitude:-9.3972,

        longitude:-40.5029,
        status: "in_use"
    },


    {
        id:"ZN904",

        battery:81,

        location:"Em utilização",

        latitude:-9.3958,

        longitude:-40.4944,
        status: "in_use"
    },


    {
        id:"ZN905",

        battery:58,

        location:"Em utilização",

        latitude:-9.3873,

        longitude:-40.4978,
        status: "in_use"
    },


    {
        id:"ZN906",

        battery:91,

        location:"Em utilização",

        latitude:-9.3826,

        longitude:-40.5001,
        status: "in_use"
    },


    {
        id:"ZN907",

        battery:69,

        location:"Em utilização",

        latitude:-9.3914,

        longitude:-40.5063,
        status: "in_use"
    },


    {
        id:"ZN908",

        battery:76,

        location:"Em utilização",

        latitude:-9.3847,

        longitude:-40.4928,
        status: "in_use"
    },


];



export const scooters: Scooter[] = [

    ...createStationScooters(),

    ...movingScooters,

];