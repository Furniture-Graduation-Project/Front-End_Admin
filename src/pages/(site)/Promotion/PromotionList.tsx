import { Edit, Search, Trash, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionList = () => {
    const promotions = [
        {
          _id: "64f1c0e6a2fba728bc6b7e1e",
          description: "10% off on electronics",
          type: "Percent",
          value: 10,
          startDate: new Date("2024-01-01T00:00:00Z"),
          endDate: new Date("2024-01-10T23:59:59Z"),
          productID: "64f1c0e6a2fba728bc6b7e1f",
          categoryID: "64f1c0e6a2fba728bc6b7e20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "64f1c0e6a2fba728bc6b7e2a",
          description: "20% off on furniture",
          type: "Percent",
          value: 20,
          startDate: new Date("2024-02-01T00:00:00Z"),
          endDate: new Date("2024-02-15T23:59:59Z"),
          productID: "64f1c0e6a2fba728bc6b7e2b",
          categoryID: "64f1c0e6a2fba728bc6b7e2c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "64f1c0e6a2fba728bc6b7e2d",
          description: "Fixed discount on clothing",
          type: "Fixed",
          value: 50,
          startDate: new Date("2024-03-01T00:00:00Z"),
          endDate: new Date("2024-03-31T23:59:59Z"),
          productID: "64f1c0e6a2fba728bc6b7e2e",
          categoryID: "64f1c0e6a2fba728bc6b7e2f",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      

    return (
        <div className='container mx-auto p-7 bg-[#f5f6fa]'>
            {/* Thanh tìm kiếm */}
            <div className='flex justify-between items-center mb-7'>
                <div className='text-2xl font-semibold'>Promotion List</div>
            </div>
            <div className='w-full flex justify-between pb-7'>
                <a href='/promotion/add'>
                    <Button variant='primary' className='flex items-center space-x-2'>
                        <Plus size={18} />
                        <span>Add Promotion</span>
                    </Button>
                </a>
                <div className='flex items-center space-x-2'>
                    <div className='flex items-center space-x-2 relative'>
                        <Search className='text-gray-700 absolute left-5' size={16} />
                        <input
                            type='text'
                            placeholder='Search promotion name'
                            className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
            </div>
            {/* Bảng danh sách khuyến mãi */}
            <Table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
                <TableHeader className='border-b-2'>
                    <TableRow className='text-left'>
                        <TableCell className='p-4 font-bold'>Description</TableCell>
                        <TableCell className='p-4 font-bold'>Type</TableCell>
                        <TableCell className='p-4 font-bold'>Value</TableCell>
                        <TableCell className='p-4 font-bold'>Start Date</TableCell>
                        <TableCell className='p-4 font-bold'>End Date</TableCell>
                        <TableCell className='p-4 font-bold'>Product ID</TableCell>
                        <TableCell className='p-4 font-bold'>Category ID</TableCell>
                        <TableCell className='p-4 font-bold'>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {promotions.map((promotion) => (
                        <TableRow key={promotion._id} className='border-t hover:bg-gray-50 transition-colors'>
                            <TableCell className='p-4'>{promotion.description}</TableCell>
                            <TableCell className='p-4'>{promotion.type}</TableCell>
                            <TableCell className='p-4'>{promotion.value}</TableCell>
                            <TableCell className='p-4'>{new Date(promotion.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className='p-4'>{new Date(promotion.endDate).toLocaleDateString()}</TableCell>
                            <TableCell className='p-4'>{promotion.productID}</TableCell>
                            <TableCell className='p-4'>{promotion.categoryID}</TableCell>
                            <TableCell className='p-4'>
                                <button className=' text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
                                    <Edit size={18} />
                                </button>
                                <button className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg'>
                                    <Trash size={18} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Phân trang */}
            <div className='flex justify-between items-center mt-7'>
                <p className='text-[14px] font-light'>Showing 1-2 of 2</p>
                <div>
                    <Button variant='outline'>
                        <ChevronLeft size={18} className='mx-2' />
                    </Button>
                    <Button variant='outline'>
                        <ChevronRight size={18} className='mx-2' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PromotionList;
