import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from '../../../../config/apiKeys';

const Map = () => {
  const mapStyles = {
    height: '40vh',
    width: '100%',
  };

  const defaultPosition = {
    lat: -41.43581888174746,
    lng: 147.14050056912234,
  };

  return (
    <LoadScript googleMapsApiKey={config.googleMap.apiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultPosition}>
        <Marker position={defaultPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
