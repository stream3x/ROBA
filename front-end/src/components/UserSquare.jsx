import UserBigIcon from './UserBigIcon.jsx';

const UserSquare = ({ user }) => {

  const { avatar, name, surname, address } = user;

  return (
    <div className="border-box">
      <UserBigIcon userAvatar={avatar}/>
      <h1>{name} {surname}</h1>
      <h4>{address}</h4>
    </div>
  )
}

export default UserSquare;
