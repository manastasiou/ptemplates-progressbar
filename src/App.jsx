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
    <Handle {...props} medianBudgets={medianBudgets}>
      <span className="price-handler__tooltip">${value}</span>
    </Handle>
  );
};

const min = 1;
const max = 10000;

const medianBudgets = {
  4: 147,
  5: 217,
  "<4": 88,
  avg: 349,
  top: 317,
};

function calculateBudgetWidth(totalWidth, percentage, prevStepWidth) {
  return (509.32 * percentage) / 100 - prevStepWidth;
}

function App() {
  const containerElem = React.useRef();
  const recommendedBudgetElem = React.useRef();
  const [containerWidth, setContainerWidth] = React.useState(0);

  const [value, setValue] = React.useState(medianBudgets.avg);
  const algorithm = React.useMemo(
    () => makeAlgorithm(medianBudgets.avg, 0.3),
    []
  );

  const step1Width = React.useMemo(() => {
    const position = algorithm.getPosition(medianBudgets["4"], min, max);
    console.log(
      "dasdasdasd",
      calculateBudgetWidth(containerWidth, position, 0)
    );
    return calculateBudgetWidth(containerWidth, position, 0);
  }, [algorithm, containerWidth]);

  const step2Width = React.useMemo(() => {
    const position = algorithm.getPosition(medianBudgets["5"], min, max);
    console.log("Position", [
      position,
      calculateBudgetWidth(containerWidth, position, step1Width),
    ]);
    return calculateBudgetWidth(containerWidth, position, step1Width);
  }, [algorithm, containerWidth, step1Width]);

  const step3Width = React.useMemo(() => {
    const position = algorithm.getPosition(medianBudgets["top"], min, max);
    return calculateBudgetWidth(
      containerWidth,
      position,
      step1Width + step2Width
    );
  }, [algorithm, containerWidth, step1Width, step2Width]);

  const step4Width = React.useMemo(() => {
    return containerWidth - step3Width - step2Width - step1Width;
  }, [containerWidth, step1Width, step2Width, step3Width]);

  const recommendedWidth = React.useMemo(() => {
    const position = algorithm.getPosition(medianBudgets["avg"], min, max);

    return calculateBudgetWidth(containerWidth, position, 0);
  }, [algorithm, containerWidth]);

  React.useLayoutEffect(() => {
    if (containerElem.current) {
      setContainerWidth(containerElem.current.offsetWidth);
    }
  }, []);

  console.log(containerElem?.current);

  return (
    <div className="App">
      <div className="slider-container">
        <div className="bar-container" ref={containerElem}>
          <div className="bar-container--top-background">
            <div
              style={{
                width: `${step1Width}px`,
              }}
              className="step-1"
            />
            <div
              style={{
                width: `${step2Width}px`,
              }}
              className="step-2"
            />
            <div
              style={{
                width: `${step3Width}px`,
              }}
              className="step-3"
            />
            <div
              style={{
                width: `${step4Width}px`,
              }}
              className="step-4"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Slider
              algorithm={algorithm}
              min={min}
              max={max}
              values={[value]}
              handle={HourlyRateHandle(value)}
              onValuesUpdated={(data, pct) => {
                setValue(data.values[0]);
              }}
            />
          </div>
          <div className="bar-container--bottom-background">
            <div
              style={{
                width: `${recommendedWidth}px`,
              }}
              className="recommended-budget"
            />
            <div className="budget-text" style={{marginLeft: `${recommendedWidth/2}px`}}>
              <span>Recommended Budget</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
