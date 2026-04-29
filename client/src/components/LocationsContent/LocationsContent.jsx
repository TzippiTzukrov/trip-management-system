import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import useLocations from '../../hooks/useLocations';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FitBounds({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = locations.map((loc) => [loc.lat, loc.lng]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations, map]);
  return null;
}

export default function LocationsContent() {
  const { locations, loading, error } = useLocations();

  if (loading) return <p>טוען מיקומים...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[31.7683, 35.2137]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds locations={locations} />
        {locations.map((loc) => (
          <Marker key={loc._id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name} ({loc.id})</strong><br />
              {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}