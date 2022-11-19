import React, { useCallback } from "react";
import { emailRegExp, nameRegExp } from "./constants";

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
      setInputErrors({...inputErrors, email: 'Введите домен верхнего уровня. Например, ".ru".'});
      setIsValid(false);
    }
  }

  const validateName = () => {
    console.log(nameRegExp.test(inputValues.name));
    if (!nameRegExp.exec(inputValues.name)) {
      setInputErrors({...inputErrors, name: "Имя может содержать только латиницу, кириллицу, пробел или дефис."});
      setIsValid(false);
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
    validateName,
    submitError,
    setSubmitError
  };
}
