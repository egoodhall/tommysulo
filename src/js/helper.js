export function getColor(state, hovered) {
  let output = '';
  switch(state) {
    case 'I':
      output = 'red';
      break;
    case 'E':
      output = 'yellow';
      break;
    case 'W':
      output = "green";
      break;
    case 'C':
      output = 'purple';
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
    case 'LW':
      output = 'orange';
      break;
    case 'SW':
      output = 'magenta';
      break;
    case 'ADDIU':
      output = "cyan";
      break;
    case 'BNE':
      output = 'yellow-green';
      break;
    default:
      return 'inherit-color';
  }
  if (hovered) return 'dark-' + output;
  else return output;
}
