import { ConversationService } from '@/services/conversation'
import { useQuery } from '@tanstack/react-query'

export const useConversationQuery = (
  id?: string,
  userId?: string,
  label?: string,
  category?: string,
  status?: string
) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id
      ? ['Conversation', id]
      : userId
        ? ['Conversation', 'User', userId]
        : label
          ? ['Conversation', 'Label', label]
          : category
            ? ['Conversation', 'Category', category]
            : status
              ? ['Conversation', 'Status', status]
              : ['Conversation'],
    queryFn: async () => {
      if (id) {
        return await ConversationService.getById(id)
      } else if (userId) {
        return await ConversationService.getByUserId(userId)
      } else if (label) {
        return await ConversationService.getByLabel(label)
      } else if (category) {
        return await ConversationService.getByCategory(category)
      } else if (status) {
        return await ConversationService.getByStatus(status)
      } else {
        return await ConversationService.getAll()
      }
    }
  })
  return {
    data,
    isLoading,
    isError,
    ...rest
  }
}
