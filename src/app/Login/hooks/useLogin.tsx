// src/hooks/auth/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth/auth.api';
import { toastAction } from '../../../utils/toast';

type LoginPayload = {
    username: string;
    password: string;
};

type LoginResponse = {
    data: {
        token: string;
        admin: any;
    };
    message: string;
    success: boolean;
};

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation<LoginResponse, any, LoginPayload>({
        mutationFn: ({ username, password }) => login(username, password),

        onSuccess: (data) => {
            // ✅ Lưu token
            localStorage.setItem('accessToken', data.data.token);

            let timeoutId: ReturnType<typeof setTimeout> | null = null;

            toastAction('Đăng nhập thành công!', {
                label: 'Đi đến Dashboard',
                onClick: () => {
                    if (timeoutId) clearTimeout(timeoutId);
                    navigate('/dashboard');
                },
            });

            timeoutId = setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
};
