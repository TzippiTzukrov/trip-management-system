function getDistanceInKm(loc1, loc2) {
  const R = 6371;

  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * Math.PI / 180) *
    Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
export default function calculateDistance(locations, teacherLocation) {

  const farLocations = locations.filter(loc => {
    const distance = getDistanceInKm(loc, teacherLocation);
    return distance > 3;
  });
  
  return farLocations;
}

