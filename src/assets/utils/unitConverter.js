import numeral from 'numeral';

let formatNumber = (number) => {
  return numeral(number).format('0.0a');
}

export default formatNumber