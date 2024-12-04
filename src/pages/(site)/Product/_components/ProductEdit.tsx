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
import { ProductFormData } from '@/interface/product'
import { ICategory } from '@/interface/category'
import { toast } from '@/hooks/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { IMaterial } from '@/interface/material'
import { MaterialService } from '@/services/material'
import AddVariants from './Variants'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ảnh sản phẩm.' }),
  material: z.string().optional(),
  status: z.enum(['creating', 'available', 'disable'], {
    required_error: 'Vui lòng chọn trạng thái sản phẩm.'
  })
})

const EditProductForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [materials, setMaterials] = useState<IMaterial[]>([])
  const [product, setProduct] = useState<ProductFormData | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const form = useForm<ProductFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      images: [],
      material: '',
      materialDetail: '',
      status: 'creating'
    }
  })
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories()
        setCategories(res.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }
    const fetchMaterials = async () => {
      try {
        const res = await MaterialService.getAllMaterials()
        setMaterials(res.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await ProductService.getById(id)
          setProduct(res.data.data as any)
          form.reset(res.data.data as any)
        } catch (error) {
          console.error('Lỗi khi lấy sản phẩm:', error)
        }
      }
    }
    fetchMaterials()
    fetchCategories()
    fetchProduct()
  }, [id, form])

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (id) {
        await ProductService.update(id, data)
        toast({
          title: 'Cập nhật thành công',
          description: `Sản phẩm ${data.name} đã được cập nhật thành công.`,
          variant: 'success',
          duration: 3000
        })
        navigate('/product')
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi cập nhật sản phẩm',
        description: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi cập nhật sản phẩm:', error)
    } finally {
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-[#F5F6FA] p-5 rounded-md '>
      <div className='bg-[#ffffff] dark:bg-gray-900 rounded-md '>
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
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
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
                      >
                        <option value='creating'>Đang tạo</option>
                        <option value='available'>Còn hàng</option>
                        <option value='disable'>Khóa</option>
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
              <Button type='submit'>Cập nhật sản phẩm</Button>
            </div>
          </form>
        </Form>
      </div>
      {id && <AddVariants productId={id} />}
    </div>
  )
}

export default EditProductForm
