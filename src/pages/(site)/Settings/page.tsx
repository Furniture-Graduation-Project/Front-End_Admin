import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const settingsSchema = z.object({
  avatar: z.string().default(''),
  email: z.string().email({
    message: 'Invalid email address'
  }),
  name: z.string().min(6, {
    message: 'Full name must be at least 6 characters long'
  }),
  phoneNumber: z.string().default(''),
  position: z.string().default(''),
  description: z.string().default('')
})

const SettingsPage = () => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
      phoneNumber: '',
      position: '',
      description: ''
    }
  })

  const onSubmit = (data: z.infer<typeof settingsSchema>) => {
    console.log(data)
  }
  return (
    <div className='px-[30px] pt-[38px] pb-[52px] bg-[#F5F6FA]'>
      <h1 className='text-[32px] font-bold mb-[38px]'>General Settings</h1>
      <div className='w-full rounded-xl py-[60px] border-[0.3px] bg-white'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 xl:mx-auto mx-12 lg:mx-20 w-auto xl:w-[788px] flex flex-col items-center justify-center'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex flex-col items-center justify-center'>
                  <Avatar className='w-[80px] h-[80px]'>
                    <AvatarImage src='https://assets.codepen.io/1480814/av+1.png' {...field} alt='avatar' />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <Button variant={'ghost'} type='button' className='mt-4 text-sm font-semibold text-[#4379EE]'>
                    Upload Avatar
                  </Button>
                </FormItem>
              )}
            />

            <div className='grid md:grid-cols-2 gap-x-[60px] w-full gap-y-7 md:gap-y-0'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Full name</FormLabel>
                    <FormControl>
                      <Input type='text' className='bg-[#F1F4F9] h-14' placeholder='Your name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Email address</FormLabel>
                    <FormControl>
                      <Input type='email' className='bg-[#F1F4F9] h-14' placeholder='Your email...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid md:grid-flow-col gap-x-[60px] w-full gap-y-7 md:gap-y-0'>
              <div className='col-span-1 md:mt-3'>
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg opacity-80 text-[#202224]'>Phone number</FormLabel>
                      <FormControl>
                        <Input className='bg-[#F1F4F9] h-14' placeholder='Your phone number...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='row-span-2 col-span-1 md:mt-7'>
                <FormField
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg opacity-80 text-[#202224]'>Position</FormLabel>
                      <FormControl>
                        <Input className='bg-[#F1F4F9] h-14' placeholder='Your position...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='row-span-3 md:mt-3'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg opacity-80 text-[#202224]'>Description</FormLabel>
                      <FormControl>
                        <Textarea className='bg-[#F1F4F9] h-44' placeholder='Description...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button variant={'outline'} className='w-[418px] py-7 text-xl font-bold opacity-90' type='submit'>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SettingsPage
