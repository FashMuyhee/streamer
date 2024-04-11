import React, { createContext, useMemo } from 'react';
import {
  ConfirmationAlertContext as IConfirmationAlertContext,
  ConfirmationAlertOption,
} from './type';
import { ConfirmationAlert } from '@sheets';

const initialState: IConfirmationAlertContext = {
  onShow: () => {},
  isVisible: false,
};

export const ConfirmationAlertContext = createContext<IConfirmationAlertContext>(initialState);

export const ConfirmationAlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, toggleModal] = React.useState(false);
  const [option, setOption] = React.useState<ConfirmationAlertOption>({
    message: '',
    onProceed: () => () => {},
    title: '',
    proceedText: 'Proceed',
    closeText: 'Cancel',
  });

  const onShow = (options: ConfirmationAlertOption) => {
    setOption(options);
    toggleModal(!isModalOpen);
  };

  const value = useMemo(() => {
    return {
      isVisible: isModalOpen,
      onShow,
    };
  }, [isModalOpen]);

  return (
    <ConfirmationAlertContext.Provider value={value}>
      {children}
      <ConfirmationAlert
        isVisible={isModalOpen}
        option={option}
        onClose={() => toggleModal(!isModalOpen)}
      />
    </ConfirmationAlertContext.Provider>
  );
};
