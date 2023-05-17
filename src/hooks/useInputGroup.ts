import { useReducer, useCallback } from "react";

export type InputType = {
  value: string;
  isTouched: boolean;
  error: string;
  id: string;
};

enum INPUT_ACTION {
  INPUT,
  BLUR,
  RESET,
  UPDATE,
}

type InputAction =
  | {
      type: typeof INPUT_ACTION.INPUT;
      value: string;
      id: string;
    }
  | {
      type: typeof INPUT_ACTION.BLUR;
      id: string;
    }
  | {
      type: typeof INPUT_ACTION.RESET;
    }
  | {
      type: typeof INPUT_ACTION.UPDATE;
      defaultValues: string[];
    };

const inputGroupReducer = (state: InputType[], action: InputAction) => {
  if (action.type === INPUT_ACTION.INPUT) {
    const { id, value } = action;
    const currentInput = state.find((input) => input.id === id)!;
    currentInput.value = value;
    return [...state.filter((input) => input.id !== id), currentInput];
  }
  if (action.type === INPUT_ACTION.BLUR) {
    const { id } = action;
    const currentInput = state.find((input) => input.id === id)!;
    currentInput.isTouched = true;
    return [...state.filter((input) => input.id !== id), currentInput];
  }
  if (action.type === INPUT_ACTION.RESET) {
    return state.map((input) => ({
      value: "",
      id: input.id,
      isTouched: false,
      error: "",
    }));
  }
  if (action.type === INPUT_ACTION.UPDATE) {
    const { defaultValues } = action;
    return state.map((input, index) => ({
      value: defaultValues[index],
      id: input.id,
      isTouched: false,
      error: "",
    }));
  }
  return state;
};

const useInputGroup = (
  data: string[],
  validateValue: (value: number) => string,
  defaultValues?: string[]
) => {
  const [inputGroupState, dispatch] = useReducer<
    (state: InputType[], action: InputAction) => InputType[]
  >(
    inputGroupReducer,
    data.map((id: string, index: number) => ({
      value: (defaultValues && defaultValues[index]) || "0",
      isTouched: false,
      error: "",
      id,
    }))
  );

  const valuesAreValid =
    inputGroupState
      .map((input: InputType) => {
        input.error = validateValue(parseInt(input.value));
        return input;
      })
      .filter((input: InputType) => input.error !== "").length === 0;
  const hasError =
    !valuesAreValid &&
    inputGroupState.filter((input: InputType) => !input.isTouched).length === 0;

  const valueChangeHandler = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: INPUT_ACTION.INPUT,
        value: (event.target as HTMLInputElement).value,
        id: (event.target as HTMLInputElement).id,
      });
    },
    []
  );

  const inputBlurHandler = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: INPUT_ACTION.BLUR,
        id: (event.target as HTMLInputElement).id,
      });
    },
    []
  );

  const reset = useCallback(() => {
    dispatch({ type: INPUT_ACTION.RESET });
  }, []);

  const updateDefaultData = useCallback((defaultValues: string[]) => {
    dispatch({ type: INPUT_ACTION.UPDATE, defaultValues });
  }, []);

  return {
    values: inputGroupState,
    isValid: valuesAreValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    updateDefaultData,
  };
};

export default useInputGroup;
