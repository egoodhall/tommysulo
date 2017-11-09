
import _ from 'lodash';

const doneExecuting = (fu) => fu.cyclesRemaining === 0;

const calculate = (snapshot, fu) => {
  switch (fu.aluOp) {
    case 'ADD': return fu.op1Reg + fu.op2Reg;
    case 'SUB': return fu.op1Reg - fu.op2Reg;
    case 'MUL': return fu.op1Reg * fu.op2Reg;
    case 'DIV': return Math.floor(fu.op1Reg / fu.op2Reg);
    case 'LD': return snapshot.memory[fu.op1Reg + fu.op2Reg];
    case 'ST': snapshot.memory[fu.op1Reg + fu.op2Reg] = fu.destReg; break;
    default: return null;
  }
  return null;
};

const write = (snapshot) => {
  _(snapshot.functionalUnits).forEach((fu) => {
    if (doneExecuting(fu)) {
      // Reservation station waiting for the FU
      const currStation = _.find(snapshot.resStations, station => station.FU === fu);

      // Calculate the result
      const result = calculate(snapshot, fu);

      // Write to any waiting reservation stations
      _.forEach(snapshot.resStations, (station) => {
        if (station.op1Reg === currStation) {
          station.op1Reg = result;
        }
        if (station.op2Reg === currStation) {
          station.op2Reg = result;
        }
      });

      // Only update if is still the last one
      if (snapshot.rat[fu.destReg] === currStation) {
        // Write back to registers
        snapshot.registers[fu.destReg] = result;

        // Update RAT
        snapshot.rat[fu.destReg] = null;
      }

    }
  });
  return snapshot;
};

export {
  write
};
