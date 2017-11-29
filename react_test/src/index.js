import React from 'react';
import ReactDom from 'react-dom';
import { InstrTable } from './js/InstrTable2.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Panel, FormGroup, ControlLabel, FormControl, Button, Nav, NavItem, Table } from 'react-bootstrap'
var VALID_INSTRUCTIONS = ["ADD", "SUB", "LW", "SW", "MUL", "DIV", "J", "BEQ", "BNEQ"];

function checkInstructionSyntax(instruction) {
  let reg = new RegExp('R[^0-9]{1,2}');

  var parts = instruction.split(" ");
  if (VALID_INSTRUCTIONS.indexOf(parts[0]) < 0) {
    return 0;
  }
  if (parts[0] === "J") {
    // TODO: Implement
  } else if (parts[0][0] === "B") {
    // TODO: Implement
  } else {
    if (!reg.test(parts[1])) {
      return 1;
    }
    if (!reg.test(parts[2]) || isInt(parts[2])) {
      return 2;
    }
    if (!reg.test(parts[3]) || isInt(parts[3])) {
      return 3;
    }
  }
}

function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navKey: 1,
      instructions: "",
      configs: {
        "INT": {
          "res": 4,
          "func": 2,
          "lat": 1
        },
        "MUL": {
          "res": 2,
          "func": 1,
          "lat": 4
        },
        "DIV": {
          "res": 2,
          "func": 1,
          "lat": 8
        }
      }
    }
  }

  handleSelect(itemKey) {
    console.log(itemKey);
    this.setState({
      navKey: itemKey
    });
  }

  handleConfigChange(type, col, event) {
    if (isInt(event.target.value)) {
      this.state.configs[type][col] = parseInt(event.target.value);
      this.setState({
        configs: {...this.state.configs}
      });
    } else if (event.target.value === "") {
      this.state.configs[type][col] = 0;
      this.setState({
        configs: {...this.state.configs}
      });
    }
  }

  handleInstructionChange(event) {
    this.setState({
      instructions: event.target.value
    })
  }

  getContent() {
    let output = <div></div>;

    switch(this.state.navKey) {
      case 1:
        output = (
          <FormGroup controlId="formControlsTextarea" style={{width:970}}>
            <ControlLabel>Enter the Tomasulos sudocode you would like to compute.</ControlLabel>
            <FormControl componentClass="textarea"
              onChange={(event) => { this.handleInstructionChange(event); }}
              placeholder="ADD R3 R2 R1" style={{height:200}} />
          </FormGroup>
        );
        break;
      case 2:
        output = (
          <Table striped bordered condensed hover bsStyle="primary">
            <thead>
              <tr>
                <th>Type</th>
                <th>Number of Reservation Stations</th>
                <th>Number of Functional Units</th>
                <th>Execution Latency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Integer Units</td>
                <td><FormControl type="text" value={this.state.configs["INT"]["res"]}
                  onChange={(event) => { this.handleConfigChange("INT", "res", event); }} /></td>
                <td><FormControl type="text" value={this.state.configs["INT"]["func"]}
                  onChange={(event) => { this.handleConfigChange("INT", "func", event); }} /></td>
                <td><FormControl type="text" value={this.state.configs["INT"]["lat"]}
                  onChange={(event) => { this.handleConfigChange("INT", "lat", event); }} /></td>
              </tr>
              <tr>
                <td>Multiply Units</td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["res"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "res", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["func"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "func", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["lat"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "lat", event); }} /></td>
              </tr>
              <tr>
                <td>Divide Units</td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["res"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "res", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["func"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "func", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["lat"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "lat", event); }} /></td>
              </tr>
            </tbody>
          </Table>
        );
        break;
    }

    return output;
  }

  render() {
    let handleSelect = this.handleSelect.bind(this);
    let navKey = this.state ? this.state.navKey : 1;

    return (
      <div className="alignCenter" display={{display:"inline-block"}}>
        <h2>Tomasulos Branch Prediction Table</h2>
        <Panel display={{display:"inline-block"}}
          header={<h3>Tomasulos Algorithm Sudocode</h3>}
          width="wrap-content" bsStyle="primary">
          <Nav bsStyle="pills" activeKey={navKey} onSelect={handleSelect}>
            <NavItem eventKey={1}>Sudocode</NavItem>
            <NavItem eventKey={2}>Processor Configurations</NavItem>
          </Nav>
          <div style={{marginTop:"5px", width:972}}>
            {this.getContent()}
          </div>
          <div className="alignRight" style={{marginTop:"5px"}}><Button bsStyle="primary">Run</Button></div>
        </Panel>

        <InstrTable />
      </div>
    )

  }

}

ReactDom.render(<App />, document.getElementById('root'));
