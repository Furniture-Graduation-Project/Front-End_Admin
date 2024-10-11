import { Button } from '@/components/ui/button'
import { CornerDownLeft, PackageSearch, TicketPercent } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useConversationMutation } from '@/hooks/mutations/useConversationMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  message: z.string().min(1, {
    message: 'Không được để trống trường này.'
  })
})

const MessageTextingForm = ({ idUser }: { idUser?: string }) => {
  const { mutate } = useConversationMutation('UPDATE_BY_USER')

  const [messageType, setMessageType] = useState<'text' | 'product' | 'voucher'>('text')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: ''
    }
  })

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    const dataMessage = {
      userId: idUser,
      content: data.message,
      sender: {
        senderType: import.meta.env.VITE_SENDER_TYPE,
        senderId: '6708cb289485043264149fab',
        name: 'John Doe'
      },
      status: 'sent',
      type: messageType
    }
    if (idUser) {
      mutate({ id: idUser, data: dataMessage })
      form.reset()
    }
  }

  const handleSendProduct = () => {
    setMessageType('product')
  }

  const handleSendVoucher = () => {
    setMessageType('voucher')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='relative mx-5 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
      >
        <FormField
          name='message'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor='message' className='sr-only'>
                Message
              </Label>
              <FormControl>
                <Input
                  type='text'
                  id='message'
                  placeholder='Viết tin nhắn của bạn vào đây...'
                  className='resize-none border-0 shadow-none focus-visible:ring-0 focus-visible:bg-transparent focus-visible:ring-inset focus-visible:ring-offset-0 dark:bg-slate-950 dark:focus-visible:bg-slate-950'
                  {...field}
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center p-3 pt-0'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleSendVoucher} variant='ghost' size='icon' type='button'>
                <TicketPercent />
                <span className='sr-only'>Vé giảm giá</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='top'>Gửi vé giảm giá</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleSendProduct} variant='ghost' size='icon' type='button'>
                <PackageSearch />
                <span className='sr-only'>Sản phẩm</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='top'>Gửi sản phẩm</TooltipContent>
          </Tooltip>
          <Button variant={'default'} type='submit' size='sm' className='ml-auto gap-1.5'>
            Gửi tin nhắn
            <CornerDownLeft className='size-3.5' />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MessageTextingForm
