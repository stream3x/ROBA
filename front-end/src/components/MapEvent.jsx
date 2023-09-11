import { useMapEvent } from 'react-leaflet';

const MapEvent = ({ onMapClickEvent, setPosition }) => {

  const map = useMapEvent('click', (event) => {

    onMapClickEvent(event.latlng);
    setPosition(event.latlng);
  })

  return null;
}

export default MapEvent;
