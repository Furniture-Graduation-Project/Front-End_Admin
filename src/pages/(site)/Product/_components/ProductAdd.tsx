import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductService } from '@/services/product'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { ProductFormData } from '@/interface/product'
import { useMultipleMaterialQuery } from '@/hooks/querys/useMaterialQuery'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  SKU: z.string().min(1, { message: 'SKU không được để trống.' }),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ảnh sản phẩm.' }),
  material: z.string().optional(),
  materialDetail: z.string().optional(),
  status: z.enum(['available', 'out of stock', 'discontinued'], {
    required_error: 'Vui lòng chọn trạng thái sản phẩm.'
  })
})

const AddProductForm = () => {
  const navigate = useNavigate()
  const { data: categoriesResponse } = useMultipleCategoryQuery()
  const { data: materialsResponse } = useMultipleMaterialQuery()
  const categories = categoriesResponse || []
  const materials = materialsResponse || []
  const form = useForm<ProductFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      SKU: '',
      images: [],
      material: '',
      materialDetail: '',
      status: 'available'
    }
  })

  const handleSubmit = async (data: ProductFormData) => {
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
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      if (errorMessage === 'SKU đã tồn tại.') {
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
                  >
                    {categories?.map((category) => (
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
                  Danh mục
                </Label>
                <FormControl className='ml-2 rounded-sm'>
                  <select
                    id='material'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1'
                  >
                    {materials?.map((material) => (
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
          {/* Chi tiết vật liệu */}
          <FormField
            name='materialDetail'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='materialDetail' className='font-bold dark:text-gray-100'>
                  Chi tiết vật liệu
                </Label>
                <FormControl>
                  <Input
                    id='materialDetail'
                    placeholder='Chi tiết vật liệu'
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
          <div className='flex justify-end mt-6 space-x-3 pb-8'>
            <Button type='button' variant='outline' onClick={() => navigate('/product')}>
              Hủy
            </Button>
            <Button type='submit'>Thêm mới</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
