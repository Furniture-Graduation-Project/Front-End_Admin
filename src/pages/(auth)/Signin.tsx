import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link, useNavigate } from 'react-router-dom'
import { EmployeeService } from '@/services/employee'
import { toast } from '@/hooks/use-toast'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự.' }),
  check: z.boolean().default(false).optional()
})

const Signin = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
      check: false
    }
  })

  const navigate = useNavigate()

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true)
    try {
      const { check, ...credentials } = data
      const response = await EmployeeService.signIn(credentials.username, credentials.password)

      // localStorage.setItem('authToken', response.data.token)

      toast({
        title: 'Đăng nhập thành công',
        description: `Chào mừng ${response.data.data.fullName}!`,
        variant: 'default'
      })

      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Lỗi đăng nhập',
        description: 'Tên đăng nhập hoặc mật khẩu không đúng.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='max-w-2xl w-full h-full sm:h-auto bg-white px-14 py-[40px] sm:rounded-3xl container sm:mx-32'>
        <div className='text-center flex flex-col gap-y-4'>
          <h1 className='text-[32px] font-bold text-[#202224]'>Đăng nhập</h1>
          <p className='text-lg text-[#202224] opacity-80'>Vui lòng nhập tên đăng nhập và mật khẩu để tiếp tục</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10 mt-9'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg opacity-80 text-[#202224]'>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input className='bg-[#F1F4F9] h-14' placeholder='Tên đăng nhập...' {...field} />
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
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Mật khẩu</FormLabel>
                    <Link to={'/'} className='text-lg opacity-60'>
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type='password' className='bg-[#F1F4F9] h-14' placeholder='Mật khẩu...' {...field} />
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
                      className='border-[#999999] data-[state=checked]:bg-white data-[state=checked]:text-neutral-500 rounded-[4px]'
                      id='check'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor='check' className='text-xs opacity-60'>
                      Ghi nhớ mật khẩu
                    </label>
                  </div>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-center'>
              <Button
                variant={'outline'}
                className='w-[418px] py-7 text-xl font-bold opacity-90'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
            </div>
          </form>
        </Form>
        <div className='flex flex-col sm:flex-row items-center justify-center mt-4 text-lg'>
          <p className='mr-1 opacity-65'>Chưa có tài khoản?</p>
          <Link className='text-[#5A8CFF] font-semibold underline' to={'/signup'}>
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signin
