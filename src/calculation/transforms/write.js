
import _ from 'lodash';

const doneExecuting = (fu) => fu.cyclesRemaining === -1 && fu.instr !== null;

const calculate = (snapshot, fu) => {
  switch (fu.instr.op) {
    case 'ADD': return fu.instr.j + fu.instr.k;
    case 'SUB': return fu.instr.j - fu.instr.k;
    case 'MUL': return fu.instr.j * fu.instr.k;
    case 'DIV': return Math.floor(fu.instr.j / fu.instr.k);
    case 'LD': return snapshot.memory[fu.instr.j + fu.instr.k];
    case 'ST': snapshot.memory[fu.instr.j + fu.instr.k] = fu.instr.i; break;
    default: return null;
  }
  return null;
};

const write = (snapshot) => {
  console.log('Performing writes');
  _(snapshot.functionalUnits).values().flatten().filter(doneExecuting).forEach((fu) => {
    console.log(`  Writing '${fu.instr.op} ${fu.instr.i} ${fu.instr.j} ${fu.instr.k}'`);

    // Reservation station waiting for the FU
    const currStation = _(snapshot.resStations).values().flatten()
      .find((station) => station.FU === fu.id) || null;

    // Calculate the result
    const result = calculate(snapshot, fu);

    // Write to any waiting reservation stations
    _(snapshot.resStations).values().flatten().filter((station) => station.instr !== null).forEach((station) => {
      if (station.instr.j === currStation.id) {
        station.instr.j = result;
      }
      if (station.instr.k === currStation.id) {
        station.instr.k = result;
      }
    });
    // Only update if is still in the RAT
    if (snapshot.rat[parseInt(fu.instr.i.slice(1), 10)] === currStation.id) {
      // Update RAT
      snapshot.rat[parseInt(fu.instr.i.slice(1), 10)] = null;
    }

    // Write back to registers
    snapshot.registers[parseInt(fu.instr.i.slice(1), 10)] = result;

    // Clear FU and reservation station
    currStation.instr = null;
    currStation.FU = null;
    fu.instr = null;
  });
  return snapshot;
};

export {
  write
};
