import React from "react";
import styles from "./Modal.module.css";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps {
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> & {
  Button: React.FC<React.ComponentProps<typeof Dialog.Trigger>>;
  Content: React.FC<ModalContentProps>;
  Close: typeof Dialog.Close;
} = ({ open, onOpenChange, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

const ModalContent: React.FC<ModalContentProps> = ({ title, children }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Close className={`${styles.closeIcon}`}>
          <Cross1Icon />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
export default Modal;
