google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTables);

var rowData = {
  'INT1': {
    'ADD': [
      { start: 1, length: 1 },
      { start: 3, length: 1 }
    ],
    'DIV': [
      { start: 4, length: 2 },
      { start: 7, length: 2 }
    ]
  },
  'INT2': {
    'SUB': [
      { start: 2, length: 1 },
      { start: 5, length: 1 }
    ],
    'MULT': [
      { start: 3, length: 2 },
      { start: 6, length: 2 }
    ]
  }
};

const styles = [
  'background-color:#2196F3;color:white;',
  'background-color:#F44336;color:white;',
  'background-color:#FFC107;',
  'background-color:#9C27B0;color:white;',
  'background-color:#4CAF50;color:white;',
  'background-color:#E91E63;color:white;',
  'background-color:#FF9800;',
  'background-color:#2196F3;color:white;',
  'background-color:#009688;color:white;',
];

function stylingFor(idx) {
  return styles[idx % styles.length];
}

function drawTables() {
  drawUtilizationTable();
  drawGanttTable();
}

function drawUtilizationTable() {
  var util = new google.visualization.DataTable();
  util.addColumn('string', 'FU');
  var i;
  for (i = 1; i < 21; i++) {
    util.addColumn('string', ''+i);
  }

  var rows = []
        // Row for each Functional Unit
        Object.keys(rowData).forEach(function(fu, rowIdx) {

          const row = new Array(21);
          util.addRow(row);
          for (var idx = 0; idx < row.length; idx++) {
            util.setCell(rowIdx, idx, '', undefined, { 'className': 'empty'});
          };
          util.setCell(rowIdx, 0, fu, undefined, { 'className': 'title'});
          var styling = 0;
          // Each instruction in the Functional Unit
          Object.keys(rowData[fu]).forEach(function(instr) {
            // Durations of each instance of the instruction
            rowData[fu][instr].forEach(function(dur) {
              row[dur.start] = instr;
              // Fill the entire duration
              for (var colIdx = dur.start; colIdx < dur.start + dur.length; colIdx++) {
                const str = (colIdx == dur.start) ? instr : '';
                // Set coloring
                
                util.setCell(rowIdx, colIdx, str, null, { 'className': 'test', 'style': stylingFor(rowIdx + styling) });
              }
            });
            styling += 3;
          });
        });

        var table = new google.visualization.Table(document.getElementById('utilization_table'));

        table.draw(util, {
          allowHtml: true,
          alternatingRowStyle: false,
          width: '100%',
          cssClassNames: {
            'headerRow': 'title'
          }
        });
      }

      function drawGanttTable() {
        var gantt = new google.visualization.DataTable();
        gantt.addColumn('string', 'FU');
        var i;
        for (i = 1; i < 21; i++) {
          gantt.addColumn('string', ''+i);
        }

        var rows = []
        // Row for each Functional Unit
        Object.keys(rowData).forEach(function(fu, rowIdx) {

          const row = new Array(21);
          gantt.addRow(row);
          for (var idx = 0; idx < row.length; idx++) {
            gantt.setCell(rowIdx, idx, '', undefined, { 'className': 'empty'});
          };
          gantt.setCell(rowIdx, 0, fu, undefined, { 'className': 'title'});
          var styling = 0;
          // Each instruction in the Functional Unit
          Object.keys(rowData[fu]).forEach(function(instr) {
            // Durations of each instance of the instruction
            rowData[fu][instr].forEach(function(dur) {
              row[dur.start] = instr;
              // Fill the entire duration
              for (var colIdx = dur.start; colIdx < dur.start + dur.length; colIdx++) {
                const str = (colIdx == dur.start) ? instr : '';
                // Set coloring
                
                gantt.setCell(rowIdx, colIdx, str, null, { 'className': 'test', 'style': stylingFor(rowIdx + styling) });
              }
            });
            styling += 3;
          });
        });

        var table = new google.visualization.Table(document.getElementById('gantt_table'));

        table.draw(gantt, {
          allowHtml: true,
          alternatingRowStyle: false,
          width: '100%',
          cssClassNames: {
            'headerRow': 'title'
          }
        });
      }