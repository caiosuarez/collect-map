import React from "react";
import PropTypes from "prop-types";
import cultureIcon from "../../assets/Culture Icon.svg";
import trash from "../../assets/Trash.svg";

import "./styles.css";

const MarkersList = ({ markersList, containerStyle, deleteMarkerFunction }) => {
  return (
    <div className="markers-list" style={containerStyle}>
      <div className="markers-list-header">Listagem de pontos</div>
      <div className="markers-list-body">
        {markersList.length > 0 ? (
          markersList.map((marker, index) => {
            const year = marker.createdAt.getFullYear();
            const month = marker.createdAt.getMonth() + 1;
            const day = marker.createdAt.getDate();
            const hours = marker.createdAt.getHours();
            const minutes = marker.createdAt.getMinutes();

            return (
              <div
                key={marker.id}
                className={
                  marker.moving
                    ? "markers-list-item active"
                    : "markers-list-item"
                }
              >
                <div className="item-content">
                  <div className="marker-number">
                    <img src={cultureIcon} alt="culture icon" />
                    {`Ponto nº ${index}`}
                  </div>
                  <div className="time-description">{`Criado em:  ${day}/${month}/${year} - ${hours}:${minutes}`}</div>
                </div>
                <img
                  className="delete-marker-icon"
                  src={trash}
                  alt="trash icon"
                  onClick={() => deleteMarkerFunction(marker.id)}
                />
              </div>
            );
          })
        ) : (
          <div className="markers-list-item" style={{ textAlign: "center" }}>
            Sem pontos de monitoramento para exibir no momento.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkersList;

MarkersList.defaultProps = {
  markersList: [],
  containerStyle: {},
  deleteMarkerFunction: () => {},
};

MarkersList.propTypes = {
  markersList: PropTypes.array,
  containerStyle: PropTypes.object,
  deleteMarkerFunction: PropTypes.func,
};
