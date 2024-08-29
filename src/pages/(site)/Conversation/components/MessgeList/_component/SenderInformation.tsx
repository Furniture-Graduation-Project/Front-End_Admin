import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SenderInformation = () => {
  const [starChecked, setStarChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  const handleStarToggle = () => {
    setStarChecked(!starChecked)
  }

  const handleCheckboxToggle = () => {
    setCheckboxChecked(!checkboxChecked)
  }

  return (
    <>
      <Link to={`/conversation/texting`}>
        <div className='flex items-center space-x-6 mt-7'>
          <div className='cursor-pointer' onClick={handleCheckboxToggle}>
            <Input
              type='checkbox'
              className='w-[20px] h-[20px]'
              checked={checkboxChecked}
              onChange={handleCheckboxToggle}
            />
          </div>
          <div className='cursor-pointer' onClick={handleStarToggle}>
            <Star
              className={`w-[20px] h-[20px] ${starChecked ? 'text-yellow-500' : 'text-gray-400'}`}
              fill={starChecked ? '#FFD700' : 'none'}
              stroke={starChecked ? '#FFD700' : 'gray'}
            />
          </div>
          <p className='font-bold line-clamp-1'>Jullu Jalal</p>
          <p className='font-bold line-clamp-1'>Our Bachelor of Commerce program is ACBSP-accredited.</p>
          <p>8:38 AM</p>
        </div>
      </Link>
      <hr className='m-7' />
    </>
  )
}

export default SenderInformation
