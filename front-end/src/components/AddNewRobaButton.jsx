import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/addRobaButton.css';

const AddNewRobaButton = () => {

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


  return (

      <div className={!isButtonVisible ? 'add-roba-button' : 'add-roba-button visible'} onClick={goToAddNewRoba}>
      <div className="add-roba-line-1"></div>
      <div className="add-roba-line-2"></div>
      </div>

  )
}

export default AddNewRobaButton;
