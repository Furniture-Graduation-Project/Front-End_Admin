import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Upload } from 'lucide-react'

const product = {
  id: 1,
  thumnail: 'https://picsum.photos/300/300',
  name: 'Ghế Sofa KD01',
  title: 'Nhập khẩu nguyên chiếc tại Pháp',
  description: 'Một sản phẩm tuyệt vời nằm trong bộ sưu tập mùa đông 2024',
  category: 'Đồ gia dụng',
  price: 1000,
  quantity: 10,
  colors: ['#ffff00', '#ff00ff', '#00ffff', 'gray'],
  images: ['https://picsum.photos/200/300', 'https://picsum.photos/250/350', 'https://picsum.photos/300/400']
}

const categories = ['Đồ gia dụng', 'Bộ sưu tập', 'Đồ gỗ cao cấp']

const EditProduct = () => {
  const [colors, setColors] = useState<string[]>(product.colors)
  const [images, setImages] = useState<File[]>([])
  const [editColors, setEditColors] = useState<boolean>(false)

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <h2 className='text-2xl font-semibold mb-7'>Edit Product</h2>
      <form className='bg-white p-7 shadow-md rounded-lg'>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Product Name</label>
          <Input type='text' defaultValue={product.name} className='mt-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Title</label>
          <Input type='text' defaultValue={product.title} className='mt-2' />
        </div>
        <div className='mb-2'>
          <label className='block text-gray-700 font-medium'>Description</label>
          <textarea defaultValue={product.description} className='mt-2 w-full p-2 border rounded-md text-sm' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Category</label>
          <select className='mt-2 border rounded-md p-2 w-full text-sm'>
            {categories.map((category, index) => (
              <option key={index} value={category} selected={category === product.category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Price</label>
          <Input type='number' defaultValue={product.price} className='mt-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Quantity</label>
          <Input type='number' defaultValue={product.quantity} className='mt-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Thumbnail Image</label>
          <img
            src={product.thumnail}
            alt='Thumbnail'
            className='w-[100px] h-[100px] object-cover rounded-md border mb-4'
          />
          <Button variant='outline' className='mt-2 space-x-2'>
            <Upload size={18} />
            <span>Update Image</span>
          </Button>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Colors</label>
          <div className='flex items-center mb-2'>
            {colors.map((color, index) => (
              <span
                key={index}
                style={{ backgroundColor: color }}
                className='inline-block w-6 h-6 rounded-full mr-2'
              ></span>
            ))}
            <Button variant='outline' onClick={() => setEditColors(!editColors)} className='ml-4'>
              <Edit size={18} />
            </Button>
          </div>
          {editColors && (
            <div>
              {colors.map((color, index) => (
                <Input key={index} type='text' value={color} placeholder={`Color ${index + 1}`} className='mt-2' />
              ))}
              {colors.length < 4 && (
                <Button variant='outline' className='mt-2'>
                  <Plus size={18} /> Add Color
                </Button>
              )}
            </div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Images</label>
          <div className='flex mt-4 space-x-4'>
            {product.images.map((image, index) => (
              <img key={index} src={image} alt='Product' className='w-[60px] h-[60px] object-cover rounded-md border' />
            ))}
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt='Product'
                className='w-[60px] h-[60px] object-cover rounded-md border'
              />
            ))}
          </div>
          <Button variant='outline' className='mt-4 space-x-2'>
            <Upload size={18} />
            <span>Update Images</span>
          </Button>
        </div>
        <Button type='submit' className='w-[200px] bg-green-600 text-white mt-4'>
          Save Changes
        </Button>
      </form>
    </div>
  )
}

export default EditProduct
