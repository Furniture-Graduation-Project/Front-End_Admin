import React from 'react'

interface MessageProps {
  text: string
  sender: string
  time: string
  avatarSrc?: string
}

const MessageContent: React.FC<MessageProps> = ({ text, sender, time }) => {
  return (
    <div className={`w-full flex text-sm md:text-base ${sender !== 'User' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex p-2 ${sender !== 'User' ? 'ml-auto justify-end ' : 'mr-auto'} ${sender !== 'User' ? 'w-3/4' : 'w-3/4'}`}
      >
        <div className={`p-2 rounded-lg ${sender === 'Employee' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <p>{text}</p>
          <p className={`text-sm ${sender !== 'User' ? 'text-right' : 'text-right'}`}>{time}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageContent
