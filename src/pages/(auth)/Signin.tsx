import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router-dom'

const signInSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  }),
  check: z.boolean().default(false).optional()
})

const Signin = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      check: false
    }
  })

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    console.log(data)
  }

  return (
    <>
      <div className='max-w-2xl w-full h-full sm:h-auto bg-white px-14 py-[90px] sm:rounded-3xl container sm:mx-32'>
        <div className='text-center flex flex-col gap-y-4'>
          <h1 className='text-[32px] font-bold text-[#202224]'>Login to Account</h1>
          <p className='text-lg text-[#202224] opacity-80'>Please enter your email and password to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 mt-9'>
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Password</FormLabel>
                    <Link to={'/'} className='text-lg opacity-60'>
                      Forget Password?
                    </Link>
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
                      Remember Password
                    </label>
                  </div>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-center'>
              <Button variant={'primary'} className='w-[418px] py-7 text-xl font-bold opacity-90' type='submit'>
                Sign In
              </Button>
            </div>
          </form>
        </Form>
        <div className='flex flex-col sm:flex-row items-center justify-center mt-4 text-lg'>
          <p className='mr-1 opacity-65'>Don’t have an account?</p>
          <Link className='text-[#5A8CFF] font-semibold underline' to={'/signup'}>
            Create Account
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signin
