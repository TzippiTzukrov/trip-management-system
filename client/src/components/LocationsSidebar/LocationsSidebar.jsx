import { useEffect, useState } from 'react';
import useLocations from '../../hooks/useLocations';
import calculateDistance from '../../utils/distanceCalculator';
import './LocationsSidebar.css';

export default function LocationsSidebar({ setWarning, setWarningContent }) {
  const [showInputView, setShowInputView] = useState(false);

  const [teacherId, setTeacherId] = useState('');
  const [activeTeacherId, setActiveTeacherId] = useState(null);

  const [isWarningEnabled, setIsWarningEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { locations } = useLocations();
  console.log('render', locations.length, isWarningEnabled, activeTeacherId);

  useEffect(() => {
    console.log('effect ran', isWarningEnabled, activeTeacherId, locations.length);
    console.log(locations);

    if (!isWarningEnabled || !activeTeacherId) {
      setWarning("");
      return;
    }

    console.log('locations:', JSON.stringify(locations));
    console.log('teacherId:', activeTeacherId, 'locations ids:', locations.map(l => l.id));
    const teacherLocation = locations.find(loc => loc.id === activeTeacherId);

    if (!teacherLocation) {
      setWarning("");
      setErrorMsg('לא נמצאה מורה עם מספר זה');
      return;
    }

    const studentLocations = locations.filter(loc => loc.id !== activeTeacherId);

    const farStudents = calculateDistance(studentLocations, teacherLocation);

    if (farStudents.length > 0) {
      setWarning("אזהרה: תלמידות מתרחקות מהמורה!");
      setWarningContent(farStudents);

    } else {
      setWarning("");
      setWarningContent([]);

    }
  }, [locations, isWarningEnabled, activeTeacherId]);

   const toggleWarning = () => {
    const newState = !isWarningEnabled;

    setIsWarningEnabled(newState);
    setErrorMsg('');

    if (!newState) {
      setActiveTeacherId(null);
      setWarning("");
    }
  };

  const handleWarningSubmit = (e) => {
    e.preventDefault();
    console.log('submit', teacherId);
    if (!teacherId) return;

    setErrorMsg('');
    setActiveTeacherId(teacherId);
    setTeacherId('');
  };

  return (
    <div className="locations-sidebar">

      <button
        type="button"
        onClick={toggleWarning}
      >
        {isWarningEnabled
          ? "כיבוי התראה על התרחקות תלמידות"
          : "הפעלת התראה על התרחקות תלמידות"}
      </button>

      {isWarningEnabled && (
        <form onSubmit={handleWarningSubmit}>
          <div>
            <input
              type="text"
              placeholder="הזיני מספר מורה"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            />
            <button type="submit">↩</button>
          </div>
        </form>
      )}

      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}
