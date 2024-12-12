import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { IBlog, ICreateBlog } from '@/interface/blog'
import { BlogService } from '@/services/blog'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const FormSchema = z.object({
  employeeId: z.string().min(1, { message: 'Người viết không được để trống.' }),
  title: z.string().min(1, { message: 'Tiêu đề không được để trống.' }),
  content: z.string().min(1, { message: 'Nội dung không được để trống.' }),
  tags: z.array(z.string()).optional(),
  image: z.string().optional()
})

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>()
  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>('')
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [tag, setTag] = useState('')
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
          tags: blogData.tags || [],
          image: blogData.image
        })
      } catch (error) {
        console.error('Lỗi khi lấy thông tin blog:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin blog.',
          variant: 'destructive'
        })
      }
    }

    fetchBlog()
  }, [id])

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setImageLoading(true)
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setImage(urls[0])
    setPreview(URL.createObjectURL(files[0]))
    setImageLoading(false)
  }

  const onSubmit = async (data: ICreateBlog) => {
    const finalImage = image ? image : blog?.image

    try {
      await BlogService.update(id!, { ...data, image: finalImage })
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
    }
  }

  const isLoading = form.formState.isSubmitting

  if (!blog) {
    return <div>Không tìm thấy blog với ID đã cho.</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 min-h-screen'>
      <div className='p-4 md:p-10'>
        <h1 className='text-2xl font-bold mb-6 dark:text-white'>Chỉnh sửa bài viết</h1>
        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                name='employeeId'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className='font-bold dark:text-white'>Người viết</Label>
                    <FormControl>
                      <Input
                        {...field}
                        value={blog.employeeId._id}
                        className='bg-gray-100 dark:bg-gray-700 dark:text-gray-400 hidden'
                      />
                    </FormControl>
                    <Input
                      disabled
                      value={blog.employeeId.fullName}
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
                      <Input
                        disabled={isLoading}
                        placeholder='Nhập tiêu đề bài viết'
                        {...field}
                        className='dark:bg-gray-700 dark:text-white'
                      />
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
                      <Textarea
                        disabled={isLoading}
                        id='content'
                        placeholder='Nội dung'
                        {...field}
                        className='dark:bg-gray-700 dark:text-white'
                        aria-required='true'
                        rows={10}
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
                    <Label className='font-bold dark:text-white'>Nhãn</Label>
                    <FormControl>
                      <div className='space-y-2'>
                        {field.value && field.value.length > 0 ? (
                          <div className='flex flex-wrap gap-2'>
                            {field.value.map((tag, index) => (
                              <div key={index} className='flex items-center gap-2'>
                                <span className='text-sm'>{tag}</span>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const updatedTags = field.value && field.value.filter((_, i) => i !== index)
                                    field.onChange(updatedTags)
                                  }}
                                  className='text-red-500'
                                >
                                  Xóa
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className='text-sm text-gray-400'>Chưa có nhãn</p>
                        )}

                        <Input
                          disabled={isLoading}
                          placeholder='Nhập thêm nhãn (Kết thúc tag bằng dấu phẩy để lưu)'
                          value={tag}
                          onChange={(e) => {
                            const inputValue = e.target.value
                            setTag(inputValue)
                            if (inputValue.includes(',') && field.value) {
                              const tagsArray = inputValue
                                .split(',')
                                .map((tag) => tag.trim())
                                .filter((tag) => tag !== '')
                              const uniqueTags = Array.from(new Set([...field.value, ...tagsArray]))
                              field.onChange(uniqueTags)
                              setTag('')
                            }
                          }}
                          onBlur={(e) => {
                            const inputValue = e.target.value
                            setTag(inputValue)
                            if (inputValue && inputValue.trim() !== '' && field.value) {
                              const tagsArray = inputValue
                                .split(',')
                                .map((tag) => tag.trim())
                                .filter((tag) => tag !== '')
                              const uniqueTags = Array.from(new Set([...field.value, ...tagsArray]))
                              field.onChange(uniqueTags)
                              setTag('')
                            }
                          }}
                          className='dark:bg-gray-700 dark:text-white'
                        />
                      </div>
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
                    ) : preview ? (
                      <div className='mt-2'>
                        <img src={preview} alt='preview' className='w-full h-80 object-cover rounded-lg' />
                      </div>
                    ) : (
                      blog?.image && (
                        <div className='mt-2'>
                          <img src={blog.image} alt='preview' className='w-full h-80 object-cover rounded-lg' />
                        </div>
                      )
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end space-x-4'>
                <Button disabled={isLoading || imageLoading} type='submit'>
                  Cập nhật
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
