import { buildSnapshot } from './snapshot';
import { issueRes, issueFun } from './transforms/issue';
import { crunch } from './transforms/crunch';
import { write } from './transforms/write';

const step = (snapshot) => {
  // Writes then crunches then issues (functional units then reservation stations)
  return issueRes(issueFun(crunch(write(snapshot))));
};

console.log(step(buildSnapshot()));

export {
  step
};
