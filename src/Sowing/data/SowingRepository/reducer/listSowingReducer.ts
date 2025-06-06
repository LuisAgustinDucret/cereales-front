import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";
import { Sowing } from "../types";

type ListSowingPayload = FetchPayload<Sowing[]>;

export type ListSowingActions = BaseAction<ListSowingPayload>;

type ListSowingAction = ListSowingActions[keyof ListSowingActions];

interface ListSowingState {
  data: Sowing[];
  loading: boolean;
  error?: string;
}

export const initialState: ListSowingState = {
  data: [],
  loading: false,
};

const listSowingReducer = (
  state: ListSowingState = initialState,
  action: ListSowingAction
): ListSowingState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        data: initialState.data,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default listSowingReducer;
