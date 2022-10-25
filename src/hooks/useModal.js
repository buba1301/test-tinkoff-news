import React, { useState } from 'react';
import Modal from '../components/Modal';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const Dialog = () => <Modal onClosed={close} isOpen={isOpen} />;

  return { isOpen, Dialog, open, close };
};
