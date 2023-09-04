import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../images/logo500.png';
import ModalAlert from '../components/ModalAlert.jsx';
import LoggedHomePage from './LoggedHomePage.jsx';

const LoginHomePage = ({ onLogin }) => {

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

  const [isFetchPending, setIsFetchPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const userLogin = async () => {
    setIsFetchPending(true);

    try {
      const response = await fetch('http://localhost:6060/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      })
      if(response.ok) {
        const userDataObject = await response.json();
        console.log("Response data: ", userDataObject);
        localStorage.setItem('loggedUser', userDataObject.token);
        onLogin();
        navigate('/homepage');
      } else {
        const errorData = await response.json();
        console.log("Errore: ", errorData.message);
        setErrorMessage(errorData.message);
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
        <input type="email" id="email" placeholder="Inserisci la tua email" onChange={handleInputData} className={errorMessage ? 'wrong-input' : ''}></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Inserisci la tua password" onChange={handleInputData} className={errorMessage ? 'wrong-input' : ''}></input>
        <button onClick={userLogin}>Accedi</button>
        <a href="#"><h5>(Non sei ancora registrato? Fallo ora!)</h5></a>
      </div>
      {isModalAlert && <ModalAlert message="Benvenuto! Esegui il login per accedere alla piattaforma." expTime={6000} onClose={handleOnClose} />}
      {errorMessage && <ModalAlert message={errorMessage} expTime={3000} onClose={handleOnClose} />}
    </div>
  )
}

export default LoginHomePage;
