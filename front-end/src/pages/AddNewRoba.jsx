import { useState, useEffect } from  'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import justLogo from '../images/justlogo500.png';
import BackLinkButton from '../components/BackLinkButton.jsx';
import UserHeader from '../components/UserHeader.jsx';
import LoaderModal from '../components/LoaderModal.jsx';

const AddNewRoba = () => {

  //----- CATTURA DATI UTENTE-----//

  const userToken = localStorage.getItem('loggedUser');
  const decodedToken = jwtDecode(userToken);

  //----- GESTISCO INPUT UTENTE -----//

  const  initialInput = {
    robaName: '',
    supplier: decodedToken.id,
    category: 'Arredamento',
    description: '',
    photo: '',
    status: 'Nuovo',
    dismantled: false,
    stuffThought: '',
  }

  const [inputData, setInputData] = useState(initialInput);

  const handleInputData = (event) => {

    const { id, value, type, checked } = event.target;

    if(type === 'checkbox' && id === 'dismantled') {
      setInputData(prevInputData => ({
        ...prevInputData,
        [id]: checked
      }))
    } else {
      setInputData(prevInputData => ({
        ...prevInputData,
        [id]: value
      }))
    }
  }

  useEffect(() => {
    console.log(inputData)
  }, [inputData])

  //-----//

  const navigate = useNavigate();

  const backLink = () => {
    navigate('/homepage');
  }

  //-----GESTISCO L'UPLOAD DELLA FOTO-----//

  const [uploadedImage, setUploadedImage] = useState('');

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    TransformFile(file);
  }

  const TransformFile = (file) => {
    const reader = new FileReader();

    if(file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      }
    } else {
      setUploadedImage('');
    }
  }

  useEffect(() => {
    setInputData(prevInputData => ({
      ...prevInputData,
      photo: uploadedImage
    }))
  }, [uploadedImage])

  //-----//

  //----- GESTIONE FETCH INSERIMENTO OGGETTO ROBA -----//

  const [isFetchPending, setIsFetchPending] = useState(false);
  const [isFetchDone, setIsFetchDone] = useState(false);
  const [isError, setIsError] = useState(false);

  const addRoba = async () => {
    setIsFetchPending(true);

    try {

      const response = await fetch('http://localhost:6060/roba/new', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      })

      if(response.ok) {
        const robaData = await response.json();
      } else {
        console.log('Errore: ', response);
        setIsError(true);
      }

    } catch (error) {
      console.log('Error type: ', error)
      setIsError(true);
    }
    setIsFetchPending(false);
    setIsFetchDone(true);
  }

  //-----//

  return (

    <div className="container">
      <img src={justLogo} style={{width: '50px'}}/><h2>Pagina di inserimento nuovo oggetto ROBA</h2>
      <BackLinkButton />
      <div className="border-box">

        {isFetchDone ? (

          !isError ? (
            <h3>Il tuo nuovo oggetto ROBA è stato inserito con successo.</h3>
          ) : (
            <h3>Qualcosa è andato storto. Torna indietro e riprova.</h3>
          )


      ) : (

        <div className="border-box-form-add">

          <UserHeader
            id={decodedToken.id}
            avatarUrl={decodedToken.avatar.url}
            name={decodedToken.name}
            surname={decodedToken.surname}
            position={decodedToken.position}
          />

          <hr />

          <h3>Inserisci i dati dell'oggetto ROBA che desideri mettere in offerta:</h3>

          <label htmlFor="robaName">Nome oggetto ROBA:</label>
          <input style={{width: '100%'}}type="text" id="robaName" onChange={handleInputData} />

          <label>Seleziona una categoria:</label>
          <select className="roba-category-select" id="category" onChange={handleInputData}>
            <option value='Arredamento'>Arredamento</option>
            <option value='Soprammobili'>Soprammobili</option>
            <option value='Elettrodomestici'>Elettrodomestici</option>
            <option value='Giochi'>Giochi</option>
            <option value='Vestiti'>Vestiti</option>
            <option value='Libri'>Libri</option>
            <option value='Attrezzi sportivi'>Attrezzi sportivi</option>
            <option value='Attrezzi da lavoro'>Attrezzi da lavoro</option>
            <option value='Altro'>Altro</option>
          </select>

          <label htmlFor="description">Descrivi il prodotto:</label>
          <textarea id="description" onChange={handleInputData} />

          <label htmlFor="photo">Foto dell'oggetto</label>
          <input className="add-file" type="file"  accept="image/" id="photo" onChange={handleUploadImage}/>

          <div>
            {
              uploadedImage ? (
                <div>
                  <h6>Anteprima avatar</h6>
                  <img src={uploadedImage} alt="Avatar" style={{width: '100px', opacity: '0.5'}}/>
                </div>
              ) : (
                <h6>Nessuna immagine caricata</h6>
              )
            }
          </div>

          <hr />

          <label>Seleziona le condizioni dell'oggetto:</label>
          <select className="roba-category-select" id="status" onChange={handleInputData}>
            <option value='Nuovo'>Nuovo</option>
            <option value='In buono stato'>In buono stato</option>
            <option value='In stato accettabile'>In stato accettabile</option>
            <option value='Con parti mancanti'>Con parti mancanti</option>
            <option value='Da riparare'>Da riparare</option>
          </select>

          <div className="dismantled">
          <input type="checkbox" id="dismantled" checked={inputData.dismantled} onChange={handleInputData} />
            <label>Spunta questa casella se l'oggetto è smontato o imballato</label>
          </div>

          <hr />

          <label htmlFor="description">Se hai qualche pensiero o qualche ricordo legato a questo oggetto, potresti scriverlo qui sotto (opzionale):</label>
          <textarea id="stuffThought" onChange={handleInputData} />

          <hr />

          <h5>Quando hai compilato tutti i campi obbligatori del form clicca il tasto qui sotto:</h5>
          <button onClick={addRoba}>Invia i tuoi dati</button>

        </div>
      )}

      </div>

      {isFetchPending && <LoaderModal isFetchPending={isFetchPending} />}

    </div>
  )
}

export default AddNewRoba;
