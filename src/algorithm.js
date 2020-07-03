/*
 * magic algorithm adapted from no-uislider
 * https://github.com/leongersen/noUiSlider/blob/master/src/nouislider.js#L202-L261
 */

// Determine the size of a sub-range in relation to a full range.
function subRangeRatio(pa, pb) {
  return 100 / (pb - pa);
}

// (value) How much is this percentage on this range?
function isPercentage(range, value) {
  return (value * (range[1] - range[0])) / 100 + range[0];
}

// (percentage) How many percent is this value of this range?
function fromPercentage(range, value) {
  return (value * 100) / (range[1] - range[0]);
}

// (percentage) Where is this value on this range?
function toPercentage(range, value) {
  return fromPercentage(
    range,
    range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]
  );
}

// (percentage) Input a value, find where, on a scale of 0-100, it applies.
function toStepping(min, max, value, step, percent) {
  if (value >= max) {
    return 100;
  }

  let va;
  let vb;
  let pa;
  let pb;

  if (value < step) {
    va = min;
    vb = step;
    pa = min;
    pb = percent * 100;
  } else {
    va = step;
    vb = max;
    pa = percent * 100;
    pb = 100;
  }

  return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
}

// (value) Input a percentage, find where it is on the specified range.
function fromStepping(min, max, position, step, percent) {
  // There is no range group that fits 100
  if (position >= 100) {
    return max;
  }

  if (position === 0) {
    return min;
  }

  let va;
  let vb;
  let pa;
  let pb;

  if (position < percent * 100) {
    va = min;
    vb = step;
    pa = min;
    pb = percent * 100;
  } else {
    va = step;
    vb = max;
    pa = percent * 100;
    pb = 100;
  }

  return isPercentage([va, vb], (position - pa) * subRangeRatio(pa, pb));
}

/*
 * Make a step algorithm for rheostat,
 * give a value (step) and a percent (0-1) which denotes
 * where that value is on the slider.
 * The rest of the slider builds around that value
 */
export default function makeAlgorithm(step, percent) {
  return {
    getPosition(x, min, max) {
      return toStepping(min, max, x, step, percent);
    },

    getValue(x, min, max) {
      return Math.round(fromStepping(min, max, x, step, percent));
    },
  };
}
