import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import MessageListHeader from './_component/MessageListHeader'
import { useDataTable } from '@/hooks/useDataTable'
import { columnsConversation } from './_component/columns-conversation'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ToastAction } from '@/components/ui/toast'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useToast } from '@/hooks/use-toast'
import { useMultipleConversationsQuery } from '@/hooks/querys/useConversationQuery'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { PaginationState } from '@tanstack/react-table'
const MessageList = () => {
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError, refetch } = useMultipleConversationsQuery({ pagination })
  console.log(data)

  const [openDelete, setOpenDelete] = useState(false)
  const [conversationId, setConversationId] = useState<String>('')
  const openDeleteModal = (id: string): void => {
    setConversationId(id)
    setOpenDelete(true)
  }
  const handleDelete = () => {
    setOpenDelete(false)
    console.log(conversationId)
    const date = new Date()
    toast({
      title: 'Đã chuyển bản ghi vào thùng rác ! ',
      description: format(date, "d MMM yyyy 'at' hh:mm a", { locale: vi }),
      action: <ToastAction altText='Hoàn tác'>Undo</ToastAction>
    })
  }
  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columnsConversation,
    meta: { openDeleteModal },
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  useEffect(() => {
    refetch()
  }, [table.getState().pagination])
  return (
    <>
      <Card className='bg-white rounded-lg w-full max-h-full flex-grow'>
        <MessageListHeader table={table} isLoading={isLoading} setPagination={setPagination} />
        <CardContent>
          <DataTableCustom
            table={table}
            columns={columnsConversation}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        </CardContent>
      </Card>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn chuyển bản ghi này vào thùng rác ?'
        description='Bản ghi khi chuyển vào thùng rác sẽ bị xóa sau 30 ngày không làm việc .'
        variant={'destructive'}
        isOpen={openDelete}
        setIsOpen={setOpenDelete}
        handleAciton={handleDelete}
      />
    </>
  )
}

export default MessageList
