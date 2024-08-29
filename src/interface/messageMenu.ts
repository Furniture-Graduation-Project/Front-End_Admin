export interface IMessageButton {
  icon: any
  text: string
  count: number
}

export interface IMessageLabel {
  text: string
}
export interface IMessageMenu {
  buttons: IMessageButton[]
  labels: IMessageLabel[]
}
