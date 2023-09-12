import { useNavigate } from 'react-router-dom';

import leftArrow from '../images/left-arrow.png';

const BackLinkButton = () => {

  const navigate = useNavigate();

  const backLink = () => {
    navigate('/homepage');
  }

  return (
    <img src={leftArrow} className="left-arrow" onClick={backLink} />
  )
}

export default BackLinkButton;
