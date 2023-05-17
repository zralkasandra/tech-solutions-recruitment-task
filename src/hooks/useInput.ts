import { useReducer, useMemo, useCallback } from "react";

type InputState = {
  value: string;
  isTouched: boolean;
};

enum INPUT_ACTION {
  INPUT,
  BLUR,
  RESET,
}

type InputAction =
  | {
      type: typeof INPUT_ACTION.INPUT;
      value: string;
    }
  | {
      type: typeof INPUT_ACTION.BLUR | typeof INPUT_ACTION.RESET;
    };

const inputReducer = (state: InputState, action: InputAction) => {
  if (action.type === INPUT_ACTION.INPUT) {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === INPUT_ACTION.BLUR) {
    return { isTouched: true, value: state.value };
  }
  if (action.type === INPUT_ACTION.RESET) {
    return { isTouched: false, value: "" };
  }
  return state;
};

const useInput = (
  validateValue: (value: string) => boolean,
  defaultValue: string = ""
) => {
  const [inputState, dispatch] = useReducer<
    (state: InputState, action: InputAction) => InputState
  >(inputReducer, {
    value: defaultValue,
    isTouched: false,
  });

  const valueIsValid = useMemo(
    () => validateValue(inputState.value),
    [inputState.value, validateValue]
  );

  const hasError = useMemo(
    () => !valueIsValid && inputState.isTouched,
    [valueIsValid, inputState.isTouched]
  );

  const valueChangeHandler = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: INPUT_ACTION.INPUT,
        value: (event.target as HTMLInputElement).value,
      });
    },
    []
  );

  const inputBlurHandler = useCallback(
    (_event: React.FormEvent<HTMLInputElement>) => {
      dispatch({ type: INPUT_ACTION.BLUR });
    },
    []
  );

  const reset = useCallback(() => {
    dispatch({ type: INPUT_ACTION.RESET });
  }, []);

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
