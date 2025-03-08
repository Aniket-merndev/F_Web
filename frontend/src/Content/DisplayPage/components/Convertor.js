// Frozen enum - Immutable
const Unit = Object.freeze({
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
})

export default function Convertor(to, value) {
let output;

  switch(to) {
    case 'KB':
      output = value / 1024;
      break;
    case 'MB':
      output = value / (1024 ** 2);
      break;
    case 'GB':
      output = value / (1024 ** 3);
      break;
    case 'TB':
      output = value / (1024 ** 4);
      break;      
  }
  
  return (Math.floor(output) + " " + to);
}
