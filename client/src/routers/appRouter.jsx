import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RgisterPage/RegisterPage';
import SuccessPage from '../pages/SuccessPage/SuccessPage';
import ManagementPage from '../pages/ManagementPage/ManagementPage';
import LocationsPage from '../pages/LocationsPage/LocationsPage';

function AppRouter() {
  const { user, setUser, userType } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/login" element={
        !user ? <LoginPage /> : <Navigate to={userType === "teacher" ? "/management" : "/success"} replace />
      } />
      <Route path="/register" element={
        !user ? <RegisterPage /> : <Navigate to={userType === "teacher" ? "/management" : "/success"} replace />
      } />
      <Route path="/management" element={
        user && userType === "teacher" ? <ManagementPage /> : <Navigate to="/register" replace />
      } />
      <Route path="/locations" element={
        user && userType === "teacher" ? <LocationsPage /> : <Navigate to="/register" replace />
      } />
      <Route path="/success" element={
        user && userType === "student" ? <SuccessPage setUser={setUser} /> : <Navigate to="/register" replace />
      } />
      <Route path="*" element={
        <Navigate to={user ? (userType === "teacher" ? "/management" : "/success") : "/register"} replace />
      } />
    </Routes>
  );
}

export default AppRouter;