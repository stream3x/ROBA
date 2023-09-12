import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import justLogo from '../images/justlogo500.png';
import leftArrow from '../images/left-arrow.png';
import locationIcon from '../images/location.png';
import LoaderModal from '../components/LoaderModal.jsx';
import ModalAlert from '../components/ModalAlert.jsx';
import MapView from '../components/MapView.jsx';

const RegisterPage = () => {

  // ----- GESTIONE MODALE LOADER ----- //

  const [isFetchPending, setIsFetchPending] = useState(false);
  const [isFetchDone, setIsFetchDone] = useState(false)
  const [isError, setIsError] = useState(false);

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

  const navigate = useNavigate();

  const backLink = () => {
    navigate('/');
  }

  // ----- GESTISCO L'UPLOAD DELL'IMMAGINE ----- //

  const [imageUploaded, setImageUploaded] = useState('');

  const [isTooBigAlert, setIsTooBigAlert] = useState(false); // gestione chiusura modale
  const handleOnClose = () => {
    setIsTooBigAlert(false);
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
      TransformFile(file);
  }

  const TransformFile = (file) => {
    const reader = new FileReader();
    const maxFileSize = 4 * 1024 * 1024;

    if(file) {

      if(file.size > maxFileSize) {
        setIsTooBigAlert(true);
        setImageUploaded('');
        return;
      }

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUploaded(reader.result)
      }
    } else {
      setImageUploaded('');
    }
  }

  useEffect(() => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      avatar: imageUploaded
    }))
  }, [imageUploaded])

  // ----- GESTIONE CLICK SULLA MAPPA ----- //

  const handleMapClick = (coordinates) => {

        //----- FETCH DI RICHIESTA NOME CITTA' -----//

          const fetchCityFromCoordinates = async () => {
            try {
              const res = await fetch(`https://api.maptiler.com/geocoding/${coordinates.lng},${coordinates.lat}.json?KEY=9gGPrBTJ97kVESJhzvbz`);

                if(!res.ok) {
                  throw new Error('Failed to fetch data');
                }

                const cityData = await res.json();

                setInputData(prevInputData => ({
                  ...prevInputData,
                  position: {
                    coordinates: coordinates,
                    address: cityData.features[0].place_name_it
                  }
                }))
            } catch (error) {
              console.error('Error fetching city: ', error)
            }
          }

          fetchCityFromCoordinates();

        //-----//

  }

  // ----- //

  // ----- CHIAMATA FETCH PER L'INVIO DEI DATI ----- //

  const registerUser = async (e) => {

    setIsFetchPending(true)
    const dateObject = new Date(inputData.birthdate);

    try {
      const response = await fetch('http://localhost:6060/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        //
      } else {
        console.log('Errore: ', response);
        setIsError(true);
      }
    } catch (error) {
      console.log('Error type: ', error);
      setIsError(true);
    }
    setIsFetchPending(false);
    setIsFetchDone(true);
  }

  // ----- //

  return (
    <div className="container">
      <img src={justLogo} style={{width: '50px'}}/><h2>Pagina di registrazione</h2>
      <img src={leftArrow} className="left-arrow" onClick={backLink} />
      <div className="border-box">

        {isFetchDone ? (

          !isError ? (
            <h3>Nuovo utente inserito con successo.</h3>
          ) : (
            <h3>Qualcosa è andato storto. Torna indietro e riprova.</h3>
          )

      ) : (

        <div className="border-box-form-add">
          <h3>Inserisci i tuoi dati:</h3>

          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" onChange={handleInputData} />

          <label htmlFor="surname">Cognome:</label>
          <input type="text" id="surname" onChange={handleInputData} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={handleInputData} />

          <label htmlFor="password">Password (di almeno 8 caratteri):</label>
          <input type="password" id="password" onChange={handleInputData} />

          <label htmlFor="birthdate">Data di nascita:</label>
          <input type="date" id="birthdate" onChange={handleInputData} />

          <hr />

          <label htmlFor="avatar">Foto del profilo (Max 5mb):</label>
          <input className="add-file" type="file" accept="image/" id="avatar" onChange={handleUploadImage} />
          <div>
            {
              imageUploaded ? (
                <div>
                  <h6>Anteprima avatar</h6>
                  <img src={imageUploaded} alt="Avatar" style={{width: '100px', opacity: '0.5'}}/>
                </div>
              ) : (
                <h6>Nessuna immagine caricata</h6>
              )
            }
          </div>

          <hr />

          <label htmlFor="position">Indirizzo di casa (dove tieni la tua ROBA):</label>
          <div className="coordinates-div" id="cityAddress">{inputData.position.address}</div>

          <h5><img src={locationIcon} style={{width: '20px'}}/> Nella mappa qui sotto clicca dove si trova casa tua (dove tieni la tua ROBA).
          <br /><br />
          Utilizza lo zoom per essere più preciso, verrà indicato l'indirizzo in automatico qui sopra.
          <br /><br />
          Questo passaggio è importante per consigliarti gli oggetti in offerta più vicini a te!</h5>

          <hr />

          <h5>Quando hai compilato tutti i campi del form clicca il tasto qui sotto:</h5>
          <button onClick={registerUser} >Invia i tuoi dati</button>
        </div>

      )}

      </div>

      {!isFetchDone ? (<div className="map-box">
        <MapView onMapClick={handleMapClick} />
      </div>) : (<></>)}

      {isFetchPending && <LoaderModal isFetchPending={isFetchPending} />}
      {isTooBigAlert && <ModalAlert message="Le dimensioni dell'avatar non devono superare i 5mb!" expTime={5000} onClose={handleOnClose} />}
    </div>
  )
}

export default RegisterPage;
