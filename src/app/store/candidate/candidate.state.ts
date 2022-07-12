import { CandidateRegister } from 'src/app/models/candidate-register.model';
import * as CandidateAction from './candidate.action';

export interface State {
  candidates: CandidateRegister[];
}

const initialState: State = {
  candidates: [],
};

export function CandidateState(
  state: State = initialState,
  action: CandidateAction.Actions
) {
  console.log(action.type);
  switch (action.type) {
    case CandidateAction.CANDIDARE_REGISTER:
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
      };
    default:
      return state;
  }
}
