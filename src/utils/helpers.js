export function DOMtoArray(obj) {
  let array = [];

  for (let i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}
