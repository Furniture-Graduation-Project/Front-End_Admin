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
  status: z.string().min(1, { message: 'Vui lòng chọn trạng thái.' })
})

const EditProductForm = () => {
  const { productId } = useParams<{ productId: string }>()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const navigate = useNavigate()

  const form = useForm<IProduct>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      price: 0,
      SKU: '',
      images: [],
      material: '',
      status: ''
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
      if (!productId) return
      try {
        const res = await ProductService.getProductById(productId)
        const productData = res.data

        // Reset form values with fetched product data
        form.reset({
          name: productData.name,
          category: productData.category,
          description: productData.description,
          price: productData.price,
          SKU: productData.SKU,
          images: productData.images,
          material: productData.material,
          status: productData.status
        })
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể tải thông tin sản phẩm',
          variant: 'destructive',
          duration: 3000
        })
      }
    }

    fetchCategories()
    fetchProduct()
  }, [productId, form])

  const handleSubmit = async (data: IProduct) => {
    setLoading(true)
    try {
      if (!productId) return
      await ProductService.update(productId, data)
      toast({
        title: 'Cập nhật thành công',
        description: `Sản phẩm ${data.name} đã được cập nhật thành công.`,
        variant: 'success',
        duration: 3000
      })
      navigate('/product')
    } catch (error) {
      toast({
        title: 'Lỗi cập nhật sản phẩm',
        description: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi cập nhật sản phẩm:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Chỉnh sửa sản phẩm</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
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

          <FormField
            name='category'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='category' className='font-bold dark:text-gray-100'>
                  Danh mục
                </Label>
                <FormControl>
                  <select id='category' {...field} className='dark:bg-gray-700 dark:text-gray-100'>
                    <option value='' disabled>
                      Chọn danh mục
                    </option>
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

          <FormField
            name='material'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='material' className='font-bold dark:text-gray-100'>
                  Chất liệu
                </Label>
                <FormControl>
                  <Input
                    id='material'
                    placeholder='Chất liệu sản phẩm'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='status'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='status' className='font-bold dark:text-gray-100'>
                  Trạng thái
                </Label>
                <FormControl>
                  <select id='status' {...field} className='dark:bg-gray-700 dark:text-gray-100'>
                    <option value='' disabled>
                      Chọn trạng thái
                    </option>
                    <option value='available'>Có sẵn</option>
                    <option value='out_of_stock'>Hết hàng</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder='Nhập URL hình ảnh (cách nhau bằng dấu phẩy)'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-4' disabled={loading}>
            {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EditProductForm
