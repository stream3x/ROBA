  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import LoginHomePage from './pages/LoginHomePage.jsx';
  import LoggedHomePage from './pages/LoggedHomePage.jsx';
  import AddNewRoba from './pages/AddNewRoba.jsx';
  import UserProfile from './pages/UserProfile.jsx';
  import ProtectedRoute from './middlewares/ProtectedRoutes.js';
  import Navbar from './components/navbar.jsx';
  import RegisterPage from './pages/RegisterPage.jsx';
  import MyRoba from './pages/MyRoba.jsx';

  function App() {

    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('loggedUser'));

    useEffect(() => {
      setIsLogged(!!localStorage.getItem('loggedUser'))
    }, [])

    // ----- GESTIONE DELL'AGGIORNAMENTO DI STATO PER REINDIRIZZARE LA NAVBAR ----- //

    const handleLogin = () => {
      setIsLogged(true);
    }

    const handleLogout = () => {
      setIsLogged(false);
    }

    // ----- //

    return (
        <Router>
        {isLogged && <Navbar onLogout={handleLogout}/>}
          <Routes>
            <Route exact path="/" element={isLogged ? <Navigate to="/homepage" /> : <LoginHomePage onLogin={handleLogin}/>} />
            <Route exact path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route exact path="/homepage" element={<LoggedHomePage />} />
              <Route exact path="/newRoba" element={<AddNewRoba />} />
              <Route exact path="/userProfile" element={<UserProfile />} />
              <Route exact path="/myRoba" element={<MyRoba />} />
            </Route>
          </Routes>
        </Router>
    );
  }

  export default App;
