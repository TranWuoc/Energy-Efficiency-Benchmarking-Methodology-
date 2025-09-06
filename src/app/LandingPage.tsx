import { Link } from 'react-router-dom';
import ContentSector from '../components/LandingPage/ContentSector';

function LandingPage() {
    return (
        <div className="flex w-full flex-col px-4">
            {/* Section1 */}
            <div className=" flex h-[600px] w-full px-[100px] py-[20px]">
                <div className=" flex rounded-2xl bg-[radial-gradient(50%_17%_at_50.6%_100%,_#a7f9b1_0%,_#FAFAFA_99.99%,_#FAFAFA_100%)]">
                    <div className=" flex h-[500px] w-full flex-col justify-center pl-[150px]">
                        <h1 className=" text-6xl font-bold uppercase">EEBM</h1>
                        <p>Định mức năng lượng và số hoá toàn diện quy trình kiểm định</p>

                        <div className=" mt-10 flex flex-col gap-5">
                            <div className="xlg:text-sm flex items-center gap-2">
                                <div
                                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#B3B3B3]"
                                    style={{ boxShadow: '0px 2px 0px 0px #494756' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={11}
                                        height={9}
                                        viewBox="0 0 11 9"
                                        fill="none"
                                    >
                                        <path
                                            d="M3.43125 6.43359L9.61094 0.253906L10.4313 1.07422L3.43125 8.07422L0.177344 4.82031L0.997656 4L3.43125 6.43359Z"
                                            fill="#2C2A36"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-[4px] flex-1 text-sm font-medium text-[#525252]">
                                    Tối ưu hoá chi phí năng lượng
                                </p>
                            </div>
                            <div className="xlg:text-sm flex items-center gap-2">
                                <div
                                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#B3B3B3]"
                                    style={{ boxShadow: '0px 2px 0px 0px #494756' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={11}
                                        height={9}
                                        viewBox="0 0 11 9"
                                        fill="none"
                                    >
                                        <path
                                            d="M3.43125 6.43359L9.61094 0.253906L10.4313 1.07422L3.43125 8.07422L0.177344 4.82031L0.997656 4L3.43125 6.43359Z"
                                            fill="#2C2A36"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-[4px] flex-1 text-sm font-medium text-[#525252]">
                                    Đưa ra các giải pháp tiết kiệm năng lượng hiệu quả
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center pr-[200px]">
                        <img src="/abc.png" alt="Landing Page Image" className="h-[500px] w-[900px]" />
                    </div>
                </div>
            </div>
            {/* Section 2  */}
            <div className="relative flex h-screen w-full flex-col bg-[#F1ECE5]">
                <h1 className="text-green-color mt-[100px] flex items-center justify-center text-4xl font-black uppercase">
                    Đánh giá hiệu suất năng lượng và các giải pháp tối ưu
                </h1>
                <div className="mt-[100px] flex items-center justify-center">
                    <img src="/idea.png" alt="idea" className="h-[500px] w-[500px] " />
                </div>
                <ContentSector
                    title="Lãng phí năng lượng của văn phòng"
                    description="Cung cấp công cụ đưa ra cái nhìn toàn diện về mức tiêu thụ năng lượng của từng khu vực trong văn phòng, từ điều hòa, chiếu sáng cho đến các thiết bị điện tử."
                    className="absolute ml-[250px] mt-[200px]"
                />
                <ContentSector
                    title="Báo cáo hiệu quả năng lượng toàn diện"
                    description=" Với bảng nhập liệu khảo sát dễ dàng, hệ thống sẽ tạo ra báo cáo phân tích chi tiết. Tất cả dữ liệu và phân tích được trình bày trực quan, dễ hiểu, giúp đưa ra các giải pháp hiệu quả"
                    className="absolute ml-[150px] mt-[400px]"
                />
                <ContentSector
                    title="So sánh hiệu suất với tiêu chuẩn quốc gia"
                    description="Công cụ sẽ so sánh mức tiêu thụ năng lượng của bạn với định mức chuẩn, giúp xác định vị trí của mình và thấy rõ tiềm năng cải thiện."
                    className="absolute ml-[250px] mt-[700px]"
                />
                <ContentSector
                    title="Giải pháp tiết kiệm thực tế"
                    description="Dựa trên dữ liệu thu thập từ khảo sát, hệ thống sẽ đề xuất các giải pháp tiết kiệm năng lượng cụ thể, từ việc tối ưu hóa hệ thống chiếu sáng, điều hòa cho đến các mẹo vận hành hiệu quả hàng ngày."
                    className="absolute ml-[1200px] mt-[250px] "
                />
                <ContentSector
                    title="Đạt chuẩn công trình xanh "
                    description="Một công trình tiết kiệm năng lượng không chỉ giúp giảm chi phí mà còn thể hiện trách nhiệm với môi trường và nâng cao uy tín thương hiệu."
                    className="absolute ml-[1200px] mt-[550px]"
                />
                <script src="https://cdn.tailwindcss.com"></script>
            </div>
            <div className="h-[500px] w-full bg-white"></div>
            {/* Section 3  */}
            <div className="flex flex-col bg-[#FFE3B3]">
                <h1 className=" text-green-color mt-[100px] flex items-center justify-center text-4xl font-black uppercase">
                    loại hình văn phòng
                </h1>
                <div className="mt-[100px] flex w-full justify-around px-[50px] pb-[100px]">
                    <div className="flip-card relative flex h-[350px] w-[350px] flex-col items-center rounded-2xl bg-white px-[50px] py-[50px] shadow-lg">
                        <div className="flip-card-inner relative h-full w-full">
                            {/* Mặt trước */}
                            <div className="flip-card-front flex h-full w-full flex-col items-center justify-center">
                                <img src="/VPNhanuoc.png" alt="VPN Nhà nước" className="h-[150px] w-[150px]" />
                                <p className=" mt-[20px] font-bold uppercase"> Văn phòng nhà nước </p>
                            </div>
                            {/* Mặt sau */}
                            <div className="flip-card-back flex h-full w-full flex-col items-center justify-center">
                                <p className=" text-green-color font-black">
                                    Công cụ của chúng tôi được thiết kế để hỗ trợ các cơ quan chính phủ tuân thủ quy
                                    định và tiêu chuẩn về sử dụng năng lượng. Cung cấp dữ liệu chính xác để dễ dàng quản
                                    lý, báo cáo và tiết kiệm ngân sách một cách hiệu quả nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card relative flex h-[350px] w-[350px] flex-col items-center rounded-2xl bg-white px-[50px] py-[50px] shadow-lg">
                        <div className="flip-card-inner relative h-full w-full">
                            {/* Mặt trước */}
                            <div className="flip-card-front flex h-full w-full flex-col items-center justify-center">
                                <img src="/VPThuongmai.png" alt="VPN Thương Mại" className="h-[200px] w-[200px]" />
                                <p className="font-bold uppercase"> Văn phòng thương mại </p>
                            </div>
                            {/* Mặt sau */}
                            <div className="flip-card-back flex h-full w-full flex-col items-center justify-center">
                                <p className=" text-green-color font-black">
                                    Giúp doanh nghiệp biến chi phí năng lượng thành một lợi thế cạnh tranh. Bằng cách
                                    phân tích chuyên sâu, sẽ tìm ra các điểm lãng phí, giảm chi phí vận hành và nâng cao
                                    hình ảnh thương hiệu bền vững trong mắt khách hàng và đối tác.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="mt-4  bg-green-500 px-4 py-2 text-white">
                    <Link to="/home">Tìm hiểu thêm</Link>
                    <link rel="icon" href="https://cogover.com/vi" />
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
