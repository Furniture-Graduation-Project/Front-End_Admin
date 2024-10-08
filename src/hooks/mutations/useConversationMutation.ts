import { ConversationService } from '@/services/conversation'
import { useMutation } from '@tanstack/react-query'

type ConversationMutation = 'CREATE' | 'UPDATE' | 'DELETE' | 'UPDATE_BY_USER' | 'SET_STAR'

export const useConversationMutation = (key: ConversationMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Conversation'],
    mutationFn: async (params: { id?: string; userId?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ConversationService.create()
        case 'UPDATE':
          if (!params.id) throw new Error('Cần có ID để cập nhật')
          return await ConversationService.update(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('Cần phải có ID để xóa')
          return await ConversationService.delete(params.id)
        case 'UPDATE_BY_USER':
          if (!params.userId) throw new Error('Người dùng cần phải nhập ID người dùng để cập nhật')
          return await ConversationService.updateByUserId(params.userId, params.data)
        case 'SET_STAR':
          if (!params.id) throw new Error('Cần có ID để thiết lập star')
          return await ConversationService.setStar(params.id)
        default:
          throw new Error('Khóa không hợp lệ')
      }
    }
  })

  return { mutate }
}
