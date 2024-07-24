import { createHashRouter, RouteObject } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/Login';
import LayoutPage from './pages/Layout';
import ContactUsPage from './pages/contact/ContactPage';
import SignupForm from './components/auth/Signup';
import SignupConfirmation from './components/auth/Confirmation';

const home: RouteObject = {
  id: 'root',
  path: '/',
  Component: LayoutPage,
  children: [
    {
      index: true,
      Component: HomePage,
    },
    {
      path: 'contact',
      Component: ContactUsPage,
    },
    {
      path: 'login',
      Component: LoginPage,
    },
    {
      path: 'signup',
      Component: SignupForm,
    },
    {
      path: 'confirmation',
      element: typeof SignupConfirmation,
    },
  ],
};
const ContactUs: RouteObject = {
  path: '/contact',
  Component: ContactUsPage,
  errorElement: '<div>error</div>',
};

const router = createHashRouter([home, ContactUs]);

export default router;
