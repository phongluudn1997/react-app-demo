import * as React from "react";

const useAsync = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return {
          status: "loading",
          data: null,
          error: null,
        };
      case "success":
        return {
          status: "success",
          data: action.data,
          error: null,
        };
      case "error":
        return {
          status: "error",
          data: null,
          error: action.error,
        };
      default:
        throw new Error(`Unhandle action type ${action.type}`);
    }
  };
  const initialState = { status: "idle", data: null, error: null };
  const [{ data, error, status }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const setData = React.useCallback((data) => {
    dispatch({ type: "success", data });
  }, []);
  const setError = React.useCallback(
    (error) => dispatch({ type: "error", error }),
    []
  );

  const execute = React.useCallback(
    (promise) => {
      dispatch({ type: "loading" });
      return promise
        .then((data) => {
          setData(data.data);
          return data.data;
        })
        .catch((error) => {
          setError(error);
          return Promise.reject(error);
        });
    },
    [setData, setError]
  );

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";
  return {
    data,
    error,
    status,
    execute,
    setData,
    setError,
    isError,
    isLoading,
    isSuccess,
  };
};

export { useAsync };
