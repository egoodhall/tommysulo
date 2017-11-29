import React from 'react';
import '../index.css';
import ReactDOM from "react-dom"

import { getColor, getFuncColor } from './helper.js'

const instructions = [
  {
    instruction: {
      inst: "LW",
      i:    "R2",
      j:    "R1",
      k:    ""
    },
    steps: {
      I: [1,1],
      E: [2,2],
      W: [3,3],
      C: [4,4]
    },
    resStation: ["Load/Store 1", 1, 1],
    funcUnit: ["Load/Store 1", 2, 2]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R2",
      j:    "R2",
      k:    ""
    },
    steps: {
      I: [1,1],
      E: [3,3],
      W: [4,4],
      C: [5,5]
    },
    resStation: ["INT 1", 1, 2],
    funcUnit: ["INT 1", 3, 3]
  },
  {
    instruction: {
      inst: "SW",
      i:    "",
      j:    "R2",
      k:    "R1"
    },
    steps: {
      I: [2,2],
      E: [4,5],
      W: [6,6],
      C: [7,7]
    },
    resStation: ["Load/Store 1", 2, 3],
    funcUnit: ["Load/Store 1", 4, 5]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R2",
      j:    "R2",
      k:    ""
    },
    steps: {
      I: [2,2],
      E: [4,4],
      W: [5,5],
      C: [7,7]
    },
    resStation: ["INT 2", 2, 3],
    funcUnit: ["INT 1", 4, 4]
  },
  {
    instruction: {
      inst: "BNE",
      i:    "",
      j:    "R2",
      k:    "R3"
    },
    steps: {
      I: [5,5],
      E: [6,6],
      W: [7,7],
      C: [8,8]
    },
    resStation: ["INT 1", 5, 5],
    funcUnit: ["INT 1", 6, 6]
  },
  {
    instruction: {
      inst: "LW",
      i:    "R2",
      j:    "R1",
      k:    ""
    },
    steps: {
      I: [7,7],
      E: [8,8],
      W: [9,9],
      C: [10,10]
    },
    resStation: ["Load/Store 1", 7, 7],
    funcUnit: ["Load/Store 1", 8, 8]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R2",
      j:    "R2",
      k:    ""
    },
    steps: {
      I: [8,8],
      E: [9,9],
      W: [10,10],
      C: [11,11]
    },
    resStation: ["INT 1", 8, 8],
    funcUnit: ["INT 1", 9, 9]
  },
  {
    instruction: {
      inst: "SW",
      i:    "",
      j:    "R2",
      k:    "R1"
    },
    steps: {
      I: [8,8],
      E: [10,11],
      W: [12,12],
      C: [13,13]
    },
    resStation: ["Load/Store 1", 8, 9],
    funcUnit: ["Load/Store 1", 10, 11]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R1",
      j:    "R1",
      k:    ""
    },
    steps: {
      I: [9,9],
      E: [10,10],
      W: [11,11],
      C: [13,13]
    },
    resStation: ["INT 1", 9, 9],
    funcUnit: ["INT 1", 10, 10]
  },
  {
    instruction: {
      inst: "BNE",
      i:    "",
      j:    "R2",
      k:    "R3"
    },
    steps: {
      I: [11,11],
      E: [12,12],
      W: [13,13],
      C: [14,14]
    },
    resStation: ["INT 1", 11, 11],
    funcUnit: ["INT 1", 12, 12]
  },
  {
    instruction: {
      inst: "LW",
      i:    "R2",
      j:    "R1",
      k:    ""
    },
    steps: {
      I: [12,12],
      E: [13,13],
      W: [14,14],
      C: [15,15]
    },
    resStation: ["Load/Store 1", 12, 12],
    funcUnit: ["Load/Store 1", 13, 13]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R2",
      j:    "R2",
      k:    ""
    },
    steps: {
      I: [14,14],
      E: [15,15],
      W: [16,16],
      C: [17,17]
    },
    resStation: ["INT 1", 14, 14],
    funcUnit: ["INT 1", 15, 15]
  },
  {
    instruction: {
      inst: "SW",
      i:    "",
      j:    "R2",
      k:    "R1"
    },
    steps: {
      I: [14,14],
      E: [16,17],
      W: [18,18],
      C: [19,19]
    },
    resStation: ["Load/Store 1", 14, 15],
    funcUnit: ["Load/Store 1", 16, 17]
  },
  {
    instruction: {
      inst: "ADDIU",
      i:    "R1",
      j:    "R1",
      k:    ""
    },
    steps: {
      I: [15,15],
      E: [16,16],
      W: [17,17],
      C: [19,19]
    },
    resStation: ["INT 1", 15, 15],
    funcUnit: ["INT 1", 16, 16]
  },
  {
    instruction: {
      inst: "BNE",
      i:    "",
      j:    "R2",
      k:    "R3"
    },
    steps: {
      I: [16,16],
      E: [17,17],
      W: [18,18],
      C: [20,20]
    },
    resStation: ["INT 1", 16, 16],
    funcUnit: ["INT 1", 17, 17]
  }
];

const resStations = [
  "Load/Store 1",
  "Load/Store 2",
  "Load/Store 3",
  "INT 1",
  "INT 2",
  "INT 3",
];

const funcUnits = [
  "Load/Store 1",
  "INT 1"
];

const HEIGHT = 10;

function getState(instr, step) {
  if (step < instr.steps.I[0]) {
    return "";
  } else if (instr.steps.I[0] <= step && step <= instr.steps.I[1]) {
    return "I";
  } else if (instr.steps.E[0] <= step && step <= instr.steps.E[1]) {
    return "E";
  } else if (instr.steps.W[0] <= step && step <= instr.steps.W[1]) {
    return "W";
  } else if (instr.steps.C[0] <= step && step <= instr.steps.C[1]) {
    return "C";
  } else if (instr.steps.C[0] < step) {
    return "";
  } else {
    return "-";
  }
}

function getColspan(instr, step) {
  if (instr.steps.I[0] <= step && step <= instr.steps.I[1]) {
    if (instr.steps.I[0] === step)
      return instr.steps.I[1] - instr.steps.I[0] + 1;
    else
      return 0;
  } else if (instr.steps.E[0] <= step && step <= instr.steps.E[1]) {
    if (instr.steps.E[0] === step)
      return instr.steps.E[1] - instr.steps.E[0] + 1;
    else
      return 0;
  } else if (instr.steps.W[0] <= step && step <= instr.steps.W[1]) {
    if (instr.steps.W[0] === step)
      return instr.steps.W[1] - instr.steps.W[0] + 1;
    else
      return 0;
  } else if (instr.steps.C[0] <= step && step <= instr.steps.C[1]) {
    if (instr.steps.C[0] === step)
      return instr.steps.C[1] - instr.steps.C[0] + 1;
    else
      return 0;
  } else {
    return 1;
  }
}

function getHeight() {
  return instructions.length;
}

function getWidth() {
  let width = 0;

  for (let i = 0; i < instructions.length; i++) {
    let item = instructions[i];
    if (item.steps.C[1] > width) {
      width = item.steps.C[1]
    }
  }

  return width;
}

export class InstrTable extends React.Component {

  constructor() {
    super();

    this.state = {
      location: 0,
      lastScrollPos: 0,
      instructions: instructions.map((inst, i) => {
        return { ...inst, hovered: false }
      }),
      resStations: resStations.map((res, i) => {
        return { res, hovered: -1 }
      }),
      funcUnits: funcUnits.map((func, i) => {
        return { func, hovered: -1 }
      }),
      width: getWidth(),
      height: getHeight()
    };
  }

