
import { buildSnapshot, copyOf } from './snapshot';
import { issueRes, issueFun } from './transforms/issue';
import { crunch } from './transforms/crunch';
import { write } from './transforms/write';

const step = (snapshot) => {
  // Writes then crunches then issues (functional units then reservation stations)
  return issueRes(issueFun(crunch(write(copyOf(snapshot)))));
};

const main = () => {
  // Snapshot history
  const snapshots = [buildSnapshot({ instr: 'ADD R1 1 4;SUB R0 R1 1;ADD R2 R1 R0;ADD R1 2 4' })];

  // Run 20 cycles
  let i = 0;
  while (i++ < 11) {
    console.log(`\n\n---- Tick: ${i} ----\n\n`);
    snapshots.push(step(snapshots[snapshots.length - 1]));
  }
  console.log(JSON.stringify(snapshots[snapshots.length - 1].registers, null, 2));
};

main();

export {
  step
};
