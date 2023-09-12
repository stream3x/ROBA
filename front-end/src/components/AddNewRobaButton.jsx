import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/addRobaButton.css';

const AddNewRobaButton = () => {

  //----- GESTISCO COMPARSA DEL BUTTON -----//

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const getTime = () => {

    setTimeout(() => {
      setIsButtonVisible(true);
    }, [2000])

  }

  useEffect(() => {
    getTime();
  }, [])

  const navigate = useNavigate();

  const goToAddNewRoba = () => {
    navigate('/newRoba');
  }

  //-----//

  //----- GESTISCO MESSAGGIO BUTTON -----//

  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  }

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  }

  /////

  return (

      <div
        className={!isButtonVisible ? 'add-roba-button' : 'add-roba-button visible'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={goToAddNewRoba}
      >
      <div className="add-roba-line-1"></div>
      <div className="add-roba-line-2"></div>
        {isMouseEnter && <div className="add-button-message">Metti in offerta un tuo oggetto</div>}
      </div>

  )
}

export default AddNewRobaButton;
