import React from 'react';
import PropTypes from 'prop-types';
import pin from '../../assets/Pin.svg';

const LocationPin = ({ text }) => {
    return (
        <div className="pin">
          <img src={pin} alt="pin" className="pin-icon" />
          <p className="pin-text">{text}</p>
        </div>
      )
} 

export default LocationPin;

LocationPin.defaultProps = {
  text: ''
};

LocationPin.propTypes = {
  text: PropTypes.string
};