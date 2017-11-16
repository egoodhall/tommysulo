import _ from 'lodash';

import { readFile } from 'fs';
import { join } from 'path';

import { buildSnapshot, copyOf } from './snapshot';
import { issueRes, issueFun } from './transforms/issue';
import { crunch } from './transforms/crunch';
import { write } from './transforms/write';

const step = (snapshot) => {
  // Writes then crunches then issues (functional units then reservation stations)
  return issueRes(crunch(issueFun(write(snapshot))));
};

const snapshotWorking = (snapshot) => {
  const resStationBusy = _(snapshot.resStations).values().flatten().reduce((acc, station) => {
    return acc || station.instr !== null;
  }, false);
  console.log(resStationBusy);
  return snapshot.pc < snapshot.instr.length || resStationBusy;
};

const main = (code) => {
  let i = 0;
  let snapshot = buildSnapshot({ instr: code });

  // Snapshot history
  const snapshots = [copyOf(snapshot)];
  while (i === 0 || snapshotWorking(snapshot) && i < 12) {
    console.log(`\n\n---- Tick: ${++i} ----\n\n`);
    snapshot.cycle = i;
    snapshot = step(snapshot)
    snapshots.push(copyOf(snapshot));
    // console.log(JSON.stringify(snapshots[snapshots.length - 1], null, 2));
  }
  console.log(JSON.stringify(snapshots[snapshots.length - 1].registers, null, 2));
  // console.log(JSON.stringify(snapshots[snapshots.length - 1].resStations, null, 2));
  // console.log(JSON.stringify(snapshots[snapshots.length - 1].functionalUnits, null, 2));
  console.log(JSON.stringify(snapshots[snapshots.length - 1].instrHist, null, 2));
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
