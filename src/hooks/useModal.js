import React, { useState } from 'react';
import Modal from '../components/Modal';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const Dialog = () =>
    isOpen && <Modal onClosed={close} isOpen={isOpen} close={close} />;

  return { isOpen, Dialog, open, close };
};