  componentDidMount() {
    const table = ReactDOM.findDOMNode(this.refs.table);

    table.addEventListener('onScroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    const table = ReactDOM.findDOMNode(this.refs.table);

    table.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  getStartStep() {
    return this.state.instructions[this.state.location].steps.I[0]-1;
  }

  getStopStep() {
    let stop = 0;

    for (let i = this.state.location; i < this.state.location + HEIGHT; i++) {
      let item = instructions[i];
      if (item.steps.C[1] > stop) {
        stop = item.steps.C[1]
      }
    }

    return stop;
  }

  getWidth() {
    let maxWidth = 0;
    for (let i = 0; i < this.state.instructions.length - HEIGHT; i++) {
      if (this.state.instructions[i + HEIGHT].steps.C[1] - this.state.instructions[i].steps.I[0] > maxWidth) {
        maxWidth = this.state.instructions[i + HEIGHT].steps.C[1] - this.state.instructions[i].steps.I[0];
      }
    }
    return maxWidth + 1;
  }

  getHeaderSteps() {
    let steps = [];
    for (let i = this.getStartStep(); i < this.getWidth() + this.getStartStep(); i++) {
      steps.push(<th key={i}>{ i + 1 }</th>);
    }
    return steps;
  }

  getInstructionStates(inst, loc) {
    let states = [];
    for (let i = this.getStartStep(); i < this.getStartStep() + this.getWidth(); i++) {
      let state = getState(inst, i+1);
      let colspan = getColspan(inst, i+1);
      if (colspan > 0)
        states.push(
          <td key={i} className={getColor(state, inst.hovered)}
            colSpan={colspan}>
            {state}
          </td>);
    }
    return states;
  }

  hoverInstruction(inst, i) {
    let instructions = this.state.instructions;
    for (let j = 0; j < instructions.length; j++) {
      if (instructions[j] === inst) {
        instructions[j].hovered = true;
      } else {
        instructions[j].hovered = false;
      }
    }
    let resStations = this.state.resStations;
    for (let res = 0; res < resStations.length; res++) {
      let item = resStations[res];
      if (i !== -1 && item.res === inst.resStation[0]) {
        item.hovered = inst.resStation[1];
      } else {
        item.hovered = -1;
      }
    }
    let funcUnits = this.state.funcUnits;
    for (let func = 0; func < funcUnits.length; func++) {
      let item = funcUnits[func];
      if (i !== -1 && item.func === inst.funcUnit[0]) {
        item.hovered = inst.funcUnit[1];
      } else {
        item.hovered = -1;
      }
    }
    this.setState({
      instructions,
      resStations,
      funcUnits
    });
  }

  getBackgroundColor(hovered, loc) {
    if (hovered) {
      return '#6d9eeb';
    } else if (loc % 2) {
      return '#c9daf8';
    } else {
      return null;
    }
  }

  getInstructions() {
    return this.state.instructions.map((inst, i) => {
      if (i >= this.state.location && i < this.state.location+HEIGHT) {
        return (
          <tr key={i}
            style={{backgroundColor: this.getBackgroundColor(this.state.instructions[i].hovered, i) }}
            onMouseEnter={() => { this.hoverInstruction(inst, i) }}
            onMouseLeave={() => { this.hoverInstruction({}, -1) } }
            >
            <td>{i+1}</td>
            <td width={60}>{inst.instruction.inst}</td>
            <td>{inst.instruction.i}</td>
            <td>{inst.instruction.j}</td>
            <td>{inst.instruction.k}</td>
            { this.getInstructionStates(inst, i) }
          </tr>
        );
      } else {
        return null;
      }
    })
  }

  handleSlider(event) {
    this.setState({
      location: parseInt(event.target.value, 10)
    });
  }

  handleScroll(event) {
    console.log("Scroll");
    if(this.state.lastScrollPos > event.currentTarget.scrollTop) {
      this.goUp(event);
    } else if(this.state.lastScrollPos < event.currentTarget.scrollTop) {
      this.goDown(event);
    }
  }

  handleKeyPress(event) {
    switch(event.keyCode) {
      case 37:
      case 38:
        this.goUp(event);
        break;
      case 39:
      case 40:
        this.goDown(event);
        break;
      default:
        break;
    }
  }

  goUp(event) {
    let newLoc = this.state.location;
    if (this.state.location > 0) {
      newLoc -= 1;
    }
    this.setState({
      location: newLoc,
      lastScrollPos: event.currentTarget.scrollTop
    });
  }

  goDown(event) {
    let newLoc = this.state.location;
    if (this.state.location < this.state.instructions.length - HEIGHT) {
      newLoc += 1;
    }
    this.setState({
      location: newLoc,
      lastScrollPos: event.currentTarget.scrollTop
    });
  }

  getReservationStations() {
    let resStations = {};
    let key = 0;
    for (let r = 0; r < this.state.resStations.length; r++) {
      resStations[this.state.resStations[r].res] = [];
      for (let s = 0; s < this.state.width + this.getWidth(); s++) {
        resStations[this.state.resStations[r].res].push(<td key={key++}></td>);
      }
    }

    for (let i = this.state.location; i < this.state.location + HEIGHT; i++) {
      let inst = this.state.instructions[i];
      if (inst.resStation) {
        resStations[inst.resStation[0]][inst.resStation[1]-1] = (
          <td key={key++}
            colSpan={inst.resStation[2] - inst.resStation[1] + 1}
            onMouseEnter={() => {
              let resStations = this.state.resStations;
              let res = resStations.findIndex((item) => {return item.res === inst.resStation[0]; })
              resStations[res].hovered = inst.resStation[1];
              let instructions = this.state.instructions;
              instructions[i].hovered = true;
              this.setState({
                resStations,
                instructions
              });
            }}
            onMouseLeave={() => {
              let resStations = this.state.resStations;
              resStations.find((item) => {return item.res === inst.resStation[0]; }).hovered = -1;
              let instructions = this.state.instructions;
              instructions[i].hovered = false;
              this.setState({
                resStations,
                instructions
              });
            }}
            className={
              getFuncColor(inst.instruction.inst,
              inst.resStation[1] === this.state.resStations.find((item) => {
                return item.res === inst.resStation[0];
              }).hovered)}>
            {inst.instruction.inst}
          </td>
        )

        for (let r = inst.resStation[1]; r < inst.resStation[2]; r++) {
          resStations[inst.resStation[0]][r+1] = null;
        }
      }
    }

    resStations = this.state.resStations.map((item, i) => {
      return (
        <tr key={i} style={{backgroundColor: this.getBackgroundColor(false, i)}}>
          <td colSpan={5}>{item.res}</td>
          {resStations[item.res].map((item, i) => {
            if (i >= this.getStartStep() && i < this.getStartStep() + this.getWidth()) {
              return item;
            } else {
              return null;
            }
          })}
        </tr>
      );
    });

    return resStations;
  }

  getFunctionalUnits() {
    let funcUnits = {};
    let key = 0;
    for (let r = 0; r < this.state.funcUnits.length; r++) {
      funcUnits[this.state.funcUnits[r].func] = [];
      for (let s = 0; s < this.state.width+this.getWidth(); s++) {
        funcUnits[this.state.funcUnits[r].func].push(<td key={key++}></td>);
      }
    }

    for (let i = this.state.location; i < this.state.location + HEIGHT; i++) {
      let inst = this.state.instructions[i];

      if (inst.funcUnit) {
        funcUnits[inst.funcUnit[0]][inst.funcUnit[1]-1] = (
          <td key={key++}
            colSpan={inst.funcUnit[2] - inst.funcUnit[1] + 1}
            onMouseEnter={() => {
              let funcUnits = this.state.funcUnits;
              funcUnits.find((item) => {return item.func === inst.funcUnit[0]; }).hovered = inst.funcUnit[1];
              let instructions = this.state.instructions;
              instructions[i].hovered = true;
              this.setState({
                funcUnits,
                instructions
              });
            }}
            onMouseLeave={() => {
              let funcUnits = this.state.funcUnits;
              funcUnits.find((item) => {return item.func === inst.funcUnit[0]; }).hovered = -1;
              let instructions = this.state.instructions;
              instructions[i].hovered = false;
              this.setState({
                funcUnits,
                instructions
              });
            }}
            className={
              getFuncColor(inst.instruction.inst, inst.funcUnit[1] === this.state.funcUnits.find((item) => { return item.func === inst.funcUnit[0]; }).hovered)
            }>
            {inst.instruction.inst}
          </td>
        )

        for (let r = inst.funcUnit[1]; r < inst.funcUnit[2]; r++) {
          funcUnits[inst.funcUnit[0]][r+1] = null;
        }
      }
    }

    funcUnits = this.state.funcUnits.map((item, i) => {
      return (
        <tr key={i} style={{backgroundColor: this.getBackgroundColor(false, i)}}>
          <td colSpan={5}>{item.func}</td>
            {funcUnits[item.func].map((item, i) => {
              if (i >= this.getStartStep() && i < this.getStartStep() + this.getWidth()) {
                return item;
              } else {
                return null;
              }
            })}
        </tr>
      );
    });
    return funcUnits;
  }

  render() {
    return (
      <table className='inst-table'
        ref={"table"}
        tabIndex={0}
        onScroll={this.handleScroll.bind(this) }
        onKeyDown={this.handleKeyPress.bind(this) }
        style={{outlineWidth:0}}>
        <thead>
          <tr>
            <th colSpan={5}>Instruction</th>
            <th colSpan={this.getWidth()}>Clocks</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Inst</th>
            <th>i</th>
            <th>j</th>
            <th>k</th>
            {this.getHeaderSteps()}
          </tr>
        </thead>
        <tbody>
          {this.getInstructions()}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>Reservation Stations</th>
            <th colSpan={this.getWidth()}>Clocks</th>
          </tr>
          {this.getReservationStations()}
          <tr>
            <th colSpan={5}>Functional Units</th>
            <th colSpan={this.getWidth()}>Clocks</th>
          </tr>
          {this.getFunctionalUnits()}
          <tr>
            <th colSpan={5}>Current View</th>
            <th colSpan={this.getWidth()}>
              <input type="range"
                min={0}
                max={this.state.instructions.length - HEIGHT}
                ref="slider"
                onChange={this.handleSlider.bind(this)}
                value={this.state.location}
                className="slider" id="myRange" />
            </th>
          </tr>
        </tfoot>
      </table>
    );

  }

}
