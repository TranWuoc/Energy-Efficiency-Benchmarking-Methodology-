import { createBrowserRouter } from 'react-router-dom';
import Buildings from '../app/Buildings/index.tsx';
import DashboardPage from '../app/Dashboard/index.tsx';
import EnergyPerformance from '../app/EnergyPerformance/index.tsx';
import Home from '../app/Home.tsx';
import LoginPage from '../app/Login/index.tsx';
import GeneralInformation from '../app/Survey/GeneralInformation/index.tsx';
import MonthlyElectricity from '../app/Survey/MonthlyElectricity/index.tsx';
import OperatorBuilding from '../app/Survey/OperatorBuilding/index.tsx';
import '../index.css';
import AdminLayout from '../layouts/AdminLayout.tsx';
import LandingPageLayout from '../layouts/LandingpageLayout.tsx';
import MainLayout from '../layouts/MainLayout.tsx';

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
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
        ],
    },
]);

export default router;
