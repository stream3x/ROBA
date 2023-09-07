import { MapContainer, TileLayer } from 'react-leaflet';
import osm from '../leaflet/osmProvider.js';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';


const MapView = () => {

  const [center, setCenter] = useState({ lat: 45.5357166159217, lng: 10.539696977141636 });
  const zoomLevel = 18;
  const mapRef = useRef();

  return (
    <div className="leaflet-container">
      <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
      </MapContainer>
    </div>
  )
}

export default MapView;
