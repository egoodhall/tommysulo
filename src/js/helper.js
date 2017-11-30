export function getColor(state, hovered) {
  let output = '';
  switch (state) {
    case 'I':
      output = 'red';
      break;
    case 'E':
      output = 'yellow';
      break;
    case 'W':
      output = 'green';
      break;
    case '-':
      output = 'grey';
      break;
    default:
      return 'inherit-color';
  }
  if (hovered) return 'dark-' + output;
  else return output;
}

export function getFuncColor(state, hovered) {
  let output = '';
  switch(state) {
    case 'ADD':
      output = 'orange';
      break;
    case 'SUB':
      output = 'magenta';
      break;
    case 'MUL':
      output = 'cyan';
      break;
    case 'DIV':
      output = 'yellow-green';
      break;
    case 'LD':
      output = 'purple';
      break;
    case 'LD':
      output = 'blue';
      break;
    default:
      return 'inherit-color';
  }
  if (hovered) return 'dark-' + output;
  else return output;
}
