import React, { useCallback } from "react";
import { emailRegExp } from "./constants";

export function useFormWithValidation() {
  const [inputValues, setInputValues] = React.useState({});
  const [inputErrors, setInputErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputValues({...inputValues, [name]: value});
    setInputErrors({...inputErrors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    setSubmitError(null);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newValues);
      setInputErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setInputValues, setInputErrors, setIsValid]
  );

  const validateEmail = () => {
    if ((inputValues.email) && (!inputErrors.email) && (!emailRegExp.test(inputValues.email))) {
      setInputErrors({...inputErrors.email, email: 'Введите домен верхнего уровня. Например, ".ru".'});
    }
  }

  return {
    inputValues,
    handleChange,
    inputErrors,
    setInputErrors,
    isValid,
    resetForm,
    validateEmail,
    submitError,
    setSubmitError
  };
}
