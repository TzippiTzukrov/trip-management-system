import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const { logout } = useAuth();
  return (
    <nav>
      <h1>מערכת לניהול טיול שנתי</h1>
      <ul>
        <li><Link to="/management">ניהול תלמידות ומורות</Link></li>
        <li><Link to="/locations">מפת מיקומי תלמידות בזמן אמת</Link></li>
        <li><button onClick={logout}>התנתקות מהמערכת</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;