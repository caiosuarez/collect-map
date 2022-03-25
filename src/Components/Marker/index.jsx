import React from 'react';
import PropTypes from 'prop-types';
import movePin from '../../assets/Regular=off, Move=on.svg';
import moveOffPin from '../../assets/Regular=on, Move=off.svg';

const Marker = ({ moving }) => {
    return (
        <div className="pin">
          <img src={moving ? movePin : moveOffPin} alt="pin" className="pin-icon" />
        </div>
      )
} 

export default Marker;

Marker.defaultProps = {
  moving: false
};

Marker.propTypes = {
  moving: PropTypes.bool
};