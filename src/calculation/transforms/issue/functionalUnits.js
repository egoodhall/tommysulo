import _ from 'lodash';

const isReady = (station) => {
  return (typeof station.op1Reg === 'number' && isFinite(station.op1Reg)) &&
    (typeof station.op2Reg === 'number' && isFinite(station.op2Reg));
};

const isAluType = (aluOp, fu) => {
  switch (aluOp) {
    case 'LD':
    case 'ST':
    case 'ADD':
    case 'SUB': return fu.type === 'INT';
    case 'MUL': return fu.type === 'MUL';
    case 'DIV': return fu.type === 'INT';
    default: return false;
  }
};

const availableFU = (aluOp, functionalUnits) => {
  return _.find(functionalUnits, (fu) => isAluType(aluOp, fu) && fu.cyclesRemaining === -1);
};

const issue = (snapshot) => {
  _(snapshot.reservationStations).forEach((station) => {

    // Get an available functional unit
    const unit = availableFU(station.aluOp, snapshot.functionalUnits);
    if (isReady(station) && unit !== null) {

      // Assign reservation station to FU
      const { op1Reg, op2Reg, destReg, aluOp } = station;
      _.assign(unit, { op1Reg, op2Reg, destReg, aluOp });

      // Assign FU to reservation station
      station.FU = unit;
    }
  });

  return snapshot;
};

export {
  issue
};
