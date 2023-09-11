import { useState } from 'react';

const UserHeader = ({ id, avatarUrl, name, surname, position }) => {

  //----- FETCH DI RICHIESTA NOME CITTA' -----//

    // UTILIZZA UNO USEEFFECT PER EVITARE CHIAMATE RIPETUTE

    // const [cityAddress, setCityAddress] = useState('');
    //
    // const fetchCityFromPosition = async () => {
    //
    //   try {
    //     const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`);
    //
    //       if(!res.ok) {
    //         throw new Error('Failed to fetch data');
    //       }
    //
    //       const cityData = await res.json();
    //       console.log('cityData: ', cityData);
    //       setCityAddress(cityData.display_name);
    //   } catch (error) {
    //     console.error('Error fetching city: ', error)
    //   }
    // }
    //
    // fetchCityFromPosition();

  //-----//

  return (
    <div className="user-header">
      <div className="user-header-icon"><img src={avatarUrl} /></div>
      <div className="user-header-info">
        <h6 className="white">Id: {id}</h6>
        <h3>{name} {surname}</h3>
        <h6>{/*cityAddress*/}</h6>
      </div>
    </div>
  )
}

export default UserHeader;
