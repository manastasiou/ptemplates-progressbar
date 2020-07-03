import React from "react";
import styles from "./Handle.scss";

class Handle extends React.Component {
  render() {
    return (
      <span {...this.props} className="handle">
        {this.props.children}
      </span>
    );
  }
}

export default Handle;
