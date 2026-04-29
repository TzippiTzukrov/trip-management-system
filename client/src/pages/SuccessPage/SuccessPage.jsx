import { useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import './SuccessPage.css';

function SuccessPage() {
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-container">
      <h1>נרשמת בהצלחה!</h1>
    </div>
  );
}

export default SuccessPage;
