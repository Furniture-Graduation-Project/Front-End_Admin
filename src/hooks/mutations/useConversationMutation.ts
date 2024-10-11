import { ConversationService } from '@/services/conversation'
import { useMutation } from '@tanstack/react-query'

type ConversationMutation = 'CREATE' | 'UPDATE' | 'DELETE' | 'UPDATE_BY_USER' | 'SET_STAR'

export const useConversationMutation = (key: ConversationMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Conversation'],
    mutationFn: async ({ id, data }: { id: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ConversationService.create(id, data)
        case 'UPDATE':
          return await ConversationService.update(id, data)
        case 'DELETE':
          return await ConversationService.delete(id)
        case 'UPDATE_BY_USER':
          return await ConversationService.updateByUserId(id, data)
        case 'SET_STAR':
          if (!id) throw new Error('Cần có ID để thiết lập star')
          return await ConversationService.setStar(id)
        default:
          throw new Error('Khóa không hợp lệ')
      }
    }
  })

  return { mutate }
}
