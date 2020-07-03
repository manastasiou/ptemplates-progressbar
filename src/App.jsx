import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Slider from "./Slider";
import Handle from "./Handle";
import styles from "./App.scss";
import ProgressBar from "./ProgressBar";
import makeAlgorithm from "./algorithm";

const HourlyRateHandle = (value, min, max, currency) => (props) => {
  // data-handle-key is provided by rheostat to distinguish the two handles
  // eslint-disable-next-line react/prop-types
  const { "data-handle-key": key } = props;
  const price = key === 0 ? min : max;
  return (
    <Handle {...props}>
      <span className="price-handler__tooltip">${value}</span>
    </Handle>
  );
};

function App() {
  const [value, setValue] = React.useState(500)
  const algorithm = React.useMemo(() => makeAlgorithm(40, 0.3));



  return (
    <div className="App">
      <div className="slider-container">
        <div style={{ width: "100%" }}>
          <Slider
            algorithm={algorithm}
            min={0}
            max={1000}
            values={[500]}
            handle={HourlyRateHandle(value)}
            onValuesUpdated={(data, pct) => {
              setValue(data.values[0])
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
