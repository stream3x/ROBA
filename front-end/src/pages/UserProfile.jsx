import jwtDecode from 'jwt-decode';

import justLogo from '../images/justlogo500.png';
import BackLinkButton from '../components/BackLinkButton.jsx';
import UserBigIcon from '../components/UserBigIcon.jsx';

const UserProfile = () => {

  const userToken = localStorage.getItem('loggedUser');
  const decodedToken = jwtDecode(userToken);
  console.log(decodedToken);


  return (
    <div className="container">
      <img src={justLogo} style={{width: '50px'}}/><h2>PROFILO PERSONALE</h2>
      <BackLinkButton />
      <div className="border-box">
        <UserBigIcon userAvatar={decodedToken.avatar.url}/>
        <h1>{decodedToken.name} {decodedToken.surname}</h1>
        <h3 className="dark-grey">{decodedToken.email}</h3>
        <h4>{decodedToken.position.address}</h4>
      </div>
    </div>
  )
}

export default UserProfile;
