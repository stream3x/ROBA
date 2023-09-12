import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import RobaCard from '../components/RobaCard.jsx'
import LoaderModal from '../components/LoaderModal.jsx'

const LoggedHomePage = () => {

  //----- CATTURA DATI UTENTE-----//

  const userToken = localStorage.getItem('loggedUser');
  const decodedToken = jwtDecode(userToken);

  // ----- CHIAMATA FETCH PER RICEVERE GLI OGGETTI ROBA ----- //

  const [robaArray, setRobaArray] = useState([]);
  const [isFetchPending, setIsFetchPending] = useState(true);

  const getRobaData = async () => {
    console.log("HERE");
    try {
      const response = await fetch('http://localhost:6060/roba', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

        if(response.ok) {
          const robaData = await response.json();
          console.log('robaData: ', robaData);
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
    setIsFetchPending(false);
  }, [robaArray]);

  // ----- //


  return (
    <div className="container">
    <h3>Ecco gli oggetti offerti attorno a te:</h3>
      <div className="roba-box-container">
      {

        isFetchPending ? (
          <p></p>
        ) : (

        robaArray.length !== 0 && robaArray.map((element) => (

          element.supplier._id !== decodedToken.id ? (
            <RobaCard key={element._id} data={element} />
          ) : (
            <></>
          )

        ))
      )

      }
      </div>

      {isFetchPending && <LoaderModal isFetchPending={isFetchPending} />}
    </div>
  )
}

export default LoggedHomePage;
