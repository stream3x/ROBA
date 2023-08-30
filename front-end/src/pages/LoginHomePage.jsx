import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import logoImage from '../images/logo500.png';
import ModalAlert from '../components/ModalAlert.jsx';

const LoginHomePage = () => {

const isLogged = useSelector((state) => state.login.value)
console.log(isLogged);

const navigate = useNavigate();
useEffect(() => {
  if(isLogged) {
    navigate('/homepage');
  }
}, [isLogged])

  return (
    <div className="container">
        <img src={logoImage} id="logo-image" alt="Roba logo"/>
      <div className="border-box">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Inserisci la tua email"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="email" placeholder="Inserisci la tua password"></input>
        <button>Accedi</button>
        <a href="#"><h5>(Non sei ancora registrato? Fallo ora!)</h5></a>
      </div>
      <ModalAlert message="Benvenuto! Esegui il login per accedere alla piattaforma." expTime={6000}/>
    </div>
  )
}

export default LoginHomePage;
