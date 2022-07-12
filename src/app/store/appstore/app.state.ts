import { ActionReducerMap } from '@ngrx/store';

import * as fromCandidate from '../candidate/candidate.state';

export interface AppState {
  candidate: fromCandidate.State;
}

export const AppReducer: ActionReducerMap<AppState,any> = {
  candidate:fromCandidate.CandidateState
};
