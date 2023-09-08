import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

import osm from '../leaflet/osmProvider.js';
import MapEvent from './MapEvent.jsx';
import locationIcon from '../images/location.png';


const MapView = ({ onMapClick }) => {

  const [center, setCenter] = useState({ lat: 45.5357166159217, lng: 10.539696977141636 });
  const zoomLevel = 9;
  const mapRef = useRef();

  const [position, setPosition] = useState(null);

  const markerIcon = new Icon({
    iconUrl: locationIcon,
    iconSize: [25]
  })


  return (
    <div className="leaflet-container">
      <MapContainer className="map-container" center={center} zoom={zoomLevel} ref={mapRef}>
        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
        <MapEvent onMapClickEvent={onMapClick} setPosition={setPosition} />

        {position && (
          <Marker position={position} icon={markerIcon}>
            <Popup>
              <p>Coordinate: </p>
            </Popup>
          </Marker>
        )}

      </MapContainer>
    </div>
  )
}

export default MapView;
