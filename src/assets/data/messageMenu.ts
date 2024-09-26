import { IMessageMenu } from '@/interface/messageMenu'
import { Mail, MessageCircleQuestion, Pencil, Send, Star, Trash2, TriangleAlert } from 'lucide-react'

const messageMenup: IMessageMenu = {
  buttons: [
    { icon: Mail, text: 'Hộp thư thoại', count: 123 }, // Inbox -> Hộp thư đến
    { icon: Star, text: 'Đã đánh dấu', count: 123 }, // Starred -> Đã đánh dấu
    { icon: Send, text: 'Đã gửi', count: 123 }, // Send -> Đã gửi
    { icon: Pencil, text: 'Nháp', count: 123 }, // Draft -> Nháp
    { icon: TriangleAlert, text: 'Thư rác', count: 123 }, // Spam -> Thư rác
    { icon: MessageCircleQuestion, text: 'Quan trọng', count: 123 }, // Important -> Quan trọng
    { icon: Trash2, text: 'Thùng rác', count: 123 } // Bin -> Thùng rác
  ],
  labels: [
    { text: 'Quan trọng' }, // Primary -> Quan trọng
    { text: 'Xã hội' }, // Social -> Xã hội
    { text: 'Bạn bè' } // Friends -> Bạn bè
  ]
}

export default messageMenup
