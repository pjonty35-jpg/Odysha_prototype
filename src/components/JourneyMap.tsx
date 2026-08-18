import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface JourneyStop {
  day: number;
  name: string;
  lat: number;
  lng: number;
}

interface JourneyMapProps {
  stops: JourneyStop[];
}

const JourneyMap: React.FC<JourneyMapProps> = ({ stops }) => {
  const center: [number, number] = [20.15, 85.85];

  const route = stops.map(
    (stop) => [stop.lat, stop.lng] as [number, number]
  );

  /*
   * Odysha-style numbered destination marker
   */
  const createNumberIcon = (day: number) => {
    return L.divIcon({
      className: 'odysha-map-marker',
      html: `
        <div class="odysha-marker">
          <span>${day}</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -22],
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-[18px]">

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >

        {/* Map tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Odysha route */}
        {route.length > 1 && (
          <>
            {/* subtle route shadow */}
            <Polyline
              positions={route}
              pathOptions={{
                color: '#ffffff',
                weight: 8,
                opacity: 0.85,
              }}
            />

            {/* actual route */}
            <Polyline
              positions={route}
              pathOptions={{
                color: '#315337',
                weight: 4,
                opacity: 0.95,
              }}
            />
          </>
        )}

        {/* Destination markers */}
        {stops.map((stop) => (
          <Marker
            key={`${stop.day}-${stop.name}`}
            position={[stop.lat, stop.lng]}
            icon={createNumberIcon(stop.day)}
          >
            <Popup>
              <div className="min-w-[150px] px-1 py-1">

                <div className="text-[11px] font-semibold tracking-wide text-[#c9552d]">
                  DAY {stop.day}
                </div>

                <div className="mt-1 font-serif text-[17px] font-semibold text-[#182f59]">
                  {stop.name}
                </div>

              </div>
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />

      </MapContainer>


    </div>
  );
};

export default JourneyMap;