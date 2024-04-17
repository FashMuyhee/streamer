/**
 * custom hook to validate form
 */

import { isEmptyString, isValidEmail } from '@utils';
import { useState, useCallback } from 'react';

type Validation<T> = {
  [key in keyof T]: 'string' | 'email' | 'password';
};

type Error<T> = {
  [key in keyof T]: string | null;
};

interface UseFormProps<T> {
  defaultValues?: T | null;
  validationRule?: Validation<T>;
}

const useForm = <T>({ defaultValues, validationRule }: UseFormProps<T> = {}) => {
  const [values, setValues] = useState<T | null | undefined>(defaultValues);
  const [errors, setErrors] = useState<Error<T> | null>(null);

  const register = useCallback(
    (name: keyof T) => ({
      onChangeText: (value: string) => {
        // @ts-ignore
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        // @ts-ignore
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Clear error on change
      },
    }),
    [] // Empty dependency array for useCallback optimization
  );

  const handleSubmit = useCallback(
    (onSubmit: (v: T) => void) => {
      // @ts-ignore
      const newErrors = Object.keys(values).reduce((acc, key) => {
        // @ts-ignore
        const rule = !!validationRule ? validationRule[key] : 'string';
        // @ts-ignore
        const field = values[key] as string;
        let error = null;
        if (isEmptyString(field)) {
          error = 'Required';
        } else if (rule == 'email' && !isValidEmail(field)) {
          error = 'Invalid email address';
        } else if (rule == 'password' && field.length < 8) {
          error = 'Minimum of 8 characters required';
        }
        // @ts-ignore
        return { ...acc, [key]: error };
      }, {} as Error<T>);

      setErrors(newErrors);
      if (Object.values(newErrors).every((error) => error == null)) {
        // @ts-ignore
        onSubmit(values);
      }
    },
    [values]
  );

  return { values, errors, register, handleSubmit };
};

export default useForm;
