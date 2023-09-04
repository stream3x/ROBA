import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import justLogo from '../images/justlogo500.png';
import leftArrow from '../images/left-arrow.png';
import LoaderModal from '../components/LoaderModal.jsx'

const RegisterPage = () => {

  // ----- GESTIONE MODALE LOADER ----- //

  const [isFetchPending, setIsFetchPending] = useState(false);

  // ----- //

  // ----- MEMORIZZAZIONE DATI INPUT ----- //

  const initialInput = {
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
    position: '',
    avatar: ''
  }

  const [inputData, setInputData] = useState(initialInput);

  const handleInputData = (event) => {
    const { id, value } = event.target;

    if (id === 'birthdate') {
      const isValidate = /^\d{4}-\d{2}-\d{2}$/.test(value);
      if (isValidate) {
        setInputData(prevInputData => ({
          ...prevInputData,
          [id]: new Date(value)
        }))
      }
    } else {
    setInputData(prevInputData => ({
      ...prevInputData,
      [id]: value
    }));
  };
}

useEffect(() => {
  console.log(inputData);
}, [inputData])

  // ----- //

  // ----- CHIAMATA FETCH PER L'INVIO DEI DATI ----- //

  const registerUser = async () => {

    setIsFetchPending(true)
    const dateObject = new Date(inputData.birthdate);

    try {
      const response = await fetch('http://192.168.0.102:6060/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
      } else {
        console.log('Errore: ', response);
      }
    } catch (error) {
      console.log('Error type: ', error);
    }
    setIsFetchPending(false)
  }

  // ----- //

  const navigate = useNavigate();

  const backLink = () => {
    navigate('/');
  }

  return (
    <div className="container">
      <img src={justLogo} style={{width: '50px'}}/><h2>Pagina di registrazione</h2>
      <img src={leftArrow} className="left-arrow" onClick={backLink} />
      <div className="border-box border-box-register-add">
        <h3>Inserisci i tuoi dati:</h3>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" onChange={handleInputData} />
        <label htmlFor="surname">Cognome:</label>
        <input type="text" id="surname" onChange={handleInputData} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={handleInputData} />
        <label htmlFor="password">Password (di almeno 8 caratteri):</label>
        <input type="password" id="password" onChange={handleInputData} />
        {/* <label htmlFor="repeat-password">Ripeti password:</label>
        <input type="password" id="repeatPassword" className="left-input" onChange={handleInputData} /> */}
        <label htmlFor="birthdate">Data di nascita:</label>
        <input type="date" id="birthdate" onChange={handleInputData} />
        <label htmlFor="position">Indirizzo di casa (dove tieni la tua ROBA):</label>
        <input type="position" id="position" onChange={handleInputData} />
        <label htmlFor="avatar">Avatar:</label>
        <input type="url" id="avatar" onChange={handleInputData} />
        <button onClick={registerUser} >Invia i tuoi dati</button>
      </div>

      {isFetchPending && <LoaderModal isFetchPending={isFetchPending} />}
    </div>
  )
}

export default RegisterPage;
