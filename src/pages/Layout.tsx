import { Outlet } from 'react-router-dom';
import MainNavBar from '../components/common/AppBar/MainNav';

function LayoutPage() {
  return (
    <>
      <MainNavBar />
      <Outlet />
    </>
  );
}

export default LayoutPage;
