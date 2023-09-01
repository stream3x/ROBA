import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginHomePage from './pages/LoginHomePage.jsx';
import LoggedHomePage from './pages/LoggedHomePage.jsx';
import { useSelector } from 'react-redux';

import Navbar from './components/navbar.jsx'

function App() {

  const isLogged = useSelector((state) => state.login.value)
  console.log(isLogged);

  return (
    <div>
      {isLogged && <Navbar />}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginHomePage />} />
          <Route exact path="/homepage" element={<LoggedHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
