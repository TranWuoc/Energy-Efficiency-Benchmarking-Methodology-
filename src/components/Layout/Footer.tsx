function Footer() {
    return (
        <div className="h-[300px] w-full bg-[#ffff] px-1 py-1">
            <div className=" flex  gap-[200px] bg-[#FAF9F7] pb-[50px] pl-[100px] pt-[20px]">
                <div className=" flex flex-col gap-5">
                    <span className="text-[20px] text-[#119C59]">Get started</span>
                    <span> Blog</span>
                    <span>Site Map</span>
                    <span>F.A.Q</span>
                </div>
                <div className=" flex flex-col gap-5">
                    <span className="text-[20px] text-[#119C59]">Pricing</span>
                    <span>Bronze</span>
                    <span>Silver</span>
                    <span>Gold</span>
                </div>
                <div className=" flex flex-col gap-5">
                    <span className="text-[20px] text-[#119C59]">Follow</span>
                    <span>Facebook</span>
                    <span>LinkedIn</span>
                    <span>Twitter</span>
                </div>
            </div>
            <div className=" flex items-center justify-between bg-[#119C59] px-10 py-5">
                <div>
                    <span className="text-[white]"> Privacy policy /</span>
                    <span className="text-[white]"> Personal information /</span>
                    <span className="text-[white]"> Terms of Service</span>
                </div>
                <img src="/LogoFooter.svg" alt="Logo" className="h-[50px]" />
            </div>
        </div>
    );
}

export default Footer;
