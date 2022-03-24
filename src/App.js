import React, { useEffect, useState } from "react";
import Utils from './Utils';
import Map from "./Components/Map";
import Loader from "./Components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [properties, setProperties] = useState({});

  useEffect(() => {
    Utils.getConfig("./config/Talhao.json").then((data) => {
      const feature = data.features[0];
      setProperties(feature.properties);
      setCoordinates(feature.geometry.coordinates[0]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading && coordinates.length === 0 ? (
        <Loader />
      ) : (
        <Map coordinates={coordinates} zoomLevel={14} properties={properties} />
      )}
    </div>
  );
}

export default App;
