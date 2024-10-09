import { useSingleConversationQuery } from '@/hooks/querys/useConversationQuery'
import MessageContent from './_component/MessageContent'
import MessageTextingForm from './_component/MessageTextingForm'
import MessageTextingHeader from './_component/MessageTextingHeader'
import { useParams } from 'react-router-dom'
import { IMessage } from '@/interface/message'

const MessageTexting = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useSingleConversationQuery(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log(data)

  return (
    <div className='bg-white rounded-lg w-full px-6'>
      <MessageTextingHeader />
      <div className='mb-16'>
        {data && data.messages.length > 0 ? (
          data.messages.map((message: IMessage) => (
            <h1 key={message.timestamp}>dhdscdshjcb</h1>
            // <MessageContent
            //   key={message.timestamp}
            //   text={message.content}
            //   sender={message.sender.senderType === 'User' ? 'me' : 'other'}
            //   time={new Date(message.timestamp).toLocaleTimeString()}
            //   avatarSrc={message.sender.avatar || '/404.png'}
            // />
          ))
        ) : (
          <h1>Chưa có tin nhắn</h1>
        )}
      </div>
      <MessageTextingForm />
    </div>
  )
}

export default MessageTexting
