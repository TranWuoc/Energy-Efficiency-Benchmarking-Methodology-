import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import HeaderLogin from '../components/Layout/HeaderLogin';
import LeftSidebar from '../components/Layout/LeftSidebar';
import { SurveyProvider } from '../contexts/SurveyContext';

function MainLayout() {
    return (
        <SurveyProvider>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar - Fixed */}
                <aside className=" flex-shrink-0">
                    <LeftSidebar />
                </aside>

                {/* Header + Main */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Header - Fixed */}
                    <header className="w-full flex-shrink-0">
                        <HeaderLogin />
                    </header>

                    {/* Main content - Chỉ phần này scroll */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="min-h-[calc(100vh-200px)]">
                            <Outlet />
                        </div>
                        <Footer />
                    </main>
                </div>
            </div>
        </SurveyProvider>
    );
}

export default MainLayout;
