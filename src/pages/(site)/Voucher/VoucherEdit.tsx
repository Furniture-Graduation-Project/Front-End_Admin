import { Button } from '@/components/ui/button'
import { useVoucherMutation } from '@/hooks/mutations/useVoucherMutation'
import { useVoucherQuery } from '@/hooks/querys/useVoucherQuery'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { format } from 'date-fns'

// Zod schema for validation
const voucherSchema = z.object({
  code: z.string().nonempty('Voucher code is required'),
  description: z.string().nonempty('Description is required'),
  type: z.enum(['Percent', 'Fixed']),
  value: z.number().min(1, 'Value must be greater than 0'),
  startDate: z.string().nonempty('Start date is required'),
  endDate: z.string().nonempty('End date is required'),
  usageLimit: z.number().min(1, 'Usage limit must be greater than 0'),
  status: z.enum(['active', 'inactive'])
})

type Voucher = z.infer<typeof voucherSchema>

const VoucherEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useVoucherQuery(id)
  const navigate = useNavigate()
  const { mutate } = useVoucherMutation('UPDATE')

  const form = useForm<Voucher>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      code: '',
      description: '',
      type: 'Percent',
      value: 0,
      startDate: '',
      endDate: '',
      usageLimit: 1,
      status: 'active'
    }
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(data.endDate), 'yyyy-MM-dd')
      })
    }
  }, [data, form])

  const onSubmit = (formData: Voucher) => {
    if (id) {
      mutate(
        { id, data: formData },
        {
          onSuccess: () => {
            toast.success('Voucher updated successfully')
            navigate('/voucher')
          },
          onError: () => {
            toast.error('Failed to update voucher')
          }
        }
      )
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading voucher</p>

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <div className='text-2xl font-semibold mb-7'>Edit Voucher</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 bg-white p-6 rounded-md shadow-lg'>
          <FormField
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Code</FormLabel>
                <FormControl>
                  <input type='text' {...field} className='border rounded-md w-full py-2 px-3 mt-2' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea {...field} className='border rounded-md w-full h-32 py-2 px-3 mt-2' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex space-x-4'>
            <FormField
              name='type'
              render={({ field }) => (
                <FormItem className='w-1/3'>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <select {...field} className='border rounded-md w-full py-2 px-3 mt-2'>
                      <option value='Percent'>Percent</option>
                      <option value='Fixed'>Fixed</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='value'
              render={({ field }) => (
                <FormItem className='w-1/3'>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <input type='number' {...field} className='border rounded-md w-full py-2 px-3 mt-2' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex space-x-4'>
            <FormField
              name='startDate'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <input type='date' {...field} className='border rounded-md w-full py-2 px-3 mt-2' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='endDate'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <input type='date' {...field} className='border rounded-md w-full py-2 px-3 mt-2' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex space-x-4'>
            <FormField
              name='usageLimit'
              render={({ field }) => (
                <FormItem className='w-1/3'>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <input type='number' {...field} className='border rounded-md w-full py-2 px-3 mt-2' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='status'
              render={({ field }) => (
                <FormItem className='w-2/3'>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select {...field} className='border rounded-md py-2 px-3 mt-2'>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' variant='default'>
            Update Voucher
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default VoucherEdit
