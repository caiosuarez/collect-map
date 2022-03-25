import React from "react";
import PropTypes from "prop-types";
import cultureIcon from "../../assets/Culture Icon.svg";
import pin from "../../assets/Pin.svg";

import "./styles.css";

const MarkersList = ({ markersList, containerStyle }) => {
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
              <div key={marker.id} className="markers-list-item">
                <div>{`Ponto nº ${index}`}</div>
                <div>{`Criado em ${day}/${month}/${year} - ${hours}:${minutes}`}</div>
              </div>
            );
          })
        ) : (
          <div className="markers-list-item">
            Sem pontos de monitoramento para exibir no momeneto
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
};

MarkersList.propTypes = {
  markersList: PropTypes.array,
  containerStyle: PropTypes.object,
};
