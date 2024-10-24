import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EmployeeService } from '@/services/employee'
import { useState } from 'react'
import { ICreateEmployee } from '@/interface/employee'
import { toast } from '@/hooks/use-toast'

const FormSchema = z.object({
  fullName: z.string().min(1, { message: 'Tên đầy đủ không được để trống.' }),
  username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự.' }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(['product', 'support', 'order'])
})

const AddEmployeeForm = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<ICreateEmployee>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      phoneNumber: '',
      address: '',
      role: 'support'
    }
  })

  const handleSubmit = async (data: ICreateEmployee) => {
    setLoading(true)
    try {
      await EmployeeService.create(data)
      form.reset()

      toast({
        title: 'Thêm thành công',
        description: `Nhân viên ${data.fullName} đã được thêm thành công.`,
        variant: 'default'
      })
    } catch (error) {
      toast({
        title: 'Lỗi thêm nhân viên',
        description: 'Đã xảy ra lỗi khi thêm nhân viên.',
        variant: 'destructive'
      })
      console.error('Lỗi khi tạo nhân viên:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#F5F6FA] h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5'>Thêm tài khoản nhân viên</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='fullName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='fullName' className='font-bold'>
                  Tên đầy đủ
                </Label>
                <FormControl>
                  <Input id='fullName' placeholder='Tên đầy đủ' {...field} aria-required='true' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='username'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='username' className='font-bold'>
                  Tên đăng nhập
                </Label>
                <FormControl>
                  <Input id='username' placeholder='Tên đăng nhập' {...field} aria-required='true' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='password' className='font-bold'>
                  Mật khẩu
                </Label>
                <FormControl>
                  <Input type='password' id='password' placeholder='Mật khẩu' {...field} aria-required='true' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='phoneNumber'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='phoneNumber' className='font-bold'>
                  Số điện thoại
                </Label>
                <FormControl>
                  <Input id='phoneNumber' placeholder='Số điện thoại' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='address'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='address' className='font-bold'>
                  Địa chỉ
                </Label>
                <FormControl>
                  <Input id='address' placeholder='Địa chỉ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='role'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='role' className='font-bold mr-5'>
                  Vai trò
                </Label>
                <FormControl>
                  <select id='role' {...field} className='border p-2'>
                    <option value='product'>Product</option>
                    <option value='support'>Support</option>
                    <option value='order'>Order</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' variant='default' disabled={loading} className='bg-blue-600 hover:bg-blue-400'>
            {loading ? 'Đang xử lý...' : 'Thêm nhân viên'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddEmployeeForm
