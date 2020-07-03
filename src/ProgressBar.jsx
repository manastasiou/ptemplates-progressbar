import React from "react";
import styles from "./ProgressBar.scss";

export class ProgressBar extends React.Component {
  render() {
    return <div id="progressbar" {...this.props} className="progress" />;
  }
}

export default ProgressBar;
