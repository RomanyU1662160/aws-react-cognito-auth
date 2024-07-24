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
import { confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const formSchema = z
  .object({
    confirmationCode: z.string({
      message: 'Confirmation code cannot be empty...',
    }),
  })
  .required();

type SignupConfirmationProps = {
  userId: string;
};

function SignupConfirmation({ userId }: SignupConfirmationProps) {
  const [errors, setErrors] = React.useState<[string]>();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmationCode: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { confirmationCode } = values;
    if (!confirmationCode) {
      setErrors(['Confirmation Code is required']);
    }
    try {
      const result = await confirmSignUp({
        username: userId,
        confirmationCode,
      });
      console.log(result);
      const { isSignUpComplete, nextStep } = result;
      if (isSignUpComplete && nextStep.signUpStep === 'DONE') {
        navigate('/login');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors([error.message]);
    }
  }
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-2 col-start-2'>
        {errors?.map((errorText, I) => {
          return (
            <p key={I} className='text-center text-red-800'>
              {errorText}
            </p>
          );
        })}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='confirmationCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='confirmationCode' {...field} />
                  </FormControl>
                  <FormDescription>
                    This confirmationCode sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Confirm your account</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignupConfirmation;
