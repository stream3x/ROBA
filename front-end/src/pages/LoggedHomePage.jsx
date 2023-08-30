import { useState, useEffect } from 'react';

import RobaCard from '../components/RobaCard.jsx'

const LoggedHomePage = () => {

  // ----- CHIAMATA FETCH PER RICEVERE GLI OGGETTI ROBA ----- //

  const [robaArray, setRobaArray] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);

  const getRobaData = async () => {

    try {
      const response = await fetch('http://localhost:6060/roba', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

        if(response.ok) {
          const robaData = await response.json();
          setRobaArray(robaData.payload);
        } else {
          console.log('Errore durante la chiamata al server.')
        }

      } catch (error) {
        console.log('Error type: ', error);
      }
  }

  useEffect(() => {
    getRobaData();
  }, []);

  useEffect(() => {
    setIsLoadingFetch(false);
  }, [robaArray]);

  // ----- //


  return (
    <div className="container">
    <h3>Ecco gli oggetti offerti attorno a te:</h3>
      <div className="roba-box-container">
      {

        isLoadingFetch ? (
          <p>Caricamento in corso</p>
        ) : (
        robaArray.length !== 0 && robaArray.map((element) => (
          <RobaCard key={element._id} data={element} />
        ))
      )

      }
      </div>
    </div>
  )
}

export default LoggedHomePage;
