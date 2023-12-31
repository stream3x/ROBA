import jwtDecode from 'jwt-decode';

import justLogo from '../images/justlogo500.png';
import BackLinkButton from '../components/BackLinkButton.jsx';
import UserBigIcon from '../components/UserBigIcon.jsx';
import UserSquare from '../components/UserSquare.jsx';

const UserProfile = () => {

  const userToken = localStorage.getItem('loggedUser');
  const decodedToken = jwtDecode(userToken);


  return (
    <div className="container">
      <img src={justLogo} style={{width: '50px'}}/><h2>PROFILO PERSONALE</h2>
      <BackLinkButton />
      <UserSquare user={{
        avatar: decodedToken.avatar.url,
        name: decodedToken.name,
        surname: decodedToken.surname,
        address: decodedToken.position.address
      }}/>
    </div>
  )
}

export default UserProfile;
