'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import DashboardCartHeader from './components/DashboardCartHeader'
import DashboardSectionHeader from './components/DashboardSectionHeader'
import RevenueChart from './components/DashboardRevenueChart'
import { SalesChart } from './components/DashboardSaleChart'

const Dashboard = () => {
  return (
    <>
      <div className='min-h-screen bg-[#F5F6FA]'>
        <h1 className='p-10 text-[32px] font-bold'>Dashboard</h1>

        <div className='ml-5 mr-5'>
          <div className='grid grid-cols-3 gap-10'>
            <DashboardSectionHeader />
            <DashboardSectionHeader />
            <DashboardSectionHeader />
          </div>
        </div>

        <div className='ml-5 mr-5 mt-7'>
          <div className='grid grid-cols-4 gap-8'>
            <DashboardCartHeader />
            <DashboardCartHeader />
            <DashboardCartHeader />
            <DashboardCartHeader />
          </div>
        </div>

        <div className='bg-white ml-5 mr-5 rounded-lg mt-7'>
          <p className='p-5 font-bold text-[24px]'>Sales Details</p>
          <div className='p-5'>
            <SalesChart />
          </div>
        </div>

        <div className='bg-white ml-5 mr-5 rounded-lg mt-7'>
          <p className='p-5 font-bold text-[24px]'>Revenue</p>
          <div className='p-5'>
            <RevenueChart />
          </div>
        </div>

        <div className='bg-white ml-5 mr-5 rounded-lg mt-7'>
          <p className='p-5 font-bold text-[24px]'>Deals Details</p>
          <div className='ml-5 mr-5'>
            <Table className=''>
              <TableHeader className='bg-[#F1F4F9]'>
                <TableRow className=''>
                  <TableHead className='text-black font-bold'>Product Name</TableHead>
                  <TableHead className='text-black font-bold'>Image</TableHead>
                  <TableHead className='text-black font-bold pl-10'>Date - Time</TableHead>
                  <TableHead className='text-black font-bold pl-[70px]'>Price</TableHead>
                  <TableHead className='text-black font-bold'>Amount</TableHead>
                  <TableHead className='text-black font-bold pl-[120px]'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ghế cao cấp</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell className='pl-10'>20-2-2024</TableCell>
                  <TableCell className='pl-[70px]'>$250.00</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell className='pl-[90px]'>
                    <Button className='bg-green-600'>Edit</Button>
                    <Button className='bg-red-600 ml-2'>Delete</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
