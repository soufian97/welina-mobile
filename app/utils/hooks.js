import { useEffect, useRef, useState } from 'react';

const initialForm = {
  value: '',
  errors: [],
  get hasErrors() {
    return !!this.errors.length;
  },
};
export const useForm = (name, initialValue = '', validations = []) => {
  const reduceValidations = (value) =>
    validations.map((validator) => validator(value)).filter((e) => !!e);
  const [state, changeState] = useState({
    value: initialValue,
    errors: reduceValidations(initialValue),
    dirty: false,
  });
  return Object.assign(Object.create(initialForm), {
    ...state,
    name,
    resetForm: () => {
      changeState({
        dirty: false,
        value: initialValue,
        errors: validations.length !== 0 ? reduceValidations(initialValue) : [],
      });
    },
    changeModel: (value) =>
      changeState({
        dirty: true,
        value,
        errors: validations.length !== 0 ? reduceValidations(value) : [],
      }),
  });
};

export const useTimer = (initialTime = 0, isActive = true) => {
  const [timer, changeTime] = useState(initialTime);
  const [active, setActive] = useState(isActive);
  useEffect(() => {
    const intervalId =
      active && timer ? setTimeout(() => changeTime(timer - 1), 1000) : 0;
    return () => {
      clearTimeout(intervalId);
    };
  }, [timer, active]);
  return {
    timer,
    pauseTimer: () => setActive(false),
    resumeTimer: () => setActive(true),
    resetTimer: (initialTime = 0) => changeTime(initialTime),
  };
};

export const usePrevious = (value, defaultValue) => {
  const ref = useRef(defaultValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
