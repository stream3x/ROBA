import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    setIsModalAlert(true)
  }, [])

  // ----- GESTIONE MODALE ALERT ----- //

  const [isModalAlert, setIsModalAlert] = useState(true);
  const handleOnClose = () => {
    setIsModalAlert(false);
  }

  // ----- //

  // ----- GESTIONE INPUT UTENTE ----- //

  const initialUserInput = {
    email: '',
    password: ''
  }

  const [userInput, setUserInput] = useState(initialUserInput);

  const handleInputData = (event) => {
    const { id, value } = event.target;
    setUserInput(prevUserData => ({
      ...prevUserData,
      [id]: value
    }));
  }

  useEffect(() => {
    console.log(userInput);
  }, [userInput])

  // ----- //

  // ----- CHIAMATA POST PER IL LOGIN ----- //

  const [isFetchPending, setIsFetchPending] = useState(false)

  const userLogin = async () => {
    setIsFetchPending(true);

    try {
      const response = await fetch('http://192.168.0.102:6060/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      })

      if(response.ok) {
        const userDataObject = await response.json();
        console.log("Response data: ", userDataObject);
      } else {
        console.log("Errore: ", response.status);
      }
    } catch (error) {
      console.log('Error type: ', error)
    }

    setIsFetchPending(false);
  }

  // ----- //

  return (
    <div className="container">
        <img src={logoImage} id="logo-image" alt="Roba logo"/>
        <div className="border-box">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Inserisci la tua email" onChange={handleInputData}></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Inserisci la tua password" onChange={handleInputData}></input>
        <button onClick={userLogin}>Accedi</button>
        <a href="#"><h5>(Non sei ancora registrato? Fallo ora!)</h5></a>
      </div>
      {isModalAlert && <ModalAlert message="Benvenuto! Esegui il login per accedere alla piattaforma." expTime={6000} onClose={handleOnClose} />}
    </div>
  )
}

export default LoginHomePage;
