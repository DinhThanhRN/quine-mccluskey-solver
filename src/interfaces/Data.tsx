import {ImplicantChart} from './ImplicantChart';

interface Data {
  primeImplicants: ImplicantChart[][];
  reducedPrimeImplicants: ImplicantChart[][];
  unmarkedImplicants: string[];
  essentialPrimeImplicants: string[];
}

export type {Data};
