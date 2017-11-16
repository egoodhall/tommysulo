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
      console.log(`  Issued '${station.instr.op} ${station.instr.i} ${station.instr.j} ${station.instr.k}'`);

      // Get an available functional unit
      const unit = getAvailableFU(station.instr.op, _.values(snapshot.functionalUnits).flatten()) || null;

      // Assign if the station's operands are ready and there is an available FU
      if (isReady(station) && unit !== null) {
        unit.instr = station.instr;
        station.FU = unit.id;
        setLatency(unit);
      }
    });

  return snapshot;
};

export {
  issue
};
