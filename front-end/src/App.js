import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginHomePage from './components/LoginHomePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
