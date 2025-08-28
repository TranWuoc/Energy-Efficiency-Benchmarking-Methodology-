import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/InputField';
import DropdownItems from '../../components/DropdownComponenets/DropdownItems';
import GovernmentOffice from '../../components/StyleOffiec/Government';
import CommercialOffice from '../../components/StyleOffiec/CommercialOffice';

const schema = yup.object({
    name: yup.string().required(),
    direction: yup.string(),
    owner: yup.string(),
    officeStyle: yup.string(),
    yearOperator: yup.number(),
    HVACSystem: yup.string(),
    lightSystem: yup.string(),
    hotWaterSystem: yup.string(),
    anotherSystem: yup.string(),
    temperatureSetup: yup.string(),
    lightSetup: yup.string(),
    anotherSetup: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

function GeneralInformation() {
    const methods = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
    };

    const officeStyle = methods.watch('officeStyle');
    return (
        <div className=" mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col items-center">
                <span className=" text-3xl font-bold uppercase"> I. Thông tin chung </span>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
                        <div className=" mt-[20px] flex flex-wrap gap-[20px]">
                            <InputField name="name" placeholder="1. Tên toà nhà" />
                            <InputField name="direction" placeholder="2. Địa chỉ toà nhà" />
                            <InputField name="owner" placeholder="3. Chủ sở hữu" />
                            <InputField
                                name="officeStyle"
                                placeholder="4. Loại tòa nhà/ chức năng tòa nhà"
                                component={DropdownItems}
                            />
                            <InputField name="yearOperator" placeholder="5. Năm đưa vào vận hành" />
                        </div>
                        <div>
                            <span> 6. Hệ thống kỹ thuật </span>
                            <div className=" mt-[20px] flex flex-wrap gap-[20px]">
                                <InputField name="HVACSystem" placeholder="Hệ thống HVAC" />
                                <InputField name="lightingSystem" placeholder="Hệ thống chiếu sáng" />
                                <InputField name="hotWaterSystem" placeholder="Hệ thống cấp nước nóng" />
                                <InputField name="otherSystem" placeholder="Hệ thống khác" />
                            </div>
                        </div>
                        <div>
                            <span> 7. Thông số cài đặt trong toà nhà </span>
                            <div className=" mt-[20px] flex flex-wrap gap-[20px]">
                                <InputField name="temperatureSetup" placeholder="Nhiệt độ (°C)" />
                                <InputField name="humiditySetup" placeholder="Độ ẩm (%)" />
                                <InputField name="lightingSetup" placeholder="Chiếu sáng (lx)" />
                                <InputField name="otherSetup" placeholder="Thông số cài đặt khác" />
                            </div>
                        </div>
                        <div>
                            <span> 8. Giờ vận hành các hệ thống thiết bị tại các khu vực không gian </span>
                            <div className=" mt-[20px]">
                                {officeStyle === ' Văn phòng công sở nhà nước ' && <GovernmentOffice />}
                                {officeStyle === ' Văn phòng thương mại ' && <CommercialOffice />}
                                {officeStyle === undefined && (
                                    <p className=" text-red-500"> * Vui lòng chọn loại văn phòng </p>
                                )}
                            </div>
                        </div>
                        <InputField name="buildingControlType" placeholder="9. Loại kiểm soát hệ thống toà nhà" />
                        <div>
                            <span> 10. Tổng diện tích sàn</span>
                            <div className=" mt-[20px] flex flex-col ">
                                <div className=" flex items-center gap-5">
                                    <InputField name="floorCount" placeholder="Số tầng" className="!w-[100px]" />
                                    <span> Gồm: </span>
                                    <InputField
                                        name="aboveGroundCount"
                                        placeholder="Số tầng trên mặt đất"
                                        className="!w-[100px]"
                                    />
                                    <InputField name="basementCount" placeholder="Số tầng hầm" className="!w-[100px]" />
                                </div>
                                <div className=" mt-[10px] flex flex-col  gap-5">
                                    <div className=" flex items-center gap-5">
                                        <span>
                                            Tồng diện tích sàn xây dựng không bao gồm diện tích khu đỗ xe bên ngoài toà
                                            nhà (nếu có) :
                                        </span>
                                        <InputField name="totalArea" placeholder="m²" className="!w-[50px]" />
                                    </div>
                                    <div className=" flex items-center gap-5">
                                        <span>Diện tích không cho thuê xe (m²):</span>
                                        <InputField name="nonRentalCarArea" placeholder="m²" className="!w-[50px]" />
                                    </div>
                                    <div className=" flex items-center gap-5">
                                        <span> Tổng diện tích cho thuê (m²):</span>
                                        <InputField name="rentalArea" placeholder="m²" className="!w-[50px]" />
                                    </div>
                                    <div className=" flex items-center gap-5">
                                        <span>Diện tích cho thuê của mỗi loại hình thuê (m²):</span>
                                        <InputField name="leaseArea" placeholder="m²" className="!w-[50px]" />
                                    </div>
                                    <div className=" flex items-center gap-5">
                                        <span>Diện tích khu vực người thuê không có người thuê ( còn trống ):</span>
                                        <InputField name="vacantArea" placeholder="m²" className="!w-[50px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default GeneralInformation;
