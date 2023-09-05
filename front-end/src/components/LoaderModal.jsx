import { useState, useEffect } from 'react';

const LoaderModal = ({ isFetchPending }) => {

  return (
    <div className={`modal-screen ${isFetchPending ? 'modal-screen-show-add' : ''}`}>
      <div className="custom-loader"></div>
    </div>
  )
}

export default LoaderModal;
