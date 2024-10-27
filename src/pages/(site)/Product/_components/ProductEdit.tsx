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
import { useNavigate, useParams } from 'react-router-dom'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  price: z.number().min(0, { message: 'Giá phải là số lớn hơn hoặc bằng 0.' }),
  SKU: z.string().min(1, { message: 'SKU không được để trống.' }),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ảnh sản phẩm.' }),
  material: z.string().optional(),
  status: z.enum(['available', 'out of stock', 'discontinued'], {
    required_error: 'Vui lòng chọn trạng thái sản phẩm.'
  })
})

const EditProductForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [product, setProduct] = useState<IProduct | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const form = useForm<IProduct>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: { _id: '', categoryName: '', description: '' },
      description: '',
      price: 0,
      SKU: '',
      images: [],
      material: '',
      status: 'available'
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories()
        setCategories(res.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }

    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await ProductService.getById(id)
          setProduct(res.data.data)
          form.reset(res.data.data)
        } catch (error) {
          console.error('Lỗi khi lấy sản phẩm:', error)
        }
      }
    }

    fetchCategories()
    fetchProduct()
  }, [id, form])

  const handleSubmit = async (data: IProduct) => {
    try {
      await ProductService.update(id, data)
      toast({
        title: 'Cập nhật thành công',
        description: `Sản phẩm ${data.name} đã được cập nhật thành công.`,
        variant: 'success',
        duration: 3000
      })
      navigate('/product')
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'SKU đã tồn tại.') {
        toast({
          title: 'Lỗi cập nhật sản phẩm',
          description: 'SKU đã tồn tại. Vui lòng nhập SKU khác.',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Lỗi cập nhật sản phẩm',
          description: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
          variant: 'destructive',
          duration: 3000
        })
      }
      console.error('Lỗi khi cập nhật sản phẩm:', error)
    } finally {
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Cập nhật sản phẩm</div>
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
          {/* Danh mục */}
          <FormField
            name='category'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='category' className='font-bold dark:text-gray-100'>
                  Danh mục
                </Label>
                <FormControl className='ml-2 rounded-sm'>
                  <select
                    id='category'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1'
                    value={field.value || product.category._id}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  >
                    {categories
                      .map((category) => (
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

          {/* Giá */}
          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='price' className='font-bold dark:text-gray-100'>
                  Giá
                </Label>
                <FormControl>
                  <Input
                    id='price'
                    type='number'
                    placeholder='Giá sản phẩm'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-required='true'
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
          <FormField
            name='images'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='images' className='font-bold dark:text-gray-100'>
                  Hình ảnh
                </Label>
                <FormControl>
                  <Input
                    id='images'
                    placeholder='URL hình ảnh (ngăn cách bằng dấu phẩy)'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                    onChange={(e) => field.onChange(e.target.value.split(','))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vật liệu */}
          <FormField
            name='material'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='material' className='font-bold dark:text-gray-100'>
                  Vật liệu
                </Label>
                <FormControl>
                  <Input
                    id='material'
                    placeholder='Vật liệu sản phẩm'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
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
                  Trạng thái
                </Label>
                <FormControl className='ml-2 rounded-sm'>
                  <select id='status' {...field} className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1'>
                    <option value='available'>Còn hàng</option>
                    <option value='out of stock'>Hết hàng</option>
                    <option value='discontinued'>Ngừng sản xuất</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end mt-6 space-x-3'>
            <Button type='button' variant='outline' onClick={() => navigate('/product')}>
              Hủy
            </Button>
            <Button type='submit'>Cập nhật sản phẩm</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditProductForm
