import { Action } from '@ngrx/store';
import { CandidateRegister } from 'src/app/models/candidate-register.model';

export const CANDIDARE_REGISTER = '[CANDIDATE] signup';
export const GET_CANDIDATE = '[CANDIDATE] getCandidate';

export class Candidate_Register implements Action {
  readonly type = CANDIDARE_REGISTER;

  constructor(public payload: CandidateRegister) {}
}

// export class GetCandidate implements Action {
//   readonly type = GET_CANDIDATE;

//   constructor(public payload: String) {}
// }

export type Actions = Candidate_Register;
