import { useState, useEffect } from 'react';

const LoaderModal = ({ isFetchPending }) => {

  useEffect(() => {
    console.log("From modal isFetchPending: ", isFetchPending);
  }, [isFetchPending])

  return (
    <div className={`modal-screen ${isFetchPending ? 'modal-screen-show-add' : ''}`}>
      <div className="custom-loader"></div>
    </div>
  )
}

export default LoaderModal;
