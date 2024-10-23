import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IEmployee } from '@/interface/employee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EmployeeService } from '@/services/employee'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

const FormSchema = z.object({
  fullName: z.string().min(1, { message: 'Tên đầy đủ không được để trống.' }),
  username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự.' }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(['product', 'support', 'order'])
})

const EmployeeEdit = () => {
  const { id } = useParams<{ id: string }>()
  const [employee, setEmployee] = useState<IEmployee | null>(null)
  const [loading, setLoading] = useState(true)

  const form = useForm<IEmployee>({
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

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        console.error('ID không tồn tại')
        return
      }

      try {
        const response = await EmployeeService.getById(id)
        setEmployee(response.data.data)
        form.reset(response.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy thông tin nhân viên:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin nhân viên.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id, form])

  const handleSubmit = async (data: IEmployee) => {
    setLoading(true)
    try {
      await EmployeeService.update(id!, data)
      toast({
        title: 'Cập nhật thành công',
        description: `Nhân viên ${data.fullName} đã được cập nhật thành công.`,
        variant: 'default'
      })
    } catch (error) {
      console.error('Lỗi khi cập nhật nhân viên:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật nhân viên.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  if (!employee) {
    return <div>Không tìm thấy nhân viên với ID đã cho.</div>
  }

  return (
    <div className='bg-[#F5F6FA] h-screen'>
      <h1 className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5'>Chỉnh sửa thông tin nhân viên</h1>
      <Form {...form}>
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
                  <Input id='fullName' placeholder='Tên đầy đủ' {...field} disabled />
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
                  <Input id='username' placeholder='Tên đăng nhập' {...field} disabled />
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
                  <Input type='password' id='password' placeholder='Mật khẩu' {...field} disabled />
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
                  <Input id='phoneNumber' placeholder='Số điện thoại' {...field} disabled />
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
                  <Input id='address' placeholder='Địa chỉ' {...field} disabled />
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
            {loading ? 'Đang xử lý...' : 'Cập nhật nhân viên'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EmployeeEdit
