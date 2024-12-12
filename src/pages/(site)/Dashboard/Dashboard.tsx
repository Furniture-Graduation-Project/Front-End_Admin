'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import RevenueChart from './components/DashboardRevenueChart';
import DashboardHeader from './components/DashboardHeader';
import { useLatestOrders } from '@/hooks/querys/useOrderQuery';
import { Link } from 'react-router-dom';
import DashboardPieChart from './components/DashboardPieChart';

const Dashboard = () => {
  // Lấy dữ liệu từ custom hook
  const { data: orders, isLoading, isError } = useLatestOrders();

  return (
    <div className='min-h-screen bg-[#F5F6FA] dark:bg-gray-800'>
      {/* Header */}
      <div className='ml-5 mr-5 mt-7 bg-white p-5 rounded-lg dark:bg-gray-800'>
        <DashboardHeader />
      </div>

      {/* Chi tiết bán hàng */}
      <div className='bg-white ml-5 mr-5 rounded-lg mt-7 dark:bg-gray-800'>
        <p className='p-5 font-bold text-[24px]'>Chi tiết bán hàng</p>
        <div className='p-5 dark:bg-gray-800'>
          <DashboardPieChart />
        </div>
      </div>

      {/* Doanh thu */}
      <div className='bg-white ml-5 mr-5 rounded-lg mt-7 dark:bg-gray-800'>
        <p className='p-5 font-bold text-[24px]'>Thống kê danh mục</p>
        <div className='p-5'>
          <RevenueChart />
        </div>
      </div>

      {/* Chi tiết giao dịch */}
      <div className='bg-white ml-5 mr-5 rounded-lg mt-7 dark:bg-gray-800'>
        <p className='p-5 font-bold text-[24px]'>Chi tiết giao dịch</p>
        <div className='ml-5 mr-5'>
          {isLoading && (
            <div className='text-center p-5 text-gray-500'>
              Đang tải dữ liệu...
            </div>
          )}
          {isError && (
            <div className='text-center p-5 text-red-500'>
              Lỗi khi tải dữ liệu, vui lòng thử lại sau.
            </div>
          )}
          {!isLoading && !isError && (
            <Table>
              <TableHeader className='bg-[#F1F4F9]'>
                <TableRow>
                  <TableHead className='text-black font-bold'>STT</TableHead>
                  <TableHead className='text-black font-bold'>Tên đơn hàng</TableHead>
                  <TableHead className='text-black font-bold'>Số điện thoại</TableHead>
                  <TableHead className='text-black font-bold'>Địa chỉ</TableHead>
                  <TableHead className='text-black font-bold'>Ngày</TableHead>
                  <TableHead className='text-black font-bold'>Tổng giá trị</TableHead>
                  <TableHead className='text-black font-bold'>Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.length > 0 ? (
                  orders.map((order: any, index: number) => (
                    <TableRow key={orders.id || index}>
                      <TableCell className='text-black'>{index + 1}</TableCell>
                      <TableCell>{order?.orderName || 'Không xác định'}</TableCell>
                      <TableCell>{order?.orderPhone || 'Không xác định'}</TableCell>
                      <TableCell>{order?.orderAddress || 'Không xác định'}</TableCell>
                      <TableCell>
                        {order?.createdAt
                          ? `${new Date(order.createdAt).toLocaleDateString()}`: 'Không xác định'}
                      </TableCell>
                      <TableCell>{order?.totalPrice}</TableCell>
                      <TableCell>
                      <Button className=" bg-black hover:bg text-white px-4 py-2 rounded">
                          <Link to={`/order/edit/${order?._id}`} className="flex items-center">
                            Chi tiết
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center'>
                      Không có đơn hàng nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
