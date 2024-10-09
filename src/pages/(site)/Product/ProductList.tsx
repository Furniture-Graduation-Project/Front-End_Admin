import { Edit, Search, Trash, Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductList = () => {
  const products = [
    {
      id: 1,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      name: 'Product 1',
      category: 'Category 1',
      price: 100,
      quantity: 10,
      colors: ['#ff0000', '#00ff00', '#0000ff']
    },
    {
      id: 2,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',
      name: 'Product 2',
      category: 'Category 2',
      price: 200,
      quantity: 5,
      colors: ['#ffff00', '#ff00ff', '#00ffff', 'gray']
    },
    {
      id: 3,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      name: 'Product 3',
      category: 'Category 3',
      price: 150,
      quantity: 8,
      colors: ['#ff8000', '#8000ff', '#00ff80']
    }
  ]

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      {/* Thanh tìm kiếm */}
      <div className='flex justify-between items-center mb-7'>
        <div className='text-2xl font-semibold'>Product List</div>
      </div>
      <div className='w-full flex justify-between pb-7'>
        <a href='/product/add'>
          <Button variant='primary' className='flex items-center space-x-2'>
            <Plus size={18} />
            <span>Add Product</span>
          </Button>
        </a>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center space-x-2 relative'>
            <Search className='text-gray-700 absolute left-5' size={16} />
            <input
              type='text'
              placeholder='Search product name'
              className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
      {/* Bảng danh sách sản phẩm */}
      <Table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <TableHeader className='border-b-2'>
          <TableRow className='text-left'>
            <TableCell className='py-4 pl-6 font-bold'>Image</TableCell>
            <TableCell className='p-4 font-bold'>Product Name</TableCell>
            <TableCell className='p-4 font-bold'>Category</TableCell>
            <TableCell className='p-4 font-bold'>Price</TableCell>
            <TableCell className='p-4 font-bold'>Quantity</TableCell>
            <TableCell className='p-4 font-bold'>Available Colors</TableCell>
            <TableCell className='py-4 lg:pl-9 font-bold'>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className='border-t hover:bg-gray-50 transition-colors'>
<TableCell className='p-4'>
                <img src={product.image} alt={product.name} className='w-[60px] h-[60px] object-cover rounded-md' />
              </TableCell>
              <TableCell className='p-4 font-medium'>{product.name}</TableCell>
              <TableCell className='p-4'>{product.category}</TableCell>
              <TableCell className='p-4 text-green-600 font-semibold'>{product.price}</TableCell>
              <TableCell className='p-4'>{product.quantity}</TableCell>
              <TableCell className='p-4'>
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    style={{ backgroundColor: color }}
                    className='inline-block w-6 h-6 rounded-full mr-2'
                  ></span>
                ))}
              </TableCell>
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
        <p className='text-[14px] font-light'>Showing 1-09 of 10</p>
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
  )
}

export default ProductList