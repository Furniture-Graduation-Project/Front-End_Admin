import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import MessageListHeader from './_component/MessageListHeader'
import MessageListFooter from './_component/MessageListFooter'
import { useDataTable } from '@/hooks/useDataTable'
import { columnsConversation } from './_component/columns-conversation'
import { data } from './_component/data'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ToastAction } from '@/components/ui/toast'
import { useConversationQuery } from '@/hooks/querys/useConversationQuery'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useToast } from '@/hooks/use-toast'
const MessageList = () => {
  const { toast } = useToast()
  const { isLoading, isError } = useConversationQuery()
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
  const { table } = useDataTable(data, columnsConversation, { openDeleteModal })
  return (
    <>
      <Card className='bg-white rounded-lg w-full max-h-full h-full'>
        <MessageListHeader table={table} />
        <CardContent className='border-y-2'>
          <DataTableCustom table={table} columns={columnsConversation} isLoading={isLoading} isError={isError} />
        </CardContent>
        <MessageListFooter table={table} />
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
