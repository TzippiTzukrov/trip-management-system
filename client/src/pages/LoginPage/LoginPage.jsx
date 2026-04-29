import './loginPage.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import useAuth from '../../hooks/useAuth';
import translateMsgs from '../../utils/translateMsgs';

function LoginPage() {
  const { setUser, setUserType } = useContext(UserContext);
  const { loginTeacher } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setError('');
      const teacher = await loginTeacher(formData);
      setUser(teacher);
      setUserType('teacher');
      navigate('/management');
    } catch (err) {
      setError(translateMsgs(err.message));
    }
  };

  return (
    <div className="login-page">
      <h1 className='welcome-title'>ברוכות הבאות למערכת לניהול טיול שנתי</h1>
      <h2>התחברות</h2>
      <form className='login-form' onSubmit={async (e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}>
        <label>שם פרטי
          <input type="text"
            placeholder="שם פרטי"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required />
        </label>
        <label>שם משפחה
          <input type="text"
            placeholder="שם משפחה"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required />
        </label>
        <label>תעודת זהות
          <input type="text"
            placeholder="תעודת זהות (9 ספרות)"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            required
            pattern="\d{9}" />
        </label>
        <button type="submit">התחברות למערכת</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      <p>עדיין לא רשומה? <button onClick={() => navigate('/register')}>הירשמי כאן</button></p>
    </div>
  );
}

export default LoginPage;