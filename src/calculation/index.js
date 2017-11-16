import _ from 'lodash';

import { readFile } from 'fs';
import { join } from 'path';

import { buildSnapshot, copyOf } from './snapshot';
import { issueRes, issueFun } from './transforms/issue';
import { crunch } from './transforms/crunch';
import { write } from './transforms/write';

const step = (snapshot) => {
  // Writes then crunches then issues (functional units then reservation stations)
  return issueRes(issueFun(crunch(write(copyOf(snapshot)))));
};

const snapshotWorking = (snapshot) => {
  const resStationBusy = _(snapshot.resStations).values().flatten().reduce((acc, station) => {
    return acc || station.instr !== null;
  }, false);
  console.log(resStationBusy);
  return snapshot.pc < snapshot.instr.length || resStationBusy;
};

const main = (code) => {
  // Snapshot history
  const snapshots = [buildSnapshot({ instr: code })];

  // Run 20 cycles
  let i = 0;
  let snapshot = snapshots[0];
  while (i === 0 || snapshotWorking(snapshot)) {
    console.log(`\n\n---- Tick: ${i++} ----\n\n`);
    snapshots.push(step(snapshots[snapshots.length - 1]));
    snapshot = snapshots[snapshots.length - 1];
  }
  console.log(JSON.stringify(snapshots[snapshots.length - 1].registers, null, 2));
};


// Load and run code from the file
readFile(join(__dirname, 'test.asm'), 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  main(data);
});

export {
  step
};
