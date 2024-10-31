import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from '@/hooks/useDebounceCallBack'
import { useSingleEmployeeQuery } from '@/hooks/querys/useEmployeeQuery'

const settingsSchema = z.object({
  avatar: z.string().default(''),
  fullName: z.string().min(6, { message: 'Full name must be at least 6 characters long' }),
  phoneNumber: z.string().default(''),
  username: z.string().default(''),
  address: z.string().default('')
})

const SettingAccount = () => {
  const { data } = useSingleEmployeeQuery('671d295604eb0487971f0291')
  const [avatar, setAvatar] = useState('')
  const inputFileRef = useRef(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const debouncedHandleChange = useDebouncedCallback(() => setIsProcessing(false))
  const settingsForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: '',
      fullName: '',
      username: '',
      phoneNumber: '',
      address: ''
    }
  })

  useEffect(() => {
    if (data) {
      settingsForm.reset({
        avatar: data.data.avatar,
        fullName: data.data.fullName,
        username: data.data.username,
        phoneNumber: data.data.phoneNumber,
        address: data.data.address
      })
    }
  }, [data, settingsForm])

  const handleSettingsSubmit = (data: z.infer<typeof settingsSchema>) => {
    console.log('Account Settings:', data)
  }

  const handleUploadClick = () => {
    if (inputFileRef.current) {
      ;(inputFileRef.current as any).click()
    }
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      setIsProcessing(true)
      reader.onload = () => {
        if (reader.result) {
          setAvatar(reader.result as string)
          debouncedHandleChange()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...settingsForm}>
      <form onSubmit={settingsForm.handleSubmit(handleSettingsSubmit)} className='space-y-6'>
        <FormField
          name='avatar'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
              <Avatar className='w-16 h-16'>
                <AvatarImage src={avatar || field.value} alt='avatar' />
                <AvatarFallback>Ảnh</AvatarFallback>
              </Avatar>
              <input type='file' ref={inputFileRef} onChange={handleFileChange} className='hidden' />
              <Button
                variant='ghost'
                type='button'
                className='mt-3 text-sm font-semibold'
                onClick={handleUploadClick}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div hidden={!inputFileRef} className='flex items-center'>
                    <span>Chờ xử lý...</span>
                    <div className='animate-spin h-5 w-5 ml-2 rounded-full border-2 border-gray-400 border-t-white'></div>
                  </div>
                ) : (
                  <span>Tải lên ảnh địa hiện</span>
                )}
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={settingsForm.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Tên đầy đủ</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your name...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={settingsForm.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Tên tài khoản</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='max-w-xs bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your username...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={settingsForm.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  className='max-w-xs bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your phone number...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={settingsForm.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea
                  className='bg-gray-100 dark:bg-gray-700 h-32 text-gray-900 dark:text-gray-100'
                  placeholder='Description...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-center'>
          <Button className='w-full md:w-1/2 py-3 text-base font-semibold' type='submit'>
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingAccount
