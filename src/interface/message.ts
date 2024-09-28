export interface ISender {
  senderId:  string;
  senderType: 'User' | 'Employee';
  name: string;
  avatar?: string;
}

export interface IMessage {
  sender: ISender;
  content: string;
  status: 'sent' | 'received' | 'read';
  timestamp: string;
}

export interface IConversation {
  _id: string;
  userId: {
    _id?: string;
    name: string;
  };
  messages: IMessage[];
  star: boolean;
  label: 'service' | 'feedback' | 'order';
  status: 'normal' | 'spam' | 'important' | 'deleted';
  category: 'inbox' | 'sent' | 'draft';
}

export interface ITableMetaConversation {
  openDeleteModal: (id :string) => void;
}
