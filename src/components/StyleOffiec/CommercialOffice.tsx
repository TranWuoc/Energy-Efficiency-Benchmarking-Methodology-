import DropdownPickerTime from '../DropdownComponenets/DropdownPickerTime';
import InputField from '../InputField';

function CommercialOffice() {
    return (
        <div className=" flex flex-col gap-[30px]">
            <div className="flex w-[950px] items-center justify-between gap-4">
                <div className="flex flex-col ">
                    <span className="font-bold"> a. Khu vực văn phòng cho thuê</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVACOpen" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVACClose" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="LightingOpen" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="LightingClose" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold"> b. Hội trường/ phòng họp lớn</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_1Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_1Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_1Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_1Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[950px]  justify-between gap-4">
                <div className="flex flex-col ">
                    <span className="font-bold"> c. Sảnh chính & lễ tân</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_2Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_2Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_2Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_2Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold">d. Hành lang, cầu thang bộ, khu vệ sinh</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_3Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_3Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_3Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_3Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống cấp nước nóng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HotWaterOpen" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HotWaterClose" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[950px]  justify-between gap-4">
                <div className="flex flex-col ">
                    <span className="font-bold"> e. Khu bảo vệ/ am ninh</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_4Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_4Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_4Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_4Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống camera</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Camera_4Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Camera_4Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold"> f. Căng tin, party, F&B services</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_5Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_5Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_5Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_5Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống cấp nước nóng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HotWater_1Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HotWater_1Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[950px]  justify-between gap-4">
                <div className="flex flex-col ">
                    <span className="font-bold"> g. Khu dịch vụ thương mại</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_5Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_5Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_5Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_5Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống camera</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Camera_2Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Camera_2Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold"> h. Khu đỗ xe trong nhà</span>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px] "> Hệ thống HVAC</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HVAC_6Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HVAC_6Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống chiếu sáng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="Lighting_5Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="Lighting_5Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                    <div className="flex w-[450px] items-center justify-between gap-4">
                        <span className="ml-[50px]"> Hệ thống cấp nước nóng</span>
                        <div className=" flex items-center gap-2">
                            <InputField name="HotWater_2Open" component={DropdownPickerTime} />
                            <span>Đến</span>
                            <InputField name="HotWater_2Close" component={DropdownPickerTime} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommercialOffice;
