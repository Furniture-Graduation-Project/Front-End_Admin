import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import { toast } from '@/hooks/use-toast'
import { ICreateBlog } from '@/interface/blog'
import { BlogService } from '@/services/blog'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const FormSchema = z.object({
  employeeId: z.string(),
  title: z.string().min(1, { message: 'Tiêu đề không được để trống.' }),
  content: z.string().min(1, { message: 'Nội dung không được để trống.' }),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map((tag) => tag.trim()) : [])),
  image: z.string().optional()
})

const BlogAdd = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>('')
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const form = useForm<ICreateBlog>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employeeId: user?._id,
      title: '',
      content: '',
      tags: [],
      image: ''
    }
  })

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setImageLoading(true)
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setImage(urls[0])
    setPreview(URL.createObjectURL(files[0]))
    setImageLoading(false)
  }

  const handleSubmit = async (data: ICreateBlog) => {
    setLoading(true)
    try {
      await BlogService.create({ ...data, image: image || '' })
      form.reset({
        ...form.getValues(),
        employeeId: user?._id,
        content: '',
        tags: [],
        image: ''
      })

      toast({
        title: 'Thêm thành công',
        description: `Blog "${data.title}" đã được thêm thành công.`,
        variant: 'default'
      })

      navigate('/blog')
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
    <div className='bg-[#F5F6FA] dark:bg-gray-900 min-h-screen'>
      <div className='p-4 md:p-10'>
        <h1 className='text-2xl font-bold mb-6 dark:text-white'>Thêm Blog</h1>
        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              <FormField
                name='employeeId'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Người viết</Label>
                    <FormControl>
                      <Input
                        {...field}
                        value={user?._id}
                        className='bg-gray-100 dark:bg-gray-700 dark:text-gray-400 hidden'
                      />
                    </FormControl>
                    <Input
                      value={user?.fullName}
                      disabled
                      className='bg-gray-100 dark:bg-gray-700 dark:text-gray-400 '
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className='dark:bg-gray-700 dark:text-white'
                        {...field}
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
                render={() => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Hình ảnh</Label>
                    <FormControl>
                      <Input
                        disabled={imageLoading}
                        type='file'
                        className='dark:bg-gray-700 dark:text-gray-100'
                        onChange={onChangeImage}
                      />
                    </FormControl>
                    {imageLoading ? (
                      <Skeleton className='w-full h-80 rounded-lg mt-2' />
                    ) : (
                      preview && (
                        <div className='mt-2'>
                          <img src={preview} alt='preview' className='w-full h-80 object-cover rounded-lg' />
                        </div>
                      )
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={loading} className='w-full'>
                {loading ? 'Đang xử lý...' : 'Thêm Blog'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BlogAdd
