export const leafletHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

    <style>
        html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; }
        body { background: #09090b; }
        .leaflet-control-attribution { display: none; }

        .leaflet-marker-icon { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .circle-active-pulse { animation: circleBreathe 2.5s infinite ease-in-out; }
        @keyframes circleBreathe {
            0% { fill-opacity: 0.08; stroke-opacity: 0.3; }
            50% { fill-opacity: 0.18; stroke-opacity: 0.7; }
            100% { fill-opacity: 0.08; stroke-opacity: 0.3; }
        }

        .user-location-marker { display: flex; justify-content: center; align-items: center; }
        .user-dot { width: 16px; height: 16px; background-color: #3B82F6; border-radius: 50%; border: 3px solid #ffffff; z-index: 2; box-shadow: 0 2px 6px rgba(0,0,0,0.5); }
        .user-pulse { position: absolute; width: 48px; height: 48px; background-color: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: pulse-animation 2s infinite ease-out; z-index: 1; }
        @keyframes pulse-animation { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }

        .zone-label { background: transparent; border: none; box-shadow: none; display: flex; justify-content: center; align-items: center; }

        .station-container { display: flex; flex-direction: column; align-items: center; transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: center 17px; }
        .station-pill { background: #A3E635; color: #09090b; height: 34px; padding: 0 14px; border-radius: 17px; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 800; font-size: 15px; box-shadow: 0 4px 10px rgba(0,0,0,.4); border: 2px solid transparent; transition: all 0.3s ease; }
        .station-pill.expanded { background: #84CC16; border-color: #ffffff; }

        .station-label { margin-top: 6px; color: white; font-size: 12px; font-weight: 600; text-align: center; text-shadow: 0 2px 4px rgba(0,0,0,0.9); max-width: 120px; transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out; }
        .hide-labels .station-label { opacity: 0; transform: translateY(-4px); pointer-events: none; }
        
        .scooter-container { display: flex; flex-direction: column; align-items: center; transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: bottom center; }
        .scooter-battery { background: #27272a; color: #A3E635; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-bottom: 4px; border: 1px solid rgba(163,230,53,0.4); box-shadow: 0 4px 8px rgba(0,0,0,0.3); white-space: nowrap; transition: opacity 0.2s ease, transform 0.2s ease; }
        .scooter-icon-circle { width: 36px; height: 36px; border-radius: 50%; background: #18181b; border: 2px solid #A3E635; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(163,230,53,0.4); transition: all 0.2s ease; }
        .scooter-icon-circle span { color: #A3E635; font-size: 18px; }

        .scooter-container.selected { transform: scale(1.25) !important; z-index: 9999; }
        .scooter-container.selected .scooter-battery { background: #ffffff; color: #09090b; }
        .scooter-container.selected .scooter-icon-circle { background: #A3E635; border-color: #ffffff; box-shadow: 0 0 16px rgba(163,230,53,0.7); }
        .scooter-container.selected .scooter-icon-circle span { color: #09090b; }

        .scooter-container.in-use { opacity: 0.45; pointer-events: none; filter: grayscale(0.8); }
        .scooter-container.in-use .scooter-battery { display: none !important; }

        .zoom-low .scooter-container:not(.selected) { transform: scale(0.85); }
        .zoom-low .scooter-battery { opacity: 0; transform: scale(0.7) translateY(4px); pointer-events: none; }
        .zoom-low .station-container { transform: scale(0.85); }
        .zoom-far .scooter-container:not(.selected) { transform: scale(0.6); }
        .zoom-far .scooter-battery { opacity: 0; transform: scale(0.5) translateY(6px); pointer-events: none; }
        .zoom-far .scooter-icon-circle { box-shadow: 0 0 6px rgba(163,230,53,0.2); }
        .zoom-far .station-container { transform: scale(0.7); }
        .zoom-high .scooter-container:not(.selected) { transform: scale(1.1); }
        .zoom-high .station-container { transform: scale(1.1); }

        /* --- CSS DO DESTINO MOCKADO E ROTA BRILHANTE --- */
        .destination-marker {
            font-size: 28px;
            filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.5));
            text-align: center;
        }
        
        .ride-route-glow {
            filter: drop-shadow(0 0 8px rgba(163, 230, 53, 0.8));
        }
    </style>
</head>
<body>

<div id="map"></div>

<script>

const userLocation = [-9.392412, -40.495726]; 
const map = L.map("map", { zoomControl: false }).setView(userLocation, 16);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution: "OpenStreetMap" }
).addTo(map);

let isDetailedView = false;
const stationMarkers = [];
const stationCircles = [];
const movingScooterMarkers = [];
const stationScooterMarkers = [];

// Variáveis para as rotas e pinos
let plannedRouteLine = null;
let activeRideLine = null;
let destinationPin = null;

// Waypoints mockados compartilhados entre a rota de planejamento (azul)
// e a rota de corrida ativa (verde). Ambas usam o MESMO caminho em zigue-zague.
const mockRouteCoords = [
    userLocation,
    [-9.394, -40.500],
    [-9.392889, -40.496006],
    [-9.394727, -40.496358],
    [-9.394767, -40.496519],
    [-9.391172, -40.501417],
    [-9.390116, -40.500698],
    [-9.387883, -40.500858] // Chegada no Parque Municipal
];

// ==========================================
// 1. GEOFENCING: ZONAS DE INTELIGÊNCIA URBANA
// ==========================================
const forbiddenZonePoints = [
    [-9.401960, -40.515036], [-9.415912, -40.540351], [-9.388984, -40.559921],
    [-9.375605, -40.553913], [-9.356211, -40.548076], [-9.350717, -40.509367],
    [-9.346737, -40.472889], [-9.363397, -40.444931], [-9.393968, -40.451969],
    [-9.406119, -40.469178], [-9.390961, -40.472697], [-9.388208, -40.476684],
    [-9.373831, -40.488103], [-9.378663, -40.507179], [-9.380478, -40.511234],
    [-9.387200, -40.524784],
];
L.polygon(forbiddenZonePoints, {
    color: '#EF4444', weight: 2, dashArray: '6, 6', fillColor: '#EF4444', fillOpacity: 0.12, interactive: false
}).addTo(map);

// ==========================================
// 2. MARCADOR DE LOCALIZAÇÃO DO USUÁRIO (GPS)
// ==========================================
L.marker(userLocation, {
    icon: L.divIcon({
        className: 'user-location-marker',
        html: \`<div class="user-pulse"></div><div class="user-dot"></div>\`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    }),
    interactive: false,
    zIndexOffset: 1000
}).addTo(map);

window.centerOnUser = function() {
    map.flyTo(userLocation, 16, { animate: true, duration: 1 });
};

// ==========================================
// 3. DESENHO DO PLANEJAMENTO DE ROTA (AZUL)
// ==========================================
window.togglePlannedRoute = function(isActive) {
    if (isActive) {
        if (!plannedRouteLine) {
            const destinationCoords = mockRouteCoords[mockRouteCoords.length - 1];

            // Usa TODOS os waypoints (mockRouteCoords), não só o destino,
            // para desenhar a rota em múltiplos segmentos.
            plannedRouteLine = L.polyline(mockRouteCoords, {
                color: '#3B82F6', 
                weight: 4,
                dashArray: '10, 12',
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(map);

            destinationPin = L.marker(destinationCoords, {
                icon: L.divIcon({ className: 'destination-marker', html: '📍', iconSize: [30, 30], iconAnchor: [15, 30] })
            }).addTo(map);

            map.flyToBounds(plannedRouteLine.getBounds(), { padding: [80, 80], animate: true, duration: 1.2 });
        }
    } else {
        if (plannedRouteLine) map.removeLayer(plannedRouteLine);
        if (destinationPin) map.removeLayer(destinationPin);
        plannedRouteLine = null;
        destinationPin = null;
        
        window.centerOnUser(); 
    }
};

// ==========================================
// 4. COMPORTAMENTO DA CORRIDA AO VIVO (VERDE)
// ==========================================
window.toggleRideRoute = function(isActive) {
    if (isActive) {
        if (!activeRideLine) {
            // Remove a rota de planejamento (azul) se existir para dar lugar à verde
            if (plannedRouteLine) map.removeLayer(plannedRouteLine);
            if (destinationPin) map.removeLayer(destinationPin);
            plannedRouteLine = null;
            destinationPin = null;

            // Cria a linha sólida Verde Neon com efeito de "Glow",
            // reaproveitando o mesmo array de waypoints (mockRouteCoords)
            activeRideLine = L.polyline(mockRouteCoords, {
                color: '#A3E635', 
                weight: 6,
                lineCap: 'round',
                lineJoin: 'round',
                className: 'ride-route-glow' 
            }).addTo(map);

            // Adiciona o pino de destino novamente (para visualização durante a corrida)
            destinationPin = L.marker(mockRouteCoords[mockRouteCoords.length - 1], {
                icon: L.divIcon({ className: 'destination-marker', html: '📍', iconSize: [30, 30], iconAnchor: [15, 30] })
            }).addTo(map);

            // Dá um zoom mais próximo no usuário (estilo navegação curva a curva)
            map.flyTo(userLocation, 17, { animate: true, duration: 1.5 });
        }
    } else {
        // Quando clicar em "Encerrar", a linha verde neon some
        if (activeRideLine) {
            map.removeLayer(activeRideLine);
            activeRideLine = null;
        }
        if (destinationPin) {
            map.removeLayer(destinationPin);
            destinationPin = null;
        }
        // A câmera se afasta devolvendo a visão geral da cidade
        map.flyTo(userLocation, 16, { animate: true, duration: 1.0 });
    }
};

function updateZoomClasses() {
    const mapDiv = document.getElementById("map");
    const zoom = map.getZoom();
    
    mapDiv.classList.remove("hide-labels", "zoom-far", "zoom-low", "zoom-med", "zoom-high");
    
    if (zoom < 15) mapDiv.classList.add("hide-labels");
    if (zoom <= 13) mapDiv.classList.add("zoom-far");
    else if (zoom === 14) mapDiv.classList.add("zoom-low");
    else if (zoom >= 17) mapDiv.classList.add("zoom-high");
    else mapDiv.classList.add("zoom-med");

    const shouldBeDetailed = zoom >= 17;
    if (shouldBeDetailed !== isDetailedView) {
        isDetailedView = shouldBeDetailed;
        renderAll();
    }
}

map.on("zoomend", updateZoomClasses);

function clearMarkers(list) {
    list.forEach(marker => map.removeLayer(marker));
    list.length = 0;
}

function createScooterIcon(selected, battery, scooter) {
    const isInUse = scooter && (scooter.status === "in_use" || scooter.location === "Em utilização");
    return L.divIcon({
        className: "custom-marker",
        html: \`
        <div class="scooter-container \${selected ? 'selected' : ''} \${isInUse ? 'in-use' : ''}">
            <div class="scooter-battery">🔋 \${battery}%</div>
            <div class="scooter-icon-circle">
                <span>⚡</span>
            </div>
        </div>\`,
        iconSize:[50, 70],
        iconAnchor:[25, 70]
    });
}

function sendScooterMessage(scooter){
    if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type:"scooter", scooter }));
    }
}

function createScooterMarker(scooter){
    const marker = L.marker([scooter.latitude, scooter.longitude], {
        icon: createScooterIcon(window.selectedScooter === scooter.id, scooter.battery, scooter)
    });
    marker.scooterData = scooter;
    const isInUse = scooter.status === "in_use" || scooter.location === "Em utilização";
    if (!isInUse) {
        marker.on("click", (e) => {
            L.DomEvent.stopPropagation(e);
            sendScooterMessage(scooter);
        });
    }
    return marker;
}

function createStationIcon(station, isExpanded){
    return L.divIcon({
        className:"",
        html:\`
        <div class="station-container">
            <div class="station-pill \${isExpanded ? 'expanded' : ''}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M11.236 1.077c-.503-.311-1.139-.234-1.564.19A1.5 1.5 0 0 0 9.155 2.1l-4.5 12a1.5 1.5 0 0 0 1.93 1.93l3.415-1.28v8.25a1.5 1.5 0 0 0 2.825.707l6-13.5a1.5 1.5 0 0 0-1.785-2.073l-3.805 1.087V2.5a1.5 1.5 0 0 0-1.999-1.423z"/>
                </svg>
                \${station.availableScooters}
            </div>
            <div class="station-label">\${station.name}</div>
        </div>\`,
        iconSize:[120,70],
        iconAnchor:[60,35]
    });
}

function renderAll(){
    clearMarkers(stationMarkers);
    clearMarkers(stationCircles);
    clearMarkers(movingScooterMarkers);
    clearMarkers(stationScooterMarkers);

    if(!window.stations || !window.allScooters) return;

    (window.scooters || []).forEach(scooter => {
        const marker = createScooterMarker(scooter);
        marker.addTo(map);
        movingScooterMarkers.push(marker);
    });

    window.stations.forEach(station => {
        const circle = L.circle([station.latitude, station.longitude], {
            radius: 45, color: "#A3E635", fillColor: "#65A30D", fillOpacity: isDetailedView ? 0.12 : 0.25, weight: isDetailedView ? 1.5 : 2
        });
        circle.addTo(map);
        stationCircles.push(circle);

        if (isDetailedView && circle._path) { circle._path.classList.add("circle-active-pulse"); }

        const marker = L.marker([station.latitude, station.longitude], { icon: createStationIcon(station, isDetailedView) });

        if (!isDetailedView) {
            marker.on("click", () => { map.flyTo([station.latitude, station.longitude], 17, { animate: true, duration: 0.6 }); });
        } else {
            marker.on("click", () => { map.flyTo([station.latitude, station.longitude], 15, { animate: true, duration: 0.6 }); });
        }
        
        marker.addTo(map);
        stationMarkers.push(marker);

        if (isDetailedView) {
            const stationScooters = window.allScooters.filter(s => s.stationId === station.id);
            stationScooters.forEach((scooter, index) => {
                const angle = (index / stationScooters.length) * Math.PI * 2;
                const radius = 0.00075;
                const radialScooter = { ...scooter, latitude: station.latitude + Math.cos(angle) * radius, longitude: station.longitude + Math.sin(angle) * radius };
                const sMarker = createScooterMarker(radialScooter);
                sMarker.addTo(map);
                stationScooterMarkers.push(sMarker);
            });
        }
    });
}

function initializeMapData(){ 
    map.setView(userLocation, 16);
    updateZoomClasses(); 
    renderAll(); 
}
window.initializeMapData = initializeMapData;
window.renderStations = renderAll; 
window.renderMovingScooters = function() {}; 

window.updateSelectedScooter = function(id){
    window.selectedScooter = id;
    const updateIcon = (marker) => {
        if (marker.scooterData) {
            marker.setIcon(createScooterIcon(window.selectedScooter === marker.scooterData.id, marker.scooterData.battery, marker.scooterData));
        }
    };
    movingScooterMarkers.forEach(updateIcon);
    stationScooterMarkers.forEach(updateIcon);
};
</script>
</body>
</html>
`;