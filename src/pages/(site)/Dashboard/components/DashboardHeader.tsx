import { useAccountCount } from '@/hooks/querys/useAccountQuery'
import DashboardHeaderCard from './_component/DashboardHeaderCard'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useOrderCount, useOrderRevenue } from '@/hooks/querys/useOrderQuery'
import { useProuductCount } from '@/hooks/querys/useProductQuery'
const DashboardHeader = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day')
  const { data: dataUser, refetch: refetchUser } = useAccountCount(period)
  const { data: dataOrderCount, refetch: refetchOrderCount } = useOrderCount(period)
  const { data: dataProduct, refetch: refetchProduct } = useProuductCount(period)
  const { data: datahOrderRevenue, refetch: refetchOrderRevenue } = useOrderRevenue(period)
  useEffect(() => {
    refetchUser()
    refetchOrderCount()
    refetchProduct()
    refetchOrderRevenue()
  }, [period])
  return (
    <>
      <div className='flex gap-2 mb-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setPeriod('day')} variant='outline'>
                Ngày
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>So sánh dữ liêu với ngày hôm trước</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setPeriod('week')} variant='outline'>
                Tuần
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>So sánh dữ liêu với tuần trước</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setPeriod('month')} variant='outline'>
                Tháng
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>So sánh dữ liêu với tháng trước</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setPeriod('year')} variant='outline'>
                Năm
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>So sánh dữ liêu với năm trước</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <DashboardHeaderCard data={dataUser} period={period} type={'user'} />
        <DashboardHeaderCard data={dataOrderCount} period={period} type={'order'} />
        <DashboardHeaderCard data={dataProduct} period={period} type={'product'} />
        <DashboardHeaderCard data={datahOrderRevenue} period={period} type={'revenue'} />
      </div>
    </>
  )
}

export default DashboardHeader
