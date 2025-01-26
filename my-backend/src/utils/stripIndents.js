// export function stripIndents(value) {
//   return _stripIndents(value);
// }

export function stripIndents(strings, ...values) {
  const processedString = strings.reduce((acc, curr, i) => {
    acc += curr + (values[i] ?? '');
    return acc;
  }, '');

  return _stripIndents(processedString);
}

function _stripIndents(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trimStart()
    .replace(/[\r\n]$/, '');
}
