import React from "react";
import PropTypes from "prop-types";
import Rheostat from "rheostat";
import styles from "./Slider.scss";
import Handle from "./Handle";
import ProgressBar from "./ProgressBar";

/**
 * Slider wrapper
 * More info: https://github.com/airbnb/rheostat
 */

const propTypes = {
  // a custom handle you can pass in
  handle: PropTypes.func,
  // a custom progress bar you can pass in
  progressBar: PropTypes.func,
  // standard class name you'd like to apply to the root element
  className: PropTypes.string,
  snap: PropTypes.bool,
  snapPoints: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
  handle: Handle,
  progressBar: ProgressBar,
  className: "slider",
  snap: false,
  snapPoints: [],
};

class Slider extends React.Component {
  render() {
    return <Rheostat {...this.props} />;
  }
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
