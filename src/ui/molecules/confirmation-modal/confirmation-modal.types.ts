export interface IConfirmationModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  description?: string;
  isCancelLoading?: boolean;
  isConfirmLoading?: boolean;
  onConfirm: (() => void) | undefined;
  title?: string;
}

export interface IConfirmationModalRef {
  close: () => void;
  open: () => void;
}
