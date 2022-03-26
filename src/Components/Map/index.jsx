import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Utils from "../../Utils";
import Marker from "../Marker";
import MarkersList from "../MarkersList";

import "./styles.css";

const Map = ({ coordinates, zoomLevel, height, properties }) => {
  const [draggable, setDraggable] = useState(true);
  // marker structure: {id, lat, lng, moving, createdAt}
  const [markers, setMarkers] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const drawPolygon = (map, maps) => {
    const polygonCoords = coordinates.map((coordinate) => {
      return { lat: coordinate[0], lng: coordinate[1] };
    });

    const newMap = new maps.Polygon({
      paths: polygonCoords,
      strokeColor: properties.color || "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: properties.color || "#FF0000",
      fillOpacity: 0.35,
    });
    newMap.setMap(map);
  };

  const onChildMouseDown = () => {
    setDraggable(false);
  };

  const onChildMouseUp = () => {
    const markersCopy = [...markers];
    markersCopy.map((item) => (item.moving = false));
    setMarkers(markersCopy);
    setDraggable(true);
  };

  const onChildMouseMove = (hoverKey, marker, newCoords) => {
    const selectedMarkerIndex = markers.findIndex(
      (item) => item.id === hoverKey
    );
    const markersCopy = [...markers];
    if (selectedMarkerIndex > -1) {
      const selectedMarker = markersCopy[selectedMarkerIndex];
      selectedMarker.lat = newCoords.lat;
      selectedMarker.lng = newCoords.lng;
      selectedMarker.moving = true;
      setMarkers(markersCopy);
    }
  };

  const getDefaultCenter = () => {
    const centerPoint = Math.floor(coordinates.length / 2);
    return {
      lat: coordinates[centerPoint][0],
      lng: coordinates[centerPoint][1],
    };
  };

  const addMarker = () => {
    const centerCoords = getDefaultCenter();
    const newMarker = {
      id: Utils.generateId(),
      lat: centerCoords.lat || -53.58821105957031,
      lng: centerCoords.lng || -15.176399230957031,
      moving: false,
      createdAt: new Date(),
    };
    setMarkers([...markers, newMarker]);
  };

  const deleteMarker = (id) => {
    const filteredMarkers = markers.filter((item) => item.id !== id);
    setMarkers(filteredMarkers);
  };

  return (
    <div className="map-container">
      <MarkersList
        markersList={markers}
        containerStyle={{ position: "absolute", top: "2%", left: "2%" }}
        deleteMarkerFunction={deleteMarker}
      />
      <div className="google-map" style={{ height: height }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={getDefaultCenter()}
          defaultZoom={zoomLevel}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => drawPolygon(map, maps)}
          draggable={draggable}
          onChildMouseDown={() => onChildMouseDown()}
          onChildMouseUp={() => onChildMouseUp()}
          onChildMouseMove={(key, marker, mouse) =>
            onChildMouseMove(key, marker, mouse)
          }
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              moving={marker.moving}
              createdAt={marker.createdAt}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div className="action-buttons">
        <button
          className="action-button"
          onClick={() => addMarker()}
          style={{ marginRight: "10px" }}
        >
          Adicionar ponto
        </button>
        <button className="action-button" onClick={() => setMarkers([])}>
          Excluir Pontos
        </button>
      </div>
    </div>
  );
};

export default Map;

Map.defaultProps = {
  coordinates: [],
  zoomLevel: 5,
  height: "90%",
  properties: {},
};

Map.propTypes = {
  coordinates: PropTypes.array,
  zoomLevel: PropTypes.number,
  height: PropTypes.string,
  properties: PropTypes.object,
};
