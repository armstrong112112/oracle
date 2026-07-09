export interface ModalButton {
  text: string
  type: string
  action?: () => void
}

export  interface ModalType {
  title: string
  description: string
  image: string
  buttons: ModalButton[]
}
