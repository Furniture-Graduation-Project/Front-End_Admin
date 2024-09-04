import { format } from 'date-fns';
import { Edit, Search, Trash, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Category {
    _id: string;
    categoryName: string;
    description: string;
    DateCreated: string;
}

const ITEMS_PER_PAGE = 10;

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/category');
            if (response.ok) {
                const data = await response.json();
                // Check the structure of data being returned
                console.log('Fetched Categories:', data);
                setCategories(data.data); // Adjust if data structure is different
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCategories(); 
    }, []);

    const handleEdit = (_id: string) => {
        navigate(`/category/edit/${_id}`);
    };

    const handleDelete = async (_id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`http://localhost:3000/category/${_id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Category deleted successfully');
                    fetchCategories(); // Refresh the list after deletion
                } else {
                    alert('Failed to delete category');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Filter categories based on the search term
    const filteredCategories = categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Slice the filtered categories array to only show the items for the current page
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

    // Change page
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className='container mx-auto p-7 bg-[#f5f6fa]'>
            {/* Search Bar */}
            <div className='flex justify-between items-center mb-7'>
                <div className='text-2xl font-semibold'>Category List</div>
            </div>
            <div className='w-full flex justify-between pb-7'>
                <a href='/category/add'>
                    <Button variant='primary' className='flex items-center space-x-2'>
                        <Plus size={18} />
                        <span>Add Category</span>
                    </Button>
                </a>
                <div className='flex items-center space-x-2'>
                    <div className='flex items-center space-x-2 relative'>
                        <Search className='text-gray-700 absolute left-5' size={16} />
                        <input
                            type='text'
                            placeholder='Search category name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
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
                    {paginatedCategories.map((category) => (
                        <TableRow key={category._id} className='border-t hover:bg-gray-50 transition-colors'>
                            <TableCell className='p-4 font-medium'>{category.categoryName}</TableCell>
                            <TableCell className='p-4'>{category.description}</TableCell>
                            <TableCell className='p-4'>
                                {format(new Date(category.DateCreated), 'HH:mm:ss dd/MM/yyyy')}
                            </TableCell>
                            <TableCell className='p-4'>
                                <button className='text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg' onClick={() => handleEdit(category._id)}>
                                    <Edit size={18} />
                                </button>
                                <button className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg' onClick={() => handleDelete(category._id)}>
                                    <Trash size={18} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
            <div className='flex justify-between items-center mt-7'>
                <p className='text-[14px] font-light'>
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length}
                </p>
                <div>
                    <Button variant='outline' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <ChevronLeft size={18} className='mx-2' />
                    </Button>
                    <Button variant='outline' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <ChevronRight size={18} className='mx-2' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
