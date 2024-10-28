import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlogService } from '@/services/blog'
import { useState } from 'react'
import { ICreateBlog } from '@/interface/blog'
import { toast } from '@/hooks/use-toast'

// Schema validation using zod
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

const BlogAdd = () => {
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (data: ICreateBlog) => {
    setLoading(true)
    try {
      await BlogService.create(data)
      form.reset()

      toast({
        title: 'Thêm thành công',
        description: `Blog "${data.title}" đã được thêm thành công.`,
        variant: 'default'
      })
    } catch (error) {
      toast({
        title: 'Lỗi thêm blog',
        description: 'Đã xảy ra lỗi khi thêm blog.',
        variant: 'destructive'
      })
      console.error('Lỗi khi tạo blog:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#F5F6FA] h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5'>Thêm Blog</div>
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
            {loading ? 'Đang xử lý...' : 'Thêm Blog'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BlogAdd
