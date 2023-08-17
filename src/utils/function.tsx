import {ImplicantChart} from '../interfaces/ImplicantChart';

export const isCovered = (implicant: string, term: string): boolean => {
  for (let i = 0; i < implicant.length; i++) {
    if (
      (implicant[i] === '0' && term[i] === '1') ||
      (implicant[i] === '1' && term[i] === '0')
    ) {
      return false;
    }
  }
  return true;
};

export const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j - 1] > arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
};

export const convertDecimalsToBinaries = (numbers: number[]) => {
  const binaries = numbers.map((item: number) => item.toString(2));
  const maxTermLength = Math.max(
    ...binaries.map((item: string) => item.length),
  );
  return binaries.map((item: string) => item.padStart(maxTermLength, '0'));
};

export const convertToImplicant = (implicant: string) => {
  const charCodeOfA = 65;
  return implicant
    .split('')
    .map((char: string, index: number) =>
      char === '-'
        ? ''
        : char === '1'
        ? String.fromCharCode(charCodeOfA + index)
        : `~${String.fromCharCode(charCodeOfA + index)}`,
    )
    .join('');
};

export const combineImplicants = (
  implicant1: string,
  implicant2: string,
): string | null => {
  let numDifferences = 0;
  let combinedTerm = '';
  for (let i = 0; i < implicant1.length; i++) {
    if (implicant1[i] !== implicant2[i]) {
      numDifferences++;
      combinedTerm += '-';
    } else {
      combinedTerm += implicant1[i];
    }
  }
  if (numDifferences === 1) {
    return combinedTerm;
  } else {
    return null;
  }
};

export const isDifferentOneBit = (term1: string, term2: string) => {
  const length = term1.length;
  let count = 0;
  for (let i = 0; i < length; i++) {
    if (term1.charAt(i) !== term2.charAt(i)) {
      count++;
      if (count > 1) return false;
    }
  }
  return true;
};

export const maxSizeOfTerms = (implicantChart: Map<string, Set<number>>) => {
  let max = 0;
  for (const [implicant, terms] of implicantChart.entries()) {
    if (terms.size > max) {
      max = terms.size;
    }
  }
  return max;
};

export const isChartSameSize = (
  implicantChart: Map<string, Set<number>>,
  minterms: number[],
) => {
  let preSize = 0;
  for (const minterm of minterms) {
    for (const term of implicantChart.values()) {
      if (term.has(minterm)) preSize++;
    }
    break;
  }

  for (const minterm of minterms) {
    let count = 0;
    for (const terms of implicantChart.values()) {
      if (terms.has(minterm)) count++;
    }
    if (count !== preSize) return false;
    preSize = count;
  }
  return true;
};

export const reduceChartByTerms = (
  chart: Map<string, Set<number>>,
  deletingTerms: Set<number>,
) => {
  for (const [implicant, terms] of chart.entries()) {
    for (const item of deletingTerms) {
      if (terms.has(item)) chart.get(implicant)?.delete(item);
    }
    if (chart.get(implicant)?.size === 0) chart.delete(implicant);
  }
  return chart;
};
const map = new Map<string, Set<string>>();
map.set('0-10', new Set(['0010', '0110']));
map.set('-010', new Set(['0010', '1010']));

export const convertToDecimalChart = (
  chart: Map<string, Set<string | number>>,
): ImplicantChart[] => {
  const decimalChart: ImplicantChart[] = [];
  for (const [implicant, terms] of chart.entries()) {
    const decimalTerms = Array.from(terms)
      .map(term => (typeof term === 'string' ? parseInt(term, 2) : term))
      .join(', ');
    decimalChart.push({implicant, minterms: decimalTerms});
  }
  return decimalChart;
};

export const convertToAlphabets = (str: string) => {
  return str
    .split('')
    .map((char: string, index: number) =>
      char === '1'
        ? String.fromCharCode(65 + index)
        : char === '0'
        ? String.fromCharCode(65 + index) + "'"
        : '',
    )
    .join('');
};
