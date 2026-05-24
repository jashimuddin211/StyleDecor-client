
import { Outlet } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer></Footer>

    </div>
  );
};

export default MainLayout;