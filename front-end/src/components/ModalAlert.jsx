import { useState, useEffect } from 'react';

const ModalAlert = ({ message, expTime, onClose }) => {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000)
  }, [])

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setShowModal(false);
        setTimeout(() => {
          onClose();
        }, 1000)
      }, expTime)
    }
  }, [showModal])

  return (
    <div className={`modal-alert ${showModal ? 'modal-alert-show-add' : ''}`}>
      <h4>{message}</h4>
    </div>
  )
}

export default ModalAlert;
