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
        const response = await ConversationService.getById(id)
        return response.data
      } else if (userId) {
        const response = await ConversationService.getByUserId(userId)
        return response.data
      } else if (label) {
        const response = await ConversationService.getByLabel(label)
        return response.data
      } else if (category) {
        const response = await ConversationService.getByCategory(category)
        return response.data
      } else if (status) {
        const response = await ConversationService.getByStatus(status)
        return response.data
      } else {
        const response = await ConversationService.getAll()
        return response.data
      }
    }
  })
  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
