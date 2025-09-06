function Header() {
    return (
        <div className="flex h-[100px] w-full items-center gap-3">
            <div className="flex w-[400px] items-center justify-center">
                <img src="/Logo.svg" alt="logo" className="h-[50px] w-[200px]" />
            </div>
            <div className="mr-[200px] flex flex-1 items-center justify-end">
                <div className=" mr-[200px] flex gap-10">
                    {['Về ứng dụng', 'Khảo sát', 'Bảng giá', 'Blog'].map((item) => (
                        <div className="text-[20px] hover:text-[#14B86E] hover:underline">{item}</div>
                    ))}
                </div>
                <div className=" hover:text-teal-50 ">
                    <button className="flex cursor-pointer items-center rounded-3xl border  border-[#14B86E] px-20 py-2 font-bold text-[#14B86E] hover:bg-[#14B86E] hover:text-white">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
