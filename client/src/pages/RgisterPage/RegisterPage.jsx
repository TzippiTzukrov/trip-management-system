import './RegisterPage.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import useAuth from '../../hooks/useAuth';
import translateMsgs from '../../utils/translateMsgs';

function RegisterPage() {
  const { userType, setUserType, setUser} = useContext(UserContext);
  const { registerTeacher, registerStudent } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    className: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChangeUserType = () => {
    setUserType(prev => prev === 'student' ? 'teacher' : 'student');
    setFormData({
      firstName: '',
      lastName: '',
      id: '',
      className: ''
    });
  };

  const handleSubmit = async (formData) => {
    try {
      setError('');
      const res = userType === 'student'
        ? await registerStudent(formData)
        : await registerTeacher(formData);
      setUser(res);
      navigate(userType === 'student' ? '/success' : '/management');
    } catch (err) {
      setError(translateMsgs(err.message));
    }
  };

  return (
    <div className="register-page">
      <h1 className='welcome-title'>ברוכות הבאות למערכת לניהול טיול שנתי</h1>
      <h2 className='register-title'>
        {userType === 'student' ? 'רישום תלמידה' : 'רישום מורה'}
      </h2>
      <h3 className='change-user-type-link'>
        <a
          href="#"
          className='change-user-type-link'
          onClick={handleChangeUserType}
        >
          {userType === 'student'
            ? 'להרשמה כמורה לחצי כאן'
            : 'להרשמה כתלמידה לחצי כאן'}
        </a>
      </h3>
      <form className='register-form' onSubmit={(e) => {
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
        <label>שם הכיתה
          <input type="text"
            placeholder="שם הכיתה"
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            required />
        </label>
        <button type="submit">הרשמה למערכת</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      <p>מורה רשומה? <button onClick={() => {navigate('/login'); setUserType('teacher')}}>התחברי כאן</button></p>
    </div>
  );
}

export default RegisterPage;