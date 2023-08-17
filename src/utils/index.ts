import {Data} from '../interfaces/Data';
import {
  isCovered,
  isDifferentOneBit,
  combineImplicants,
  maxSizeOfTerms,
  isChartSameSize,
  reduceChartByTerms,
  convertDecimalsToBinaries,
  bubbleSort,
  convertToDecimalChart,
} from './function';

// const arr = [2, 6, 8, 9, 10, 11, 14, 15];
const arr = [2, 3, 5, 7, 8, 10, 12, 13, 15];

export const getEssentialPrimeImplicants = (
  implicants: string[],
  binaryMinterms: Set<string>,
) => {
  const data: Data = {
    primeImplicants: [],
    reducedPrimeImplicants: [],
    essentialPrimeImplicants: [],
    unmarkedImplicants: [],
  };
  let primeImplicants = [...implicants];
  let essentialPrimeImplicants: string[] = new Array();
  const primeImplicantChart = new Map<string, Set<number>>();

  while (true) {
    const implicantChart: Map<string, Set<string>> = new Map();
    for (const implicant of primeImplicants) {
      implicantChart.set(implicant, new Set());
      for (const term of binaryMinterms) {
        if (isCovered(implicant, term)) {
          implicantChart.get(implicant)?.add(term);
        }
      }
    }
    data.primeImplicants?.push(convertToDecimalChart(implicantChart));
    primeImplicants = [];

    for (const [implicant1, term1] of implicantChart.entries()) {
      let count = 0;
      for (const [implicant2, term2] of implicantChart.entries()) {
        if (
          implicant1 !== implicant2 &&
          isDifferentOneBit(implicant1, implicant2)
        ) {
          count++;
          const combinedImplicant = combineImplicants(implicant1, implicant2);
          if (combinedImplicant !== null)
            primeImplicants.push(combinedImplicant);
        }
      }
      const termsInDecimal = new Set<number>();
      if (count === 0 && !primeImplicantChart.has(implicant1)) {
        for (const term of term1) termsInDecimal.add(parseInt(term, 2));
        primeImplicantChart.set(implicant1, termsInDecimal);
      }
    }

    if (!primeImplicants.length) break;
  }
  for (const implicant of primeImplicantChart.keys()) {
    data.unmarkedImplicants?.push(implicant);
    data.essentialPrimeImplicants?.push(implicant);
  }
  let reducedPrimeImplicantChart: Map<
    string,
    Set<number>
  > = primeImplicantChart;
  let minterms = new Array(...binaryMinterms).map(item => parseInt(item, 2));
  while (true) {
    if (maxSizeOfTerms(reducedPrimeImplicantChart) <= 0) break;
    const reducedImplicants = [];
    if (isChartSameSize(reducedPrimeImplicantChart, minterms)) {
      const max = maxSizeOfTerms(reducedPrimeImplicantChart);
      for (const [implicant, terms] of reducedPrimeImplicantChart.entries()) {
        if (terms.size === max) {
          reducedImplicants.push(implicant);
          minterms = minterms.filter(item => !terms.has(item));

          let deletingTerms = new Set<number>(terms);
          reducedPrimeImplicantChart = reduceChartByTerms(
            reducedPrimeImplicantChart,
            deletingTerms,
          );

          break;
        }
      }
    } else {
      for (const term of minterms) {
        let count = 0;
        for (const [implicant, terms] of primeImplicantChart.entries()) {
          if (terms.has(term)) {
            count++;
          }
        }
        if (count === 1) {
          for (const [implicant, terms] of primeImplicantChart.entries()) {
            if (terms.has(term)) {
              minterms = minterms.filter(item => !terms.has(item));
              reducedImplicants.push(implicant);
              reducedPrimeImplicantChart.delete(implicant);
              reducedPrimeImplicantChart = reduceChartByTerms(
                reducedPrimeImplicantChart,
                terms,
              );
            }
          }
        }
      }
    }
    reducedImplicants.forEach(implicant => {
      reducedPrimeImplicantChart.delete(implicant);
      essentialPrimeImplicants.push(implicant);
    });
    data.reducedPrimeImplicants?.push(
      convertToDecimalChart(reducedPrimeImplicantChart),
    );
  }
  if (essentialPrimeImplicants.length)
    data.essentialPrimeImplicants = [...essentialPrimeImplicants];
  else data.essentialPrimeImplicants?.push(...essentialPrimeImplicants);
  return data;
};

// console.log(quineMcCluskey(arr));

export const quineMcCluskey = (minterms: number[]) => {
  const sortedMinterms = bubbleSort(minterms);

  const binaryMintermsWithStartingZeros =
    convertDecimalsToBinaries(sortedMinterms);
  const primeImplicants = [...binaryMintermsWithStartingZeros];
  const essentialPrimeImplicants = getEssentialPrimeImplicants(
    primeImplicants,
    new Set(binaryMintermsWithStartingZeros),
  );
  return essentialPrimeImplicants;
};

const data = quineMcCluskey(arr);
console.log(data.essentialPrimeImplicants);
