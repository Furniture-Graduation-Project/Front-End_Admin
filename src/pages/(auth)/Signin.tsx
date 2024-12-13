import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useEmployeeMutation from '@/hooks/mutations/useEmployeeMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự.' }),
  check: z.boolean().default(false).optional()
})

const Signin = () => {
  const { mutate } = useEmployeeMutation({ action: 'SIGN_IN' })
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
      check: false
    }
  })
  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    mutate({ username: data.username, password: data.password })
  }

  return (
    <div className='max-w-2xl w-full h-full sm:h-auto bg-white dark:bg-gray-800 px-14 py-[40px] sm:rounded-3xl container sm:mx-32'>
      <div className='text-center flex flex-col gap-y-4'>
        <h1 className='text-[32px] font-bold text-[#202224] dark:text-white'>Đăng nhập</h1>
        <p className='text-lg text-[#202224] opacity-80 dark:text-gray-400'>
          Vui lòng nhập tên đăng nhập và mật khẩu để tiếp tục
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10 mt-9'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg opacity-80 text-[#202224] dark:text-white'>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input
                    className='bg-[#F1F4F9] dark:bg-gray-700 h-14 dark:text-white'
                    placeholder='Tên đăng nhập...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between'>
                  <FormLabel className='text-lg opacity-80 text-[#202224] dark:text-white'>Mật khẩu</FormLabel>
                  <Link to={'/'} className='text-lg opacity-60 dark:text-gray-400'>
                    Quên mật khẩu?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type='password'
                    className='bg-[#F1F4F9] dark:bg-gray-700 h-14 dark:text-white'
                    placeholder='Mật khẩu...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='check'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    className='border-[#999999] data-[state=checked]:bg-white data-[state=checked]:text-neutral-500 dark:data-[state=checked]:bg-gray-600 dark:data-[state=checked]:text-white rounded-[4px]'
                    id='check'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor='check' className='text-xs opacity-60 dark:text-gray-400'>
                    Ghi nhớ mật khẩu
                  </label>
                </div>
              </FormItem>
            )}
          />
          <div className='flex items-center justify-center'>
            <Button
              variant={'outline'}
              className='w-[418px] py-7 text-xl font-bold opacity-90 dark:text-white'
              type='submit'
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className='flex flex-col sm:flex-row items-center justify-center mt-4 text-lg'>
        <p className='mr-1 opacity-65 dark:text-gray-400'>Chưa có tài khoản?</p>
        <Link className='text-[#5A8CFF] font-semibold underline dark:text-[#5A8CFF]' to={'/signup'}>
          Tạo tài khoản
        </Link>
      </div> */}
    </div>
  )
}

export default Signin
