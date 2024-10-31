import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: 'Old password must be at least 6 characters long'
    }),
    newPassword: z.string().min(6, {
      message: 'New password must be at least 6 characters long'
    }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters long'
    })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  })

const SettingPassword = () => {
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handlePasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    console.log('Password Update:', data)
  }
  return (
    <Form {...passwordForm}>
      <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className='space-y-6 flex flex-col px-40'>
        <h2 className='text-xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100'>Cập nhật mật khẩu</h2>
        <FormField
          control={passwordForm.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Mật khẩu cũ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Mật khẩu mới...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Xác nhận mật khẩu mới...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-center'>
          <Button className='w-full md:w-1/2 py-3 text-base font-semibold' type='submit'>
            Cập nhật
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingPassword
