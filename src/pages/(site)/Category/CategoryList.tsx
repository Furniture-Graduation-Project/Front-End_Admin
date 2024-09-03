import { format } from 'date-fns';
import { Edit, Search, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Category {
    _id: string;
    categoryName: string;
    description: string;
    DateCreated: string;
}

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/category')
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className='container mx-auto p-7 bg-[#f5f6fa]'>
            {/* Thanh tìm kiếm */}
            <div className='flex justify-between items-center mb-7'>
                <div className='text-2xl font-semibold'>Category List</div>
                <div className='flex items-center space-x-2 relative'>
                    <Search className='text-gray-700 absolute left-5' size={16} />
                    <input
                        type='text'
                        placeholder='Search category name'
                        className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
            </div>
            <Table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
                <TableHeader className='border-b-2'>
                    <TableRow className='text-left'>
                        <TableCell className='p-4 font-bold'>Category Name</TableCell>
                        <TableCell className='p-4 font-bold'>Description</TableCell>
                        <TableCell className='p-4 font-bold'>Created</TableCell>
                        <TableCell className='py-4 lg:pl-9 font-bold'>Action</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category._id} className='border-t hover:bg-gray-50 transition-colors'>
                            <TableCell className='p-4 font-medium'>{category.categoryName}</TableCell>
                            <TableCell className='p-4'>{category.description}</TableCell>
                            <TableCell className='p-4'>
                                {format(new Date(category.DateCreated), 'HH:mm:ss dd/MM/yyyy')}
                            </TableCell>
                            <TableCell className='p-4'>
                                <button className='text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
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
        <p className='text-[14px] font-light'>Showing 1-09 of 78</p>
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
}

export default CategoryList;
