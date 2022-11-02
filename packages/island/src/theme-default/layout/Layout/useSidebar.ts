import { useState } from 'react';

export function useSideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return {
    isOpen,
    open,
    close
  };
}
