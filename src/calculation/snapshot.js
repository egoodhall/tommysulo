import _ from 'lodash';

const regCount = 8;

const snapshotBase = {
  resStations: [],
  functionalUnits: [],
  registers: Array(regCount),
  memory: {},
  rat: Array(regCount),
  instr: [],
  pc: 0
};

const resStationBase = {
  destReg: null,
  op1Reg: null,
  op2Reg: null,
  FU: null,
  AluOp: null,
  instrIdx: null
};

const functionalUnitBase = {
  op1Reg: null,
  op2Reg: null,
  aluOp: null,
  type: null,
  cyclesRemaining: -1
};

const instructionBase = {
  string: '',
  state: 'I' // IEW(C)
};


const duplicate = (json) => {
  return JSON.parse(JSON.stringify(json));
};


const parseInstr = (instructions) => {
  return _(instructions.split(/\n/)).map((instr, idx) => {
    const components = instr.split(/\s+/);

    return { op1Reg: , op2Reg: , destReg: }
  });
};


const buildSnapshot = (resStations = 3, instr = '', functionalUnits = { INT: 2, MUL: 1, DIV: 1 }) => {

  const snapshot = duplicate(snapshotBase);

  // Reservation stations
  for (var i = 0; i < resStations; i++) {
    snapshot.resStations.push(duplicate(resStationBase));
  }

  // Functional Units
  _.forEach(_.keys(functionalUnits), (key) => {
    for (i = 0; i < functionalUnits[key]; i++) {
      const fu = duplicate(functionalUnitBase);
      fu.type = key;
      snapshot.functionalUnits.push(fu);
    }
  });

  snapshot.rat.fill(null);

  snapshot.registers.fill(null);

  snapshot.instr = parseInstr(instr);

  return snapshot;
};

export {
  duplicate,
  buildSnapshot
};
