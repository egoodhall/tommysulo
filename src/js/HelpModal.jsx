import React from 'react';
import '../index.css';
import ReactModal from 'react-modal';
import ReactMarkdown from 'react-markdown';

import {getColor, getFuncColor} from './helper.js';

const helpSection = `
The assembly parser can handle \`LD\`, \`ST\` instructions with the following formats:
\`\`\`
LD  REG  INT(REG)
ST 
\`\`\`
and \`ADD\`, \`SUB\`, \`MUL\`, and \`DIV\` instructions with the format:
\`\`\`
ADD  REG  [REG|INT]  [REG|INT]
SUB
MUL
DIV
\`\`\`
Registers are denoted with \`R#\` and integers are just the immediate value. For example:
\`\`\`
ADD R0 1 2    // Add 1 & 2 and store the result in R0
ST  R0 2(R1)  // Store the value in R0 at R1 + 2 in memory
LD  R0 2(R2)  // Load the value in memory at R2 + 2 into R0

\`\`\`
__Note:__ The parenthesis are required in \`LD\` and \`ST\` instructions

Comments start with a \`//\` and end with a newline
`;

const contribSection = `
### Contributors
[Eric Marshall](https://ericmarshall.codes/),
[Jordan Sechler](https://github.com/jordansekky),
[Sam Greenberg](https://github.com/greenboigz),
[Lukas Muñoz](https://github.com/lam046)
`;

const styles = {
  content: {
    width: '50%',
    height: '80%',
    margin: 'auto'
  },
  overlay: {
    backgroundColor : 'rgba(0, 0, 0, 0.5)'
  }
}

export class HelpModal extends React.Component {
  
  render() {
    return (
      <ReactModal style={styles}
        isOpen = {this.props.isOpen}
        onAfterOpen = { this.onOpen }
        onRequestClose = { this.props.requestClose }
        contentLabel = "Help Modal"
        shouldFocusAfterRender = { true }
        shouldCloseOnOverlayClick = { true }
        shouldCloseOnEsc = { true }
        shouldReturnFocusAfterClose = { true }
        parentSelector = {() => document.body}
        >
        <button type="button" className="close" aria-hidden="true" onClick={this.props.requestClose}>&times;</button>
        <h1>Tommysulo</h1>
        <h5 style={{ paddingBottom: '20px' }} >A visualizer for Tomasulo's algorithm in ES6 and React.js for CSCI 320</h5>
        <h3>Valid Code:</h3>
        <div style={{ textAlign: 'left', width: '80%', margin: 'auto', paddingBottom: '20px' }} >
          <ReactMarkdown source={helpSection} />
        </div>
        <ReactMarkdown source={contribSection}/>
      </ReactModal>
    );
  }
}