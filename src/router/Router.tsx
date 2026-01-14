import { createBrowserRouter } from 'react-router-dom';
import BuildingDetailPage from '../app/Admin/BuildingDetail/index.tsx';
import BuildingsPageAdmin from '../app/Admin/Buildings/index.tsx';
import DashboardPage from '../app/Admin/Dashboard/index.tsx';
import EPPage from '../app/Admin/EnergyPerformance/index.tsx';
import EPDetailPage from '../app/Admin/EPDetail/index.tsx';
import Buildings from '../app/Buildings/index.tsx';
import EnergyPerformance from '../app/EnergyPerformance/index.tsx';
import Home from '../app/Home.tsx';
import LoginPage from '../app/Login/index.tsx';
import GeneralInformation from '../app/Usage/Survey/GeneralInformation/index.tsx';
import MonthlyElectricity from '../app/Usage/Survey/MonthlyElectricity/index.tsx';
import OperatorBuilding from '../app/Usage/Survey/OperatorBuilding/index.tsx';
import '../index.css';
import AdminLayout from '../layouts/AdminLayout.tsx';
import LandingPageLayout from '../layouts/LandingpageLayout.tsx';
import MainLayout from '../layouts/MainLayout.tsx';
import { ProtectRouter } from './ProtectRouter.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPageLayout />,
    },
    {
        path: '/home',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'general',
                element: <GeneralInformation />,
            },
            {
                path: 'operator',
                element: <OperatorBuilding />,
            },
            {
                path: 'monthly-electricity',
                element: <MonthlyElectricity />,
            },
        ],
    },
    {
        path: '/buildings',
        element: <Buildings />,
    },
    {
        path: '/energy-performances',
        element: <EnergyPerformance />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/admin',
        element: (
            <ProtectRouter>
                <AdminLayout />
            </ProtectRouter>
        ),
        children: [
            {
                path: '/admin/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/admin/buildings',
                element: <BuildingsPageAdmin />,
            },
            {
                path: '/admin/buildings/:buildingId',
                element: <BuildingDetailPage />,
            },
            {
                path: '/admin/energy-performance',
                element: <EPPage />,
            },
            {
                path: '/admin/energy-performance/:buildingId',
                element: <EPDetailPage />,
            },
        ],
    },
]);

export default router;
