import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/Login';
import LayoutPage from './pages/Layout';
import ContactUsPage from './pages/contact/ContactPage';

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
      path: 'login',
      Component: LoginPage,
    },
    {
      path: 'contact',
      Component: ContactUsPage,
    },
  ],
};
const ContactUs: RouteObject = {
  path: '/contact',
  Component: ContactUsPage,
  errorElement: '<div>error</div>',
};

const router = createBrowserRouter([home, ContactUs]);

export default router;
