
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

const issue = (snapshot) => {
  
  return snapshot;
};

export {
  issue
};
