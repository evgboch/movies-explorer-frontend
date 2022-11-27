import React, { useCallback } from "react";
import { REG_EXPS, ERROR_MESSAGES } from "./constants";

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
    if ((inputValues.email) && (!inputErrors.email) && (!REG_EXPS.email.test(inputValues.email))) {
      setInputErrors({ ...inputErrors, email: ERROR_MESSAGES.validation.email });
      setIsValid(false);
    }
  }

  const validateName = () => {
    if (!REG_EXPS.name.exec(inputValues.name)) {
      setInputErrors({ ...inputErrors, name: ERROR_MESSAGES.validation.name });
      setIsValid(false);
    }
  }

  return {
    inputValues,
    setInputValues,
    handleChange,
    inputErrors,
    setInputErrors,
    isValid,
    setIsValid,
    resetForm,
    validateEmail,
    validateName,
    submitError,
    setSubmitError
  };
}
