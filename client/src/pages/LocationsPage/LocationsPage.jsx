import LocationsContent from "../../components/LocationsContent/LocationsContent";
import LocationsSidebar from "../../components/LocationsSidebar/LocationsSidebar";
import { useState } from 'react';
import './LocationsPage.css';

function LocationsPage() {
  console.log('LocationsPage rendered');
  const [warning, setWarning] = useState(false);
  const [warningContent, setWarningContent] = useState([]);

  return (
    <div className="locations-page">
      {warning && <div className="warning">
        <p>{warning}</p>
        <ul>
          {warningContent.map((location, index) => (
            <li key={index}>{location.name || location.id}</li>
          ))}
        </ul>

      </div>}
      <LocationsSidebar setWarning={setWarning} setWarningContent={setWarningContent} />
      <LocationsContent />
    </div>
  );
}

export default LocationsPage;
