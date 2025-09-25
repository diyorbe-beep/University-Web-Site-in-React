import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '15px'
  };

  const center = {
    lat: 40.7828, 
    lng: 72.3456  
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAXv4RQK39CskcIB8fvM1Q7XCofZcLxUXw">
      <GoogleMap
        key={'AIzaSyAXv4RQK39CskcIB8fvM1Q7XCofZcLxUXw'}
        
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
