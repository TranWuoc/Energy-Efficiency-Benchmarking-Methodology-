import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const NAV_ITEMS = [
        { label: 'Về ứng dụng', path: '/about' },
        { label: 'Khảo sát toà nhà', path: '/home/general' },
        { label: 'Bảng giá', path: '/pricing' },
        { label: 'Blog', path: '/blog' },
    ];

    const navigate = useNavigate();

    return (
        <div className="flex h-[100px] w-full items-center gap-3">
            <div className="flex w-[400px] items-center justify-center">
                <img src="/Logo.svg" alt="logo" className="h-[50px] w-[200px]" />
            </div>
            <div className="mr-[200px] flex flex-1 items-center justify-end">
                <div className=" mr-[200px] flex gap-10">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="cursor-pointer text-[20px] hover:text-[#14B86E] hover:underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className=" hover:text-teal-50 ">
                    <button
                        className="flex cursor-pointer items-center rounded-3xl border  border-[#14B86E] px-20 py-2 font-bold text-[#14B86E] hover:bg-[#14B86E] hover:text-white"
                        onClick={() => navigate('/login')}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
