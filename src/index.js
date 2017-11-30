import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import { InstrTable } from './js/InstrTable2.jsx';
import { init, getSnapshot } from './calculation';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Panel, FormGroup, ControlLabel, FormControl, Button, Nav, NavItem, Table } from 'react-bootstrap'

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
          "resStations": 3,
          "count": 2,
          "latency": 1
        },
        "MUL": {
          "resStations": 2,
          "count": 1,
          "latency": 2
        },
        "DIV": {
          "resStations": 2,
          "count": 1,
          "latency": 8
        }
      }
    }
  }

  run() {
    console.log(this.state.configs);
    if(init(this.state.instructions, this.state.configs) === true) {
      const snapshot = getSnapshot();
      // console.log(snapshot);
      const resStations = _.map(_.flatten(_.values(snapshot.resStations)), (rs) => rs.id);
      const functionalUnits = _.map(_.flatten(_.values(snapshot.functionalUnits)), (fu) => fu.id);
      const instrHist = _.map(snapshot.instrHist, (i) => i.state);
      // console.log(JSON.stringify(instrHist, null, 2));
      // console.log(JSON.stringify(resStations, null, 2));
      // console.log(JSON.stringify(functionalUnits, null, 2));
      this.instrTable.updateSnapshot(instrHist, resStations, functionalUnits);
    }
  }

  handleSelect(itemKey) {
    // console.log(itemKey);
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
    });
  }

  getContent() {
    let output = <div></div>;

    switch(this.state.navKey) {
      case 1:
        output = (
          <FormGroup controlId="formControlsTextarea" style={{width:970}}>
            <ControlLabel>Enter the Tomasulos pseudocode you would like to compute.</ControlLabel>
            <FormControl componentClass="textarea"
              value={this.state.instructions}
              onChange={(event) => { this.handleInstructionChange(event); }}
              placeholder="ADD R1 1 4
MUL R2 R1 1
MUL R0 R2 1
ADD R1 R2 4
ADD R1 R1 R0" style={{height:200}} />
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
                <td><FormControl type="text" value={this.state.configs["INT"]["resStations"]}
                  onChange={(event) => { this.handleConfigChange("INT", "resStations", event); }} /></td>
                <td><FormControl type="text" value={this.state.configs["INT"]["count"]}
                  onChange={(event) => { this.handleConfigChange("INT", "count", event); }} /></td>
                <td><FormControl type="text" value={this.state.configs["INT"]["latency"]}
                  onChange={(event) => { this.handleConfigChange("INT", "latency", event); }} /></td>
              </tr>
              <tr>
                <td>Multiply Units</td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["resStations"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "resStations", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["count"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "count", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["MUL"]["latency"]}
                    onChange={(event) => { this.handleConfigChange("MUL", "latency", event); }} /></td>
              </tr>
              <tr>
                <td>Divide Units</td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["resStations"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "resStations", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["count"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "count", event); }} /></td>
                  <td><FormControl type="text" value={this.state.configs["DIV"]["latency"]}
                    onChange={(event) => { this.handleConfigChange("DIV", "latency", event); }} /></td>
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
        <h2>Tomasulo's Algorithm Table</h2>
        <Panel display={{display:"inline-block"}}
          header={<h3>Tomasulos Algorithm Pseudocode</h3>}
          width="wrap-content" bsStyle="primary">
          <Nav bsStyle="pills" activeKey={navKey} onSelect={handleSelect}>
            <NavItem eventKey={1}>Pseudocode</NavItem>
            <NavItem eventKey={2}>Processor Configurations</NavItem>
          </Nav>
          <div style={{marginTop:"5px", width:972}}>
            {this.getContent()}
          </div>
          <div className="alignRight" style={{marginTop:"5px"}}><Button bsStyle="primary" onClick={() => this.run()}>Run</Button></div>
        </Panel>

        <InstrTable onRef={ref => (this.instrTable = ref)} />
      </div>
    )

  }

}

ReactDom.render(<App />, document.getElementById('root'));
