import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CategoryService } from '@/services/category'
import { ProductService } from '@/services/product'
import { useState, useEffect } from 'react'
import { IProduct } from '@/interface/product'
import { ICategory } from '@/interface/category'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { MaterialService } from '@/services/material'
import { IMaterial } from '@/interface/material'
import UploadImage from '@/components/ui/upload-image'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  SKU: z.string().min(1, { message: 'SKU không được để trống.' }),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ảnh sản phẩm.' }),
  material: z.string().min(1, { message: 'Vui lòng chọn chất liệu.' }),
  materialDetail: z.string().optional(),
  status: z.enum(['creating', 'available', 'out of stock', 'discontinued'])
})

const AddProductForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [materials, setMaterials] = useState<IMaterial[]>([])
  const navigate = useNavigate()

  const form = useForm<IProduct>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: { _id: '', categoryName: '', description: '' },
      description: '',
      SKU: '',
      images: [],
      material: { _id: '', materialName: '', description: '' },
      materialDetail: '',
      status: 'available'
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories()
        setCategories(res.data.data || [])
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }
    const fetchMaterials = async () => {
      try {
        const res = await MaterialService.getAllMaterials()
        setMaterials(res.data.data || [])
      } catch (error) {
        console.error('Lỗi khi lấy chất liệu:', error)
      }
    }
    fetchMaterials()
    fetchCategories()
  }, [])

  const handleSubmit = async (data: IProduct) => {
    try {
      await ProductService.create(data)
      toast({
        title: 'Thêm thành công',
        description: `Sản phẩm ${data.name} đã được thêm thành công.`,
        variant: 'success',
        duration: 3000
      })
      form.reset()
      navigate('/product')
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'SKU đã tồn tại.') {
        toast({
          title: 'Lỗi thêm sản phẩm',
          description: 'SKU đã tồn tại. Vui lòng nhập SKU khác.',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Lỗi thêm sản phẩm',
          description: 'Đã xảy ra lỗi khi thêm sản phẩm.',
          variant: 'destructive',
          duration: 3000
        })
      }
      console.error('Lỗi khi tạo sản phẩm:', error)
    }
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Thêm sản phẩm</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          {/* Tên sản phẩm */}
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='name' className='font-bold dark:text-gray-100'>
                  Tên sản phẩm
                </Label>
                <FormControl>
                  <Input
                    id='name'
                    placeholder='Tên sản phẩm'
                    {...field}
                    aria-required='true'
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='lg:flex lg:space-x-10 lg:items-center '>
            {/* Danh mục */}
            <FormField
              name='category'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='category' className='font-bold dark:text-gray-100'>
                    Danh mục -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='category'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                    >
                      <option value=''>Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* chất liệu */}
            <FormField
              name='material'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='material' className='font-bold dark:text-gray-100'>
                    Chất liệu -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='material'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                    >
                      <option value=''>Chọn chất liệu</option>
                      {materials.map((material) => (
                        <option key={material._id} value={material._id}>
                          {material.materialName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Trạng thái */}
            <FormField
              name='status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='status' className='font-bold dark:text-gray-100'>
                    Trạng thái -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='status'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                      disabled
                    >
                      <option value='creating'>Đang phát triển</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mô tả */}
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='description' className='font-bold dark:text-gray-100'>
                  Mô tả
                </Label>
                <FormControl>
                  <Input
                    id='description'
                    placeholder='Mô tả sản phẩm'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* SKU */}
          <FormField
            name='SKU'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='SKU' className='font-bold dark:text-gray-100'>
                  SKU
                </Label>
                <FormControl>
                  <Input
                    id='SKU'
                    placeholder='SKU sản phẩm'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hình ảnh */}
          {/* <FormField
            name='image'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='images' className='font-bold dark:text-gray-100'>
                  Hình ảnh
                </Label>
                <FormControl>
                  <Input
                    id='images'
                    placeholder='URL hình ảnh ( ngăn cách bằng dấu phẩy )'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                    onChange={(e) => field.onChange(e.target.value.split(','))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <UploadImage />
          {/* Chi tiết chất liệu */}
          <FormField
            name='materialDetail'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='materialDetail' className='font-bold dark:text-gray-100'>
                  Chi tiết chất liệu
                </Label>
                <FormControl>
                  <Input
                    id='materialDetail'
                    placeholder='Chi tiết chất liệu'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end mt-6 space-x-3 pb-8'>
            <Button type='submit'>Thêm sản phẩm</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
