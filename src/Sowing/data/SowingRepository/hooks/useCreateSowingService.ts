import { useCallback, useReducer, useMemo } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createSowingRepository from "../createSowingRepository";
import createSowingReducer, {
  initialState,
} from "../reducer/createSowingReducer";

const useCreateSowingService = () => {
  const repository = useMemo(
    () => createSowingRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data, loading, error }, dispatch] = useReducer(
    createSowingReducer,
    initialState
  );

  const createSowing = useCallback(
    (body) =>
      repository.createSowing(body).then((res) => {
        dispatch({ type: FetchActionTypes.Succeess, payload: res });
        return res;
      }),
    [repository]
  );

  const startFetch = useCallback(
    () => dispatch({ type: FetchActionTypes.Start }),
    []
  );
  const failureFetch = useCallback(
    (err: string) => dispatch({ type: FetchActionTypes.Failure, payload: err }),
    []
  );

  return { data, loading, error, createSowing, startFetch, failureFetch };
};

export default useCreateSowingService;
