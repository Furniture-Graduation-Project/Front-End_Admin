import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CategoryService } from '@/services/category'
import { useState } from 'react'
import { ICategory } from '@/interface/category'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'

const FormSchema = z.object({
  categoryName: z.string().min(1, { message: 'Tên danh mục không được để trống.' }),
  description: z.string().optional(),
})

const AddCategoryForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const form = useForm<ICategory>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: '',
      description: '',
    },
  })

  const handleSubmit = async (data: ICategory) => {
    setLoading(true)
    try {
      await CategoryService.create(data)
      toast({
        title: 'Thêm thành công',
        description: `Danh mục ${data.categoryName} đã được thêm thành công.`,
        variant: 'success',
        duration: 3000,
      })
      form.reset()
      navigate('/category'); // Chuyển hướng về danh sách danh mục sau khi thêm thành công
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'Lỗi trùng tên danh mục',
          description: `Danh mục "${data.categoryName}" đã tồn tại.`,
          variant: 'destructive',
          duration: 3000,
        })
      } else {
        toast({
          title: 'Lỗi thêm danh mục',
          description: 'Đã xảy ra lỗi khi thêm danh mục.',
          variant: 'destructive',
          duration: 3000,
        })
      }
      console.error('Lỗi khi tạo danh mục:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>
          Thêm danh mục
        </div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='categoryName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='categoryName' className='font-bold dark:text-gray-100'>
                  Tên danh mục
                </Label>
                <FormControl>
                  <Input
                    id='categoryName'
                    placeholder='Tên danh mục'
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
                    placeholder='Mô tả danh mục'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-2'>
            <Button
              type='submit'
              variant='default'
              disabled={loading}
              className='bg-blue-600 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400'
            >
              {loading ? 'Đang xử lý...' : 'Thêm danh mục'}
            </Button>
            <Button
              type='button'
              variant='default'
              onClick={() => navigate('/category')} // Chuyển hướng về danh sách danh mục
              className='bg-gray-300 hover:bg-gray-400 text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            >
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddCategoryForm
