import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ConversationService } from '@/services/conversation'
import { useQuery } from '@tanstack/react-query'
import { IApiResponse } from '@/interface/apiRespose'
import { IConversation } from './../../interface/message'

export const useSingleConversationQuery = (id?: string, userId?: string) => {
  return useQuery<IApiResponse<IConversation>, Error>({
    queryKey: id ? ['Conversation', id] : userId ? ['Conversation', 'User', userId] : [null],
    queryFn: async (): Promise<IApiResponse<IConversation>> => {
      if (id) {
        const response = await ConversationService.getById(id)
        return response.data
      } else if (userId) {
        const response = await ConversationService.getByUserId(userId)
        return response.data
      }
      throw new Error('Invalid parameters for single conversation query')
    },
    enabled: !!(id || userId)
  })
}

export const useMultipleConversationsQuery = ({
  label,
  category,
  status,
  pagination
}: {
  label?: string
  category?: string
  status?: string
  pagination?: {
    pageIndex: number
    pageSize: number
  }
}) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  return useQuery<IApiResponse<IConversation[]>, Error>({
    queryKey: label
      ? ['Conversation', 'Label', label]
      : category
        ? ['Conversation', 'Category', category]
        : status
          ? ['Conversation', 'Status', status]
          : pagination
            ? ['Conversation', pageIndex]
            : ['Conversation'],
    queryFn: async (): Promise<IApiResponse<IConversation[]>> => {
      if (label) {
        const response = await ConversationService.getByLabel(label, { pageIndex, pageSize })
        return response.data
      } else if (category) {
        const response = await ConversationService.getByCategory(category, { pageIndex, pageSize })
        return response.data
      } else if (status) {
        const response = await ConversationService.getByStatus(status, { pageIndex, pageSize })
        return response.data
      } else if (pagination) {
        const response = await ConversationService.getLimited({ pageIndex, pageSize })
        return response.data
      } else {
        const response = await ConversationService.getAll()
        return response.data
      }
    }
  })
}
