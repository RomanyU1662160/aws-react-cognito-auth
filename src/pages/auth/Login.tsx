import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

function LoginPage() {
  return (
    <div>
      <h1 className='text-center font-extrabold text-2xl' data-testid='Login'>
        Login
      </h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
