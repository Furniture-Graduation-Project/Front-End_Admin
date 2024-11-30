import { User } from 'lucide-react'
const DashboardHeaderCard = ({ data, period }: { data: any; period: string }) => {
  const getTitle = (period: string) => {
    switch (period) {
      case 'day':
        return 'Ngày hôm'
      case 'week':
        return 'Tuần'
      case 'month':
        return 'Tháng'
      case 'year':
        return 'Năm'
      default:
        return 'Ngày hôm'
    }
  }
  return (
    <div className='bg-slate-100 rounded-lg p-4 flex flex-col justify-between h-[161px]'>
      <div className='flex items-center'>
        <div className='flex-grow'>
          <p className='text-[16px]'>Total User</p>
          <p className='text-[20px] font-bold mt-4'>
            {getTitle(period)} nay : {data?.current}
          </p>
          <p className='text-[20px] font-bold mt-4'>
            {getTitle(period)} trước : {data?.previous}
          </p>
        </div>
        <div className='bg-[#8280FF] w-[60px] h-[60px] rounded-xl flex items-center justify-center'>
          <User className='w-[30px] h-[30px]' />
        </div>
      </div>
      <p className='text-center text-gray-500 text-sm mt-2'>
        Tăng{' '}
        {data?.current === 0 && data?.previous === 0
          ? 0
          : data?.current <= data?.previous
            ? (data?.current / (data?.previous || 1)) * 100
            : (data?.current / 1) * 100}%{' '}
        so với {getTitle(period).toLocaleLowerCase()} trước
      </p>
    </div>
  )
}

export default DashboardHeaderCard
