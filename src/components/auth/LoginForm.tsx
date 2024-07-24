import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(2, { message: 'Password must be at least 2 characters.' }),
  })
  .required();

function LoginForm() {
  const [errors, setErrors] = React.useState<[string]>();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { email, password } = values;
    if (!email) {
      setErrors(['Email is required']);
    }
    if (!password) {
      setErrors(['Password is required']);
      return;
    }
    try {
      const result = await signIn({ username: email, password });
      console.log('result::>>', result);
      if (result.isSignedIn) {
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error:::>>>', error);
      setErrors([error.message]);
    }
  }

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-2 col-start-2'>
        {errors?.map((errorText, I) => {
          return (
            <p key={I} className='text-center text-red-800'>
              {errorText ?? null}
            </p>
          );
        })}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='password' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
