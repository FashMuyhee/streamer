import { ConfirmationAlertContext } from '@contexts';
import { useContext } from 'react';

export const useConfirmationAlert = () => {
  const context = useContext(ConfirmationAlertContext);
  return context;
};
