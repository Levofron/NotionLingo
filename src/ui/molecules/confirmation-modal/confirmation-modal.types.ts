export interface IConfirmationModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  description?: string;
  onConfirm: (() => void) | undefined;
  title?: string;
}

export interface IConfirmationModalRef {
  close: () => void;
  open: () => void;
}
