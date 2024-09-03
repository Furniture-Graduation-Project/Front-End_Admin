import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Upload } from 'lucide-react'

const ProductAdd = () => {
  const [colors, setColors] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [additionalImages, setAdditionalImages] = useState<File[]>([])

  const categories = ['Đồ gia dụng', 'Bộ sưu tập', 'Đồ gỗ cao cấp']

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)])
    }
  }

  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAdditionalImages([...additionalImages, ...Array.from(event.target.files)])
    }
  }

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa] '>
      <h2 className='text-2xl font-semibold mb-7'>Add New Product</h2>
      <form className='bg-white p-7 shadow-md rounded-lg'>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Product Name</label>
          <Input type='text' placeholder='Enter product name' className='mt-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Title</label>
          <Input type='text' placeholder='Enter product title' className='mt-2' />
        </div>
        <div className='mb-2'>
          <label className='block text-gray-700 font-medium'>Description</label>
          <textarea placeholder='Enter product description' className='mt-2 w-full p-2 border rounded-md text-sm' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Category</label>
          <select className='mt-2 border rounded-md p-2 w-full text-sm'>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Price</label>
          <Input type='number' placeholder='Enter product price' className='mt-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Quantity</label>
          <Input type='number' placeholder='Enter product quantity' className='mt-2' />
        </div>
        <div className=''>
          <label className='block text-gray-700 font-medium'>Thumbnail Image</label>
          <Button
            variant='outline'
            className='mt-2 space-x-2'
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </Button>
          <input id='image-upload' type='file' accept='image/*' className='hidden' onChange={handleImageUpload} />
          <div className='flex mt-4 space-x-4'>
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt='Product'
                className='w-[60px] h-[60px] object-cover rounded-md border'
              />
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Colors</label>
          {colors.map((color, index) => (
            <Input key={index} type='text' value={color} placeholder={`Color ${index + 1}`} className='mt-2' />
          ))}
          {colors.length < 4 && (
            <Button variant='outline' className='mt-2 space-x-2'>
              <Plus size={18} />
              <span>Add Color</span>
            </Button>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Images</label>
          <Button
            variant='outline'
            className='mt-2 space-x-2'
            onClick={() => document.getElementById('additional-images-upload')?.click()}
          >
            <Upload size={18} />
            <span>Upload Images</span>
          </Button>
          <input
            id='additional-images-upload'
            type='file'
            accept='image/*'
            multiple
            className='hidden'
            onChange={handleAdditionalImageUpload}
          />
          <div className='flex mt-4 space-x-4'>
            {additionalImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt='Product'
                className='w-[60px] h-[60px] object-cover rounded-md border'
              />
            ))}
          </div>
        </div>
        <Button type='submit' className='w-[200px] bg-blue-600 text-white mt-4'>
          Add Product
        </Button>
      </form>
    </div>
  )
}

export default ProductAdd
