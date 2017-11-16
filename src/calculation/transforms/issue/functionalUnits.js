import _ from 'lodash';

const isReady = (station) => {
  return (typeof station.instr.j === 'number' && isFinite(station.instr.j)) &&
    (typeof station.instr.k === 'number' && isFinite(station.instr.k));
};


const isAluType = (op, fu) => {
  switch (op) {
    case 'LD':
    case 'ST':
    case 'ADD':
    case 'SUB': return fu.type === 'INT';
    case 'MUL': return fu.type === 'MUL';
    case 'DIV': return fu.type === 'DIV';
    default: return false;
  }
};


const setLatency = (fu) => {
  switch (fu.type) {
    case 'INT': fu.cyclesRemaining = 1; break;
    case 'MUL': fu.cyclesRemaining = 2; break;
    case 'DIV': fu.cyclesRemaining = 8; break;
    default: break;
  }
};


const getAvailableFU = (op, functionalUnits) => {
  return _.find(functionalUnits, (fu) => isAluType(op, fu) && fu.cyclesRemaining === -1) || null;
};


const stationFilled = ({ instr, FU: fu }) => {
  return instr !== null && fu === null;
};


const instrReady = ({ instr: { j, k } }) => {
  return typeof j === 'number' && isFinite(j) && typeof k === 'number' && isFinite(k);
};


const issue = (snapshot) => {

  console.log('Issuing to functional units');
  _(snapshot.resStations).values().flatten()
    .filter(stationFilled).filter(instrReady)
    .forEach((station) => {
      // Get an available functional unit
      const unit = getAvailableFU(station.instr.op, _.values(snapshot.functionalUnits).flatten()) || null;

      // Assign if the station's operands are ready and there is an available FU
      if (isReady(station) && unit !== null) {
        console.log(`  Issued '${station.instr.state.instruction.op} ${station.instr.state.instruction.i} ${station.instr.state.instruction.j} ${station.instr.state.instruction.k}'`);
        unit.instr = station.instr;
        setLatency(unit);
        station.instr.state.funcUnit.push(unit.id, snapshot.cycle, snapshot.cycle + unit.cyclesRemaining - 1)
        station.instr.state.steps.E.push(snapshot.cycle, snapshot.cycle + unit.cyclesRemaining - 1)
        station.FU = unit.id;
      }
    });

  return snapshot;
};

export {
  issue
};
