import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { ArrowLeft, CircleAlert, FileDown, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const MessageTextingHeader = () => {
  return (
    <div className='flex justify-between items-center  border-b py-4'>
      <div className='flex gap-3 mt-2'>
        <Link to={`/conversation`}>
          <ArrowLeft className='bg-slate-200 rounded-lg' />
        </Link>
        <p className='font-bold text-[20px] ml-3 relative -mt-[3px]'>Minerva Barnett</p>
        <Badge variant={'default'}>Service</Badge>
      </div>

      <ToggleGroup className='w-fit mt-[6px]' variant='outline' type='multiple'>
        <Button variant='outline'>
          <FileDown />
        </Button>
        <Button variant='outline'>
          <CircleAlert />
        </Button>
        <Button variant='outline'>
          <Trash2 />
        </Button>
      </ToggleGroup>
    </div>
  )
}

export default MessageTextingHeader
