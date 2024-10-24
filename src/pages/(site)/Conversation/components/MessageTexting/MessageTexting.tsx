import { useEffect, useRef } from 'react'
import { useSingleConversationQuery } from '@/hooks/querys/useConversationQuery'
import MessageTextingForm from './_component/MessageTextingForm'
import MessageTextingHeader from './_component/MessageTextingHeader'
import { Params, useParams } from 'react-router-dom'
import { IMessage } from '@/interface/message'
import MessageContent from './_component/MessageContent'
import useListenMessage from '@/hooks/useListenMessage'

const MessageTexting = () => {
  const { id } = useParams<Readonly<Params<string>>>()
  const { data, isLoading, isError } = useSingleConversationQuery(id)
  useListenMessage(id)
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [data])

  if (isLoading && !id) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className='bg-white rounded-lg w-full min-h-full flex flex-col'>
      <MessageTextingHeader />
      <div className='flex-grow overflow-y-scroll w-full max-h-[550px] px-2'>
        {data && data.data.messages.length > 0 ? (
          data.data.messages.map((message: IMessage) => (
            <div key={message.timestamp} className='message-content'>
              <MessageContent
                text={message.content}
                sender={message.sender.senderType}
                time={new Date(message.timestamp).toLocaleTimeString()}
              />
            </div>
          ))
        ) : (
          <h1>Chưa có tin nhắn</h1>
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageTextingForm idUser={data?.data.userId._id} />
    </div>
  )
}

export default MessageTexting
