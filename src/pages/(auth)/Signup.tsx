import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import { Link } from 'react-router-dom'

const signUpSchema = z
  .object({
    email: z.string().email({
      message: 'Invalid email address'
    }),
    name: z.string().min(3, {
      message: 'Name must be at least 3 characters long'
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long'
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters long'
    }),
    check: z.literal(true, {
      errorMap: () => ({ message: 'Please accept terms and conditions' })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  })

const Signup = () => {
  const { onSubmit } = useAccountMutation({
    action: 'SIGNUP'
  })
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmit = (data: z.infer<typeof signUpSchema>) => {
    const { check, ...dataWithoutCheck } = data
    onSubmit(dataWithoutCheck)
  }

  return (
    <>
      <div className='max-w-2xl w-full h-full sm:h-auto my-8 bg-white px-14 py-[20px] sm:rounded-3xl container sm:mx-32'>
        <div className='text-center flex flex-col gap-y-4'>
          <h1 className='text-[32px] font-bold text-[#202224]'>Create an Account</h1>
          <p className='text-lg text-[#202224] opacity-80'>Create a account to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10 mt-9'>
            <div className='grid grid-cols-2 gap-x-5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Email address</FormLabel>
                    <FormControl>
                      <Input className='bg-[#F1F4F9] h-14' placeholder='Your email...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Name</FormLabel>
                    <FormControl>
                      <Input className='bg-[#F1F4F9] h-14' placeholder='Your name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input type='password' className='bg-[#F1F4F9] h-14' placeholder='Your password...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Confirm Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input type='password' className='bg-[#F1F4F9] h-14' placeholder='Your password...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='check'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        className='border-[#999999] data-[state=checked]:bg-white data-[state=checked]:text-neutral-500 rounded-[4px]'
                        id='check'
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <label htmlFor='check' className='text-xs opacity-60'>
                        I accept terms and conditions
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className='flex items-center justify-center'>
              <Button variant={'primary'} className='w-[418px] py-7 text-xl font-bold opacity-90' type='submit'>
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
        <div className='flex flex-col sm:flex-row items-center justify-center mt-4 text-lg'>
          <p className='mr-1 opacity-65'>Already have an account? </p>
          <Link className='text-[#5A8CFF] font-semibold underline' to={'/'}>
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signup
