import DropdownMenu from '../DropdownComponenets/DropdownMenu';
import { useNavigate } from 'react-router-dom';

function LeftsideBar() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-[300px] flex-col items-center bg-[#FAF9F7]">
            <img src="/Logo.svg" alt="logo" className="mt-[30px] h-[50px] w-[200px]" onClick={() => navigate('/')} />
            <div className=" mt-[20px] flex w-full flex-col ">
                <DropdownMenu
                    optionLabel="Khảo sát thông tin văn phòng"
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
