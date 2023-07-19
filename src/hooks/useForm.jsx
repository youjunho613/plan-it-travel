import { useCallback, useState } from "react";
import _ from "lodash";

// TODO useForm 설명
const useForm = (initialState, validation, submitAction) => {
  console.log("initialState",initialState)
  console.log("validation",validation)
  console.log("submitAction",submitAction)
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = useCallback(
    event => setValues({ ...values, [event.target.name]: event.target.value }),
    [values]
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setErrors(validation(values)); // 유효성 검사
      if (_.isEmpty(validation(values))) { // 유효성 검사를 통과했는지?
        submitAction(values); // 개발자가 원하는 행동
        setValues(initialState); // 인풋값 초기화
      }
    },
    [initialState, submitAction, validation, values]
  );

  const resister = name => ({ name, value: values[name], onChange });

  return { values, errors, onSubmit, resister };
};

export default useForm;
