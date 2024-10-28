import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IBlog } from '@/interface/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BlogService } from '@/services/blog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

const FormSchema = z.object({
  employeeId: z.string().min(1, { message: 'Người viết không được để trống.' }),
  title: z.string().min(1, { message: 'Tiêu đề không được để trống.' }),
  content: z.string().min(1, { message: 'Nội dung không được để trống.' }),
  // tags: z
  //   .string()
  //   .optional()
  //   .transform((val) => (val ? val.split(',').map((tag) => tag.trim()) : [])),
  image: z.string().optional()
})

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [loading, setLoading] = useState(true)

  const form = useForm<IBlog>({
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
        setBlog(response.data.data)
        form.reset(response.data.data)
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

  const handleSubmit = async (data: IBlog) => {
    setLoading(true)
    try {
      await BlogService.update(id!, data)
      toast({
        title: 'Cập nhật thành công',
        description: `Blog "${data.title}" đã được cập nhật thành công.`,
        variant: 'default'
      })
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
    <div className='bg-[#F5F6FA] h-screen'>
      <h1 className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5'>Chỉnh sửa Blog</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='employeeId'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='employeeId' className='font-bold'>
                  Người viết
                </Label>
                <FormControl>
                  <Input id='employeeId' placeholder='Người viết' {...field} aria-required='true' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='title' className='font-bold'>
                  Tiêu đề
                </Label>
                <FormControl>
                  <Input id='title' placeholder='Tiêu đề' {...field} aria-required='true' />
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
                  <Input id='content' placeholder='Nội dung' {...field} aria-required='true' />
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
                <Label htmlFor='tags' className='font-bold'>
                  Tags (cách nhau bằng dấu phẩy)
                </Label>
                <FormControl>
                  <Input id='tags' placeholder='Tags' {...field} />
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
                <Label htmlFor='image' className='font-bold'>
                  Hình ảnh (URL)
                </Label>
                <FormControl>
                  <Input id='image' placeholder='URL hình ảnh' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' variant='default' disabled={loading} className='bg-blue-600 hover:bg-blue-400'>
            {loading ? 'Đang xử lý...' : 'Cập nhật Blog'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BlogEdit
