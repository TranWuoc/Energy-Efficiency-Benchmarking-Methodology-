import DropdownMenu from '../DropdownComponenets/DropdownMenu';

function LeftsideBar() {
    return (
        <div className="flex h-screen w-[300px] flex-col items-center bg-[#FAF9F7]">
            <img src="/Logo.svg" alt="logo" className="mt-[30px] h-[50px] w-[200px]" />
            <div className=" mt-[100px] flex w-full flex-col gap-10 ">
                <DropdownMenu
                    optionLabel="My Label"
                    options={[
                        { label: 'Thông tin chung', value: '1', to: '/home/general' },
                        { label: 'Vận hành toà nhà', value: '2', to: '/home/operator' },
                        { label: 'Năng lượng điện hàng tháng', value: '3', to: '/home/monthly-electricity' },
                    ]}
                />
                <DropdownMenu optionLabel="My Label" options={[]} />
            </div>
        </div>
    );
}

export default LeftsideBar;
