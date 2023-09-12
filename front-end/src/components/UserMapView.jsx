import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';

import osm from '../leaflet/osmProvider.js';
import locationIcon from '../images/marker2.png';


const UserMapView = ({ userCoordinates, userName }) => {

  const [center, setCenter] = useState({ lat: userCoordinates.lat, lng: userCoordinates.lng });
  const zoomLevel = 16;
  const mapRef = useRef();

  const markerIcon = new Icon({
    iconUrl: locationIcon,
    iconSize: [80, 80]
  })

  return (
    <div className="user-map-box">
    <div className="user-leaflet-container">
      <MapContainer className="user-map-container" center={center} zoom={zoomLevel} ref={mapRef}>

        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

          <Marker position={userCoordinates} icon={markerIcon}>
            <Popup autoOpen={true} offset={[0, -30]}>
              <p>ROBA di {userName}</p>
            </Popup>
          </Marker>
        )}

      </MapContainer>
    </div>
    </div>
  )
}

export default UserMapView;
