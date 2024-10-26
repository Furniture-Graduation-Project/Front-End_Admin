export interface ISender {
  senderId: string
  senderType: 'User' | 'Employee'
  name: string
}

export interface IMessage extends IMessageNew {
  status: 'sent' | 'read'
  timestamp: string
}

export interface IMessageNew {
  sender: ISender
  content: string
  type: 'text' | 'product' | 'voucher'
}

export interface IConversation {
  _id: string
  userId: {
    _id?: string
    name: string
  }
  messages: IMessage[]
  star: boolean
  label: 'service' | 'feedback' | 'order'
}

export interface IConversationNew {
  userId: string
  label: 'service' | 'feedback' | 'order'
}

export interface ITableMetaConversation {
  openDeleteModal: (id: string) => void
}

export interface IDateKey {
  key?: string
  param?: string
}

export interface IMessageButton {
  icon: any
  text: string
  count: number
  path: string
}

export interface IMessageLabel {
  text: string
}
export interface IMessageMenu {
  buttons: IMessageButton[]
}
