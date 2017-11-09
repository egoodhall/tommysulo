import _ from 'lodash';

const isCrunching = ({ cyclesRemaining }) => cyclesRemaining > -1;

const crunch = (snapshot) => {
  _(snapshot.functionalUnits).forEach((fu) => {
    if (isCrunching(fu)) {
      fu.cyclesRemaining--;
    }
  });
  return snapshot
};

export {
  crunch
};
