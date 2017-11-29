import React from 'react';
import '../index.css';

import { getColor } from './helper.js'

export class InstrTable extends React.Component {

  constructor() {
    super();

    this.state = { data: this.getData() };
  }

  getData() {
    return [
      {
        instruction: {
          inst: "LW",
          i:    "R2",
          j:    "R1",
          k:    ""
        },
        steps: [
          "I", "E", "W", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R2",
          j:    "R2",
          k:    ""
        },
        steps: [
          "I", "-", "E", "W", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "SW",
          i:    "",
          j:    "R2",
          k:    "R1"
        },
        steps: [
          "", "I", "-", "E", "E", "W", "C", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R2",
          j:    "R2",
          k:    ""
        },
        steps: [
          "", "I", "-", "E", "W", "-", "C", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "BNE",
          i:    "",
          j:    "R2",
          k:    "R3"
        },
        steps: [
          "", "", "", "", "I", "E", "W", "C", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "LW",
          i:    "R2",
          j:    "R1",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "I", "E", "W", "C", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R2",
          j:    "R2",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "", "I", "E", "W", "C", "", "", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "SW",
          i:    "",
          j:    "R2",
          k:    "R1"
        },
        steps: [
          "", "", "", "", "", "", "", "I", "-", "E", "E", "W", "C", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R1",
          j:    "R1",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "", "", "I", "E", "W", "-", "C", "", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "BNE",
          i:    "",
          j:    "R2",
          k:    "R3"
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "I", "E", "W", "C", "", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "LW",
          i:    "R2",
          j:    "R1",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "I", "E", "W", "C", "", "", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R2",
          j:    "R2",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "E", "W", "C", "", "", ""
        ]
      },
      {
        instruction: {
          inst: "SW",
          i:    "",
          j:    "R2",
          k:    "R1"
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "-", "E", "E", "W", "C", ""
        ]
      },
      {
        instruction: {
          inst: "ADDIU",
          i:    "R1",
          j:    "R1",
          k:    ""
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "E", "W", "-", "C", ""
        ]
      },
      {
        instruction: {
          inst: "BNE",
          i:    "",
          j:    "R2",
          k:    "R3"
        },
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "E", "W", "-", "C"
        ]
      }
    ]
  }

  render() {
    const data = this.state.data;

    return (
      <table className='inst-table y-scrollable' style={{maxHeight: '300px'}}>
        <thead>
          <tr>
            <th colSpan={4}>Instruction</th>
            <th colSpan={data[0].steps.length}>Steps</th>
          </tr>
          <tr>
            <th width={60}>Inst</th>
            <th>i</th>
            <th>j</th>
            <th>k</th>
            {data[0].steps.map((item, i) => {
              return <th key={i} width={25}>{ i + 1 }</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td width={60}>{item.instruction.inst}</td>
                <td width={20}>{item.instruction.i}</td>
                <td width={20}>{item.instruction.j}</td>
                <td width={20}>{item.instruction.k}</td>
                { item.steps.map((item, i) => {
                  return <td key={i} className={getColor(item)} width={25}>{item}</td>
                }) }
              </tr>
            )
          })}
        </tbody>
      </table>
    )

  }

}
