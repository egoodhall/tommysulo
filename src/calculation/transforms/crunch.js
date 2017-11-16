import _ from 'lodash';


const isCrunching = ({ cyclesRemaining }) => {
  return cyclesRemaining > -1;
};


const crunch = (snapshot) => {
  console.log('Performing calculations');
  _(snapshot.functionalUnits).values().flatten().filter(isCrunching).forEach((fu) => {
    if (fu.instr !== null) {
      console.log(`  Crunch '${fu.instr.op} ${fu.instr.i} ${fu.instr.j} ${fu.instr.k}'`);
    }

    // Decrement the number of cycles remaining
    fu.cyclesRemaining--;
  });
  return snapshot;
};


export {
  crunch
};
