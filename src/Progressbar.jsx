import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PJPropTypes from "jobs/postJob/PropTypes";

import styles from "./ProgressBar.scss";
import { getBackgroundColor } from "./utils";

export function ProgressBar({ min, max, medianBudgets = {}, ...props }) {
  const memoizedBg = useMemo(() => getBackgroundColor(min, max, medianBudgets));

  return (
    <div
      {...props}
    />
  );
}

ProgressBar.propTypes = {
  max: PropTypes.number.isRequired,
  medianBudgets: PJPropTypes.MedianBudget,
  min: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  medianBudgets: {},
};

export default ProgressBar;
