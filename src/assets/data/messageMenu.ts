import { IMessageMenu } from '@/interface/messageMenu'
import { Mail, MessageCircleQuestion, Pencil, Send, Star, Trash2, TriangleAlert } from 'lucide-react'

const messageMenup: IMessageMenu = {
  buttons: [
    { icon: Mail, text: 'Hộp thư thoại', count: 123 },
    { icon: Star, text: 'Đã đánh dấu', count: 123 },
    { icon: Send, text: 'Đã gửi', count: 123 },
    { icon: Pencil, text: 'Nháp', count: 123 },
    { icon: TriangleAlert, text: 'Thư rác', count: 123 },
    { icon: MessageCircleQuestion, text: 'Quan trọng', count: 123 },
    { icon: Trash2, text: 'Thùng rác', count: 123 }
  ],
  labels: [{ text: 'Quan trọng' }, { text: 'Xã hội' }, { text: 'Bạn bè' }]
}

export default messageMenup
