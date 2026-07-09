export interface ModalData {
  title?: string;
  description?: string;
  isOpen?: boolean;
  buttonText?: string;
  cancelText?: string;
  successText?: string;
  type?: string;
  buttonType?: string;
  isCancel?: boolean;
  isEscrowDecline?: boolean;
  escrowButtonText?: string;
  escrowButtonType?: string;
}

export interface Modals {
  [key: string]: ModalData;
}

export const modals: Modals = {
  categoryInfo: { isOpen: false },
  verificationPeriod: { isOpen: false },
  business: { isOpen: false, isCancel: false },
  contact: { isOpen: false, isCancel: false },
  links: { isOpen: false, isCancel: false },
  screenshot: { isOpen: false, isCancel: false },
  attachedFiles: { isOpen: false, isCancel: false },
  success: { isOpen: false },
  successApplication: {
    isOpen: false,
    type: "success",
    buttonType: "secondary",
  },
  profileTrial: { isOpen: false, isCancel: false, type: "trial" },
  profileTrialArrow: { isOpen: false, isCancel: false, type: "trial" },
  securityDeposit: { isOpen: false, isCancel: false, type: "deposit" },
  securityDepositMean: { isOpen: false, isCancel: false, type: "deposit" },
  successNewCard: { isOpen: false, type: "success", isCancel: false },
  blackListSent: { isOpen: false, type: "success", isCancel: false },
  blockCardPermission: {
    isOpen: false,
    type: "block",
    buttonType: "secondary",
    isCancel: true,
  },
};
