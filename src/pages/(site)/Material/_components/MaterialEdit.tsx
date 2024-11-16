import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IMaterial } from '@/interface/material' // Thay đổi import từ ICategory thành IMaterial
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MaterialService } from '@/services/material' // Thay đổi từ CategoryService thành MaterialService
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

const FormSchema = z.object({
  materialName: z.string().min(1, { message: 'Tên vật liệu không được để trống.' }),
  description: z.string().optional()
})

const MaterialEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [material, setMaterial] = useState<IMaterial | null>(null)
  const [loading, setLoading] = useState(true)

  const form = useForm<IMaterial>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      materialName: '',
      description: ''
    }
  })

  useEffect(() => {
    const fetchMaterial = async () => {
      if (!id) {
        console.error('ID không tồn tại')
        return
      }

      try {
        const response = await MaterialService.getMaterialById(id)
        console.log(response)
        setMaterial(response.metarial)
        form.reset(response.metarial)
      } catch (error) {
        console.error('Lỗi khi lấy thông tin vật liệu:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin vật liệu.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMaterial()
  }, [id, form])

  const handleSubmit = async (data: IMaterial) => {
    setLoading(true)
    try {
      await MaterialService.updateMaterialById(id!, data) // Cập nhật thành gọi đến MaterialService
      toast({
        title: 'Cập nhật thành công',
        description: `Vật liệu ${data.materialName} đã được cập nhật thành công.`,
        variant: 'success'
      })
      navigate('/material')
    } catch (error) {
      console.error('Lỗi khi cập nhật vật liệu:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật vật liệu.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <h1 className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Cập nhật vật liệu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='materialName' // Thay đổi từ categoryName thành materialName
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='materialName' className='font-bold dark:text-gray-100'>
                  Tên vật liệu
                </Label>
                <FormControl>
                  <Input
                    id='materialName' // Thay đổi id từ categoryName thành materialName
                    placeholder='Tên vật liệu'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='description' className='font-bold dark:text-gray-100'>
                  Mô tả
                </Label>
                <FormControl>
                  <Input
                    id='description'
                    placeholder='Mô tả'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end mt-6 space-x-3'>
            <Button type='button' variant='outline' onClick={() => navigate('/material')}>
              Hủy
            </Button>
            <Button type='submit'>Cập nhật</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default MaterialEdit
