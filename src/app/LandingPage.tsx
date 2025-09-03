import ContentSector from '../components/LandingPage/ContentSector';

function LandingPage() {
    return (
        <div className="flex w-full flex-col px-4">
            {/* Section1 */}
            <div className=" flex h-[600px] w-full">
                <div className=" flex h-[500px] w-full flex-col justify-center px-[20px]">
                    <h1 className="w-[800px] text-6xl font-bold uppercase">
                        Tối ưu hoá chi phí năng lượng - Tiết kiệm đến 30% ngày hôm nay
                    </h1>
                    <p className="text-green-color mt-4 w-[700px] text-lg">
                        Đừng để hóa đơn điện trở thành gánh nặng. Với công cụ của chúng tôi, bạn có thể dễ dàng đo lường
                        hiệu suất năng lượng của văn phòng, tìm ra các điểm lãng phí, và nhận giải pháp để tiết kiệm tới
                        30% chi phí điện năng hàng năm. Bắt đầu ngay hôm nay để tối đa hóa hiệu quả và giảm chi phí.
                    </p>
                </div>
                <div className=" flex items-center pr-[100px]">
                    <img src="/abcxyz.png" alt="Landing Page Image" className="h-[500px] w-[900px]" />
                </div>
            </div>
            {/* Section 2  */}
            <div className=" flex h-screen w-full flex-col bg-[#F1ECE5]">
                <h1 className=" text-bold text-green-color mt-[100px] flex items-center justify-center text-4xl uppercase">
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
                    title="Báo Cáo Hiệu Quả Năng Lượng Toàn Diện Chỉ Trong Vài Phút"
                    description=" Chỉ với vài thao tác nhập liệu đơn giản, hệ thống của chúng tôi sẽ ngay lập tức tạo ra báo cáo phân tích chi tiết. Tất cả dữ liệu và phân tích được trình bày trực quan, dễ hiểu, giúp bạn ra quyết định nhanh chóng"
                    className="absolute ml-[150px] mt-[400px]"
                />
                <ContentSector
                    title="So Sánh Hiệu Suất Với Tiêu Chuẩn Quốc Gia"
                    description="Công cụ của chúng tôi sẽ so sánh mức tiêu thụ năng lượng của bạn với định mức chuẩn, giúp bạn xác định vị trí của mình và thấy rõ tiềm năng cải thiện."
                    className="absolute ml-[250px] mt-[700px]"
                />
                <ContentSector
                    title="Giải Pháp Tiết Kiệm Năng Lượng Thực Tế Cho Từng Doanh Nghiệp"
                    description="Dựa trên dữ liệu của bạn, hệ thống sẽ đề xuất các giải pháp tiết kiệm năng lượng cụ thể, từ việc tối ưu hóa hệ thống chiếu sáng, điều hòa cho đến các mẹo vận hành hiệu quả hàng ngày."
                    className="absolute ml-[1200px] mt-[250px] "
                />
                <ContentSector
                    title="Đạt Chuẩn Công Trình Xanh - Nâng Tầm Giá Trị Thương Hiệu"
                    description="Một công trình tiết kiệm năng lượng không chỉ giúp giảm chi phí mà còn thể hiện trách nhiệm với môi trường và nâng cao uy tín thương hiệu. Hãy biến văn phòng của bạn thành một biểu tượng của sự phát triển bền vững."
                    className="absolute ml-[1200px] mt-[550px]"
                />
            </div>
        </div>
    );
}

export default LandingPage;
