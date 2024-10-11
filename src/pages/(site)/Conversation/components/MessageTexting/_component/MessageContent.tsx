import React from 'react'

interface MessageProps {
  text: string
  sender: 'me' | 'other'
  time: string
  avatarSrc?: string
}

const MessageContent: React.FC<MessageProps> = ({ text, sender, time, avatarSrc }) => {
  return (
    <div className={`flex ${sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
      {sender === 'other' && avatarSrc && (
        <div className='flex flex-col items-start mr-2'>
          <div className='flex-grow' />
          <img src={avatarSrc} alt='Avatar' className='w-10 h-10 rounded-full object-cover' />
        </div>
      )}
      <div className={`flex p-3 ${sender === 'me' ? 'ml-auto' : 'mr-auto'} ${sender === 'me' ? 'w-3/4' : 'w-3/4'}`}>
        <div className={`p-3 rounded-lg ${sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <p>{text}</p>
          <p className={`text-sm ${sender === 'me' ? 'text-right' : 'text-right'}`}>{time}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageContent
