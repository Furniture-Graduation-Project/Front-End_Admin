import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IConversation, IMessage } from '@/interface/message'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import DataTableBody from '@/components/common/DataTable/DataTableBody'
import MessageListHeader from './_component/MessageListHeader'
import MessageListFooter from './_component/MessageListFooter'
import DataTableHeader from '@/components/common/DataTable/DataTableHeader'
import { useDataTable } from '@/hooks/useDataTable'
import { useConversationQuery } from '@/hooks/querys/useConversationQuery'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
const MessageList = () => {
  const { data: dataOriginal, isLoading, isError } = useConversationQuery()
  const [openDelete, setOpenDelete] = useState(false)
  const handleStarToggle = (id: string): void => {
    const updatedData = data.map((item: IConversation) => {
      if (item._id === id) {
        return { ...item, star: !item.star }
      }
      return item
    })
    setData(updatedData)
  }
  const [data, setData] = useState<IConversation[]>([
    {
      _id: '60a9f0a2b4d8a37f9b034e5a',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5c',
            senderType: 'User',
            name: 'John Doe',
            avatar: 'https://example.com/avatar/johndoe.jpg'
          },
          content: 'Hello, I have a question regarding my order.',
          status: 'sent',
          timestamp: '2024-09-24T12:34:56.789Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5d',
            senderType: 'Employee',
            name: 'Customer Support',
            avatar: 'https://example.com/avatar/support.jpg'
          },
          content: 'Sure, how can I assist you?',
          status: 'received',
          timestamp: '2024-09-24T12:35:30.123Z'
        }
      ],
      star: false,
      label: 'service',
      status: 'normal',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },

    {
      _id: '60a9f0a2b4d8a37f9b034e61',
      userId: {
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e62',
            senderType: 'User',
            name: 'Emily Johnson',
            avatar: 'https://example.com/avatar/emilyjohnson.jpg'
          },
          content: 'Can I change my order before it ships?',
          status: 'read',
          timestamp: '2024-09-22T08:45:12.456Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e63',
            senderType: 'Employee',
            name: 'Order Support',
            avatar: 'https://example.com/avatar/ordersupport.jpg'
          },
          content: 'Yes, please provide the new details.',
          status: 'read',
          timestamp: '2024-09-22T08:46:30.789Z'
        }
      ],
      star: false,
      label: 'order',
      status: 'normal',
      category: 'inbox'
    }
  ])
  const columns: ColumnDef<IConversation>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'star',
      header: 'Đánh dấu',
      cell: ({ row }) => {
        const rowData = row.original as IConversation
        return (
          <Star
            onClick={() => handleStarToggle(rowData._id)}
            className={`capitalize w-[20px] h-[20px] ${row.getValue('star') ? 'text-yellow-500' : 'text-gray-400'}`}
            fill={row.getValue('star') ? '#FFD700' : 'none'}
            stroke={row.getValue('star') ? '#FFD700' : 'gray'}
          />
        )
      }
    },
    {
      accessorKey: 'userId',
      header: () => <div>Tên khách hàng</div>,

      cell: ({ row }) => {
        const messages = row.getValue('messages') as IMessage[]
        const conversationId = row.original._id
        const userId = row.getValue('userId') as { name: string }
        if (messages && messages.length > 0 && conversationId) {
          return (
            <Link to={`/conversation/texting/${conversationId}`}>
              {messages[0].status === 'read' ? (
                <div className='lowercase'>{userId.name}</div>
              ) : (
                <div className='lowercase font-bold'>{userId.name}</div>
              )}
            </Link>
          )
        }

        return <div>##Trống</div>
      }
    },
    {
      accessorKey: 'label',
      header: () => <div>Nhãn</div>,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('label')}</div>
    },
    {
      accessorKey: 'messages',
      header: () => <div>Nội dung</div>,
      cell: ({ row }) => {
        const messages = row.getValue('messages') as Array<IMessage>
        const conversationId = row.original._id
        if (messages.length > 0 && conversationId) {
          return (
            <Link to={`/conversation/texting/${conversationId}`}>
              {messages[0].status === 'read' ? (
                <div className='font-medium line-clamp-1'>{messages[0].content}</div>
              ) : (
                <div className='flex items-center space-x-2'>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                  </span>
                  <div className='font-bold line-clamp-1'>{messages[0].content}</div>
                </div>
              )}
            </Link>
          )
        }
        return <div className='font-medium'>##Nội dung không có sẵn</div>
      }
    },
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <button className='flex' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Ngày
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
      cell: ({ row }) => {
        const messages = row.getValue('messages') as Array<IMessage>

        if (messages.length > 0) {
          const date = new Date(messages[0].timestamp)

          const formattedDate = format(date, 'Pp', { locale: vi })

          return <div className='font-medium'>{formattedDate}</div>
        }

        return <div className='font-medium'>##Nội dung không có sẵn</div>
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const conversationId = row.original._id
        const userId = row.getValue('userId') as { _id: string }
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className='mr-2 h-4 w-4' />
                  <Link to={`/account/user/${userId}`}>Thông tin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className='mr-2 h-4 w-4' />
                  <Link to={`/conversation/texting/${conversationId}`}>Hội thoại</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDelete(true)} className='text-red-600'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Thùng rác
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      }
    }
  ]

  const { table } = useDataTable(data, columns)

  return (
    <Card className='bg-white rounded-lg w-full max-h-full h-full'>
      <MessageListHeader table={table} />
      <CardContent className='border-y-2'>
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} isLoading={isLoading} />
        </Table>
      </CardContent>
      <MessageListFooter table={table} />
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn chắc chắn muốn chuyển tin này vào thùng rác?</AlertDialogTitle>
            <AlertDialogDescription>
              Tin nhắn trong thùng rác sẽ bị xóa sau 30 ngày không khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <Button variant={'destructive'} onClick={() => setOpenDelete(false)}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export default MessageList
