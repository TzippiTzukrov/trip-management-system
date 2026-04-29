import './App.css'
import AppRouter from './routers/AppRouter';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { user, setUser, userType, setUserType } = useContext(UserContext);

  return (
    <div className="app-container">
      {user && userType === "teacher" && (
        <Navbar setUser={setUser} setUserType={setUserType} />
      )}
      <AppRouter />
    </div>
  );
}

export default App
