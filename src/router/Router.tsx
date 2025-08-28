import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import MainLayout from '../layouts/MainLayout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../app/LandingPage.tsx';
import Home from '../app/Home.tsx';
import GeneralInformation from '../app/Survey/GeneralInformation.tsx';
import OperatorBuilding from '../app/Survey/OperatorBuilding.tsx';
import MonthlyElectricity from '../app/Survey/MonthlyElectricity.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
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
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
