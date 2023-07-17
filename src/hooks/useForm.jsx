import { useCallback, useState } from "react";
import _ from "lodash";

// TODO useForm 설명
const useForm = (initialState, validation, submitAction) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = useCallback(
    event => setValues({ ...values, [event.target.name]: event.target.value }),
    [values]
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setErrors(validation(values));
      if (_.isEmpty(validation(values))) {
        submitAction(values);
        setValues(initialState);
      }
    },
    [initialState, submitAction, validation, values]
  );

  const resister = name => ({ name, value: values[name], onChange });

  return { values, errors, onSubmit, resister };
};

export default useForm;
