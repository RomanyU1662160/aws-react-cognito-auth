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
import { signUp } from 'aws-amplify/auth';
import SignupConfirmation from './Confirmation';

type SignUpResult = {
  nextStep: 'DONE' | 'CONFIRM_SIGN_UP' | 'COMPLETE_AUTO_SIGN_IN';
  userId: string | undefined;
  isSignUpComplete: boolean;
};

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(2, { message: 'Password must be at least 2 characters.' }),
  })
  .required();

function SignupForm() {
  const [errors, setErrors] = React.useState<[string]>();
  const [signupResult, setSignupResult] = React.useState<SignUpResult>();

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
      const result = await signUp({ username: email, password });
      const { nextStep, userId, isSignUpComplete } = result;
      setSignupResult({
        nextStep: nextStep.signUpStep,
        userId,
        isSignUpComplete,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error.message:::>>>', error.message);
      setErrors([error.message]);
    }
  }

  /// show confirmation form if the user submitted the signup form and the result returns to confirm the user's account
  if (
    signupResult?.userId &&
    !signupResult.isSignUpComplete &&
    signupResult.nextStep === 'CONFIRM_SIGN_UP'
  ) {
    return <SignupConfirmation userId={signupResult.userId} />;
  }
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-2 col-start-2'>
        <h1 className='text-center font-bold'>Signup</h1>
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Add your email' {...field} />
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
                    <Input
                      type='Add your password'
                      placeholder='password'
                      {...field}
                    />
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

export default SignupForm;
