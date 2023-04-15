export interface ConfirmationModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  description?: string;
  isConfirmLoading?: boolean;
  onConfirm: (() => void) | undefined;
  title?: string;
}

export interface ConfirmationModalRef {
  close: () => void;
  open: () => void;
}
