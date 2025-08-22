import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import HeaderLogin from '../components/Layout/HeaderLogin';
import LeftsideBar from '../components/Layout/LeftsideBar';

function MainLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Fixed */}
            <aside className=" flex-shrink-0">
                <LeftsideBar />
            </aside>

            {/* Header + Main */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header - Fixed */}
                <header className="w-full flex-shrink-0">
                    <HeaderLogin />
                </header>

                {/* Main content - Chỉ phần này scroll */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
