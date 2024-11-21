import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IBlog, ICreateBlog } from '@/interface/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BlogService } from '@/services/blog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  employeeId: z.string().min(1, { message: 'Người viết không được để trống.' }),
  title: z.string().min(1, { message: 'Tiêu đề không được để trống.' }),
  content: z.string().min(1, { message: 'Nội dung không được để trống.' }),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map((tag) => tag.trim()) : [])),
  image: z.string().optional()
})

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const form = useForm<ICreateBlog>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employeeId: '',
      title: '',
      content: '',
      tags: [],
      image: ''
    }
  })

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        console.error('ID không tồn tại')
        return
      }

      try {
        const response = await BlogService.getById(id)
        const blogData = response.data.data
        setBlog(blogData)
        form.reset({
          employeeId: blogData.employeeId._id,
          title: blogData.title,
          content: blogData.content,
          tags: blogData.tags,
          image: blogData.image
        })
      } catch (error) {
        console.error('Lỗi khi lấy thông tin blog:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin blog.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, form])

  const handleSubmit = async (data: ICreateBlog) => {
    setLoading(true)
    try {
      await BlogService.update(id!, data)
      toast({
        title: 'Cập nhật thành công',
        description: `Blog "${data.title}" đã được cập nhật thành công.`,
        variant: 'default'
      })
      navigate('/blog')
    } catch (error) {
      console.error('Lỗi khi cập nhật blog:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật blog.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  if (!blog) {
    return <div>Không tìm thấy blog với ID đã cho.</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 min-h-screen'>
      <div className='p-4 md:p-10'>
        <h1 className='text-2xl font-bold mb-6 dark:text-white'>Chỉnh sửa Blog</h1>
        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              <FormField
                name='title'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Tiêu đề</Label>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề blog' {...field} className='dark:bg-gray-700 dark:text-white' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='content'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='content' className='font-bold'>
                      Nội dung
                    </Label>
                    <FormControl>
                      <Input
                        id='content'
                        placeholder='Nội dung'
                        {...field}
                        className='dark:bg-gray-700 dark:text-white'
                        aria-required='true'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='tags'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Tags</Label>
                    <FormControl>
                      <Input
                        placeholder='Nhập tags (phân cách bằng dấu phẩy)'
                        {...field}
                        className='dark:bg-gray-700 dark:text-white'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='image'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Hình ảnh URL</Label>
                    <FormControl>
                      <Input placeholder='Nhập URL hình ảnh' {...field} className='dark:bg-gray-700 dark:text-white' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end space-x-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate('/blog')}
                  className='dark:bg-gray-700 dark:text-white'
                >
                  Hủy
                </Button>
                <Button type='submit' disabled={loading} className=''>
                  {loading ? 'Đang cập nhật...' : 'Cập nhật Blog'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BlogEdit
