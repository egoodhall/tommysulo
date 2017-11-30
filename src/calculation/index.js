import _ from 'lodash';

import { buildSnapshot, copyOf } from './snapshot';
import { issueRes, issueFun } from './transforms/issue';
import { crunch } from './transforms/crunch';
import { write } from './transforms/write';

//============//
// STATE DATA //
//============//

let leadSnapshot = null;
let initialized = false;
const allSnapshots = [];

//============//


/*
 * Step the given snapshot forward 1 cycle. Performs all necessary steps in
 * Tomasulo's algorithm
 */
const step = (snapshot) => {
  // Writes then crunches then issues (functional units then reservation stations)
  return issueRes(crunch(issueFun(write(snapshot))));
};


/*
 * Returns whether or not the snapshot has reservation stations that are still busy
 */
const snapshotWorking = (snapshot) => {
  const resStationBusy = _(snapshot.resStations).values().flatten().reduce((acc, station) => {
    return acc || station.instr !== null;
  }, false);
  return snapshot.pc < snapshot.instr.length || resStationBusy;
};


/*
 * Retrieve a snapshot of a given cycle, or calculate up to the point that we
 * are at the chosen cycle, and return that snapshot.
 */
const getSnapshot = (cycle) => {
  if (!initialized) {
    throw new Error('Not Initialized');
  }
  if (cycle) {
    cycle = (cycle <= 0) ? 1 : cycle;
  }
  // If we already have the snapshot, give it
  if (allSnapshots.length >= cycle) {
    return allSnapshots[cycle - 1];
  }

  // Otherwise, calculate either until we do, or we hit the end
  let i = allSnapshots.length - 1;
  while (i === 0 || snapshotWorking(leadSnapshot) && ((!cycle && i < 1000) || i < cycle)) {
    console.log(`\n\n---- Tick: ${++i} ----\n\n`);
    leadSnapshot.cycle = i;
    leadSnapshot = step(leadSnapshot);
    allSnapshots.push(copyOf(leadSnapshot));
  }
  return allSnapshots[allSnapshots.length - 1];
};


/*
 * Pull out the states of the instructions in a snapshot. This is the data that
 * is needed to populate the UI
 */
const getStates = ({ instrHist }) => _.map(instrHist, (instr) => instr.state);


/*
 * Validate input code. Makes sure the code is valid for parsing/running.
 */
const validate = (code) => {
  if (code && code !== '') {
    return true;
  }
  return false;
};


/*
 * Initialize. This should be run before requesting a snapshot to ensure the
 * first one is built and ready.
 */
const init = (instr, config) => {
  console.log(config);
  if (validate(instr)) {
    leadSnapshot = buildSnapshot({ instr, functionalUnits: config });
    allSnapshots.length = 0;
    allSnapshots.push(copyOf(leadSnapshot));
    initialized = true;
    return true;
  }
  return false;
};


//===========================//
// MAIN CODE (DEMONSTRATION) //
//===========================//
// if (typeof require !== undefined && require.main === module) {

//   // Have the code
//   const code = _.trim(`
//   ADD R1 1 4
//   SUB R0 R1 1
//   ADD R2 R1 R0
//   ADD R1 2 4
//   `);

//   // Validate the code
//   const valid = init(code);

//   // If it's valid, you can request a snapshot!
//   if (valid) {
//     console.log('7', getStates(getSnapshot(7)), null, 2);
//   } else {
//     console.log('Code invalid');
//   }

// }
//===========================//

export {
  init,
  getSnapshot,
  getStates
};
