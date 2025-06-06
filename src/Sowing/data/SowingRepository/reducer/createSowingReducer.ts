import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";
import { Sowing } from "../types";

export type CreateSowingActions = BaseAction<FetchPayload<Sowing>>;

type CreateSowingAction = CreateSowingActions[keyof CreateSowingActions];

interface CreateSowingState {
  data?: Sowing;
  loading: boolean;
  error?: string;
}

export const initialState: CreateSowingState = {
  loading: false,
};

const createSowingReducer = (
  state: CreateSowingState = initialState,
  action: CreateSowingAction
): CreateSowingState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return { ...state, loading: true };
    }
    case FetchActionTypes.Succeess: {
      return { ...state, loading: false, data: action.payload };
    }
    case FetchActionTypes.Failure: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default createSowingReducer;
