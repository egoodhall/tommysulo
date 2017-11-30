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


const getAvailableFU = (op, functionalUnits) => {
  console.log(functionalUnits);
  return _.find(functionalUnits, (fu) => isAluType(op, fu) && fu.cyclesRemaining === -1) || null;
};


const stationFilled = ({ instr, FU: fu }) => {
  return instr !== null && fu === null;
};

const isInt = (value) => {
  return !isNaN(value) &&
    parseInt(Number(value), 10) === value &&
    !isNaN(parseInt(value, 10));
};


const instrReady = ({ op, i, j, k }) => {
  console.log(`${op} ${i} ${j} ${k}`);
  if (op === 'ST') {
    return isInt(i) && isInt(j) && isInt(k);
  }
  return isInt(j) && isInt(k);
};


const issue = (snapshot) => {

  console.log('Issuing to functional units');
  _(snapshot.resStations).values().flatten()
    .filter(stationFilled).filter((station) => instrReady(station.instr))
    .forEach((station) => {
      console.log(station);
      // Get an available functional unit
      const unit = getAvailableFU(station.instr.op, _.flatten(_.values(snapshot.functionalUnits))) || null;

      // Assign if the station's operands are ready and there is an available FU
      if (isReady(station) && unit !== null) {
        console.log(`  Issued '${station.instr.state.instruction.op} ${station.instr.state.instruction.i} ${station.instr.state.instruction.j} ${station.instr.state.instruction.k}'`);
        unit.instr = station.instr;
        unit.cyclesRemaining = unit.latency;
        station.instr.state.funcUnit.push(unit.id, snapshot.cycle, snapshot.cycle + unit.cyclesRemaining - 1);
        station.instr.state.resStation.push(snapshot.cycle + unit.cyclesRemaining - 1);
        station.instr.state.steps.E.push(snapshot.cycle, snapshot.cycle + unit.cyclesRemaining - 1);
        station.FU = unit.id;
      }
    });

  return snapshot;
};

export {
  issue
};
