import { addStudent } from '../services/studentsService';
import { addTeacher } from '../services/teachersService';
import { enterTeacher } from '../services/authService';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const authChannel = useRef(new BroadcastChannel('auth'));

  useEffect(() => {
    const channel = authChannel.current;

    channel.onmessage = (event) => {
      if (event.data.type === 'LOGOUT') {
        localStorage.removeItem('token'); 
        setUser(null);            
        navigate('/register');   
      }
    };

    return () => { channel.onmessage = null; };

  }, [navigate, setUser]);

  const registerStudent = async (details) => {
    const res = await addStudent(details);
    return res.student;
  };

  const registerTeacher = async (details) => {
    const res = await addTeacher(details);
    localStorage.setItem('token', res.token);
    return res.teacher;
  };

  const loginTeacher = async (formData) => {
    const res = await enterTeacher(formData);
    localStorage.setItem('token', res.token);
    return res.teacher;
  };

  const logout = () => {
    authChannel.current.postMessage({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    setUser(null);       
    navigate('/register');
  };

  return { registerStudent, registerTeacher, loginTeacher, logout };
}