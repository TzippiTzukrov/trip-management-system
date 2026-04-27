import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export default function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let cancelled = false;

    (async () => {
      try {
        const r = await fetch(`${SOCKET_URL}/api/locations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        if (!cancelled) setLocations(await r.json());
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const socket = io(SOCKET_URL, { auth: { token } });

    socket.on('locationUpdated', (updated) => {
      setLocations((prev) => {
        const exists = prev.find((l) => l.id === updated.id);
        return exists
          ? prev.map((l) => l.id === updated.id ? updated : l)
          : [...prev, updated];
      });
    });

    return () => {
      cancelled = true;
      socket.disconnect();
    };
  }, []);

  return { locations, loading, error };
}