import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin";

import "./styles.css";

const Map = ({ coordinates, zoomLevel, height, properties }) => {
  const API_KEY = "AIzaSyDNW_ocjiuPLhMfYyEmqua3XMpSAFuLahY";

  const getDefaultCenter = () => {
    const centerPoint = Math.ceil(coordinates.length / 2);
    return { lat: coordinates[centerPoint][0], lng: coordinates[centerPoint][1] };
  }

  const handleApiLoaded = (map, maps) => {
    const polygonCoords = coordinates.map(coordinate => { 
      return { lat: coordinate[0], lng: coordinate[1] }
    });
  
     const newMap = new maps.Polygon({
      paths: polygonCoords,
      strokeColor: properties.color || "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: properties.color || "#FF0000",
      fillOpacity: 0.35
    });
    newMap.setMap(map);
  }

  return (
    <div className="map-container">
      <h2 className="map-title">Teste</h2>

      <div className="google-map" style={{ height: height }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={getDefaultCenter()}
          defaultZoom={zoomLevel}
          yesIWantToUseGoogleMapApiInternals 
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          /> */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

Map.defaultProps = {
  coordinates: [],
  zoomLevel: 5,
  height: "500px",
  properties: {}
};

Map.propTypes = {
  coordinates: PropTypes.array,
  zoomLevel: PropTypes.number,
  height: PropTypes.string,
  properties: PropTypes.object
};
