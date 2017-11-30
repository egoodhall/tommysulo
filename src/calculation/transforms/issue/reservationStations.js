import _ from 'lodash';
import { copyOf } from '../../snapshot';


const opToType = (op) => {
  switch (op) {
    case 'LD':
    case 'ST':
    case 'ADD':
    case 'SUB': return 'INT';
    case 'MUL': return 'MUL';
    case 'DIV': return 'DIV';
    default: return null;
  }
};


const stationIsEmpty = (station) => {
  return station.instr === null;
};


const updateWaitingOperand = (instr, operand, snapshot) => {
  // Only update if the value isn't already calculated
  if (typeof instr[operand] !== 'number' || !isFinite(instr[operand])) {
    const ratVal = snapshot.rat[parseInt(instr[operand].slice(1), 10)];

    // Update from the RAT if there's a value there, otherwise from registers
    if (ratVal !== null) {
      instr[operand] = ratVal;
    } else {
      instr[operand] = snapshot.registers[parseInt(instr[operand].slice(1), 10)];
    }
  }
};


const issue = (snapshot) => {
  console.log('Issuing to reservation stations');

  // Only issue if possible
  if (snapshot.pc < snapshot.instr.length) {

    // Get type of Reservation Station needed
    const type = opToType(snapshot.instr[snapshot.pc].op);

    // Find an open reservation station
    const station = _.find(snapshot.resStations[type], stationIsEmpty) || null;

    // Issue instruction
    if (station !== null) {

      // Create a copy of the instruction at PC and push to the history
      const instr = copyOf(snapshot.instr[snapshot.pc++]);
      instr.state = {
        instruction: copyOf(instr),
        steps: {
          I: [snapshot.cycle, snapshot.cycle],
          E: [],
          W: []
        },
        resStation: [station.id, snapshot.cycle],
        funcUnit: []
      };
      snapshot.instrHist.push(instr);

      console.log(`  Issued '${instr.state.instruction.op} ${instr.state.instruction.i} ${instr.state.instruction.j} ${instr.state.instruction.k}'`);

      // Update operands if they need to wait for other instructions
      updateWaitingOperand(instr, 'j', snapshot);
      updateWaitingOperand(instr, 'k', snapshot);

      // Update RAT
      snapshot.rat[parseInt(instr.i[1], 10)] = station.id;

      // Set instruction
      station.instr = instr;
    }
  }
  return snapshot;
};


export {
  issue
};
