import { useState } from 'react';

const UserHeader = ({ id, avatarUrl, name, surname, position }) => {

  return (
    <div className="user-header">
      <div className="user-header-icon"><img src={avatarUrl} /></div>
      <div className="user-header-info">
        <h6 className="white">Id: {id}</h6>
        <h3>{name} {surname}</h3>
        <h6>{position.address}</h6>
      </div>
    </div>
  )
}

export default UserHeader;
