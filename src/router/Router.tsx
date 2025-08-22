import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import MainLayout from '../layouts/MainLayout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../app/LandingPage.tsx';
import Home from '../app/Home.tsx';

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
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
