const stringifyVolumn = (number) => {
  let tempVar;
  let result = '';
  if (number === undefined || number == null || Number.isNaN(number)) {
    return '-';
  }
  if (typeof number === 'string') {
    tempVar = parseFloat(number);
  } else {
    tempVar = number;
  }
  const resultTemp = Math.floor(tempVar).toString();
  const num = Math.trunc(resultTemp.length / 3);
  result += resultTemp.substr(0, resultTemp.length - (num * 3));
  for (let i = 0, len = num; i < len; i += 1) {
    const temp = (result === '' ? '' : ',');
    result += temp + resultTemp.substr(resultTemp.length - ((num - i) * 3), 3);
  }
  return `${result}.${tempVar.toString().split('.')[1]}`;
};

export default stringifyVolumn;
