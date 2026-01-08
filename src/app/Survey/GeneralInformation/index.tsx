import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import CommercialOffice from '../../../components/StyleOffiec/CommercialOffice';
import GovernmentOffice from '../../../components/StyleOffiec/Government';
import DropdownItems from '../../../components/DropdownComponenets/DropdownItems';
import type { FormSaveGeneralInformation } from './type';
import { useGetSaveGeneralInformationSchema } from './useSchema';
import { useSurvey } from '../../../contexts/SurveyContext';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../../components/CheckboxComponent';
import { BUILDING_TYPE_OPTIONS, CONTROL_SYSTEM_OPTIONS } from '../../../constants';

function GeneralInformation() {
    const schema = useGetSaveGeneralInformationSchema();
    const { surveyData, updateGeneralInformation } = useSurvey();
    const navigate = useNavigate();
    const methods = useForm<FormSaveGeneralInformation>({
        resolver: yupResolver(Object(schema) as yup.ObjectSchema<FormSaveGeneralInformation>),
        defaultValues: surveyData.generalInformation,
    });

    const onSubmit = async (data: FormSaveGeneralInformation) => {
        console.log(data);
        updateGeneralInformation(data);
        navigate('/home/operator');
    };

    const buildingType = methods.watch('buildingType');
    return (
        <div className="mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col items-center">
                <span className="text-3xl font-bold uppercase"> I. Thông tin chung </span>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
                        <div className="mt-[20px] flex flex-wrap gap-[20px]">
                            <InputField name="name" placeholder="1. Tên toà nhà" />
                            <InputField name="address" placeholder="2. Địa chỉ toà nhà" />
                            <InputField name="owner" placeholder="3. Chủ sở hữu" />
                            <InputField
                                name="buildingType"
                                placeholder="4. Loại tòa nhà/ chức năng tòa nhà"
                                component={DropdownItems}
                                options={BUILDING_TYPE_OPTIONS}
                                size="lg"
                            />
                            <InputField name="commissioningYear" placeholder="5. Năm đưa vào vận hành" size="xl" />
                        </div>
                        <div>
                            <span> 6. Hệ thống kỹ thuật </span>
                            <div className="mt-[20px] flex flex-wrap gap-[20px]">
                                <InputField name="hasHVAC" placeholder="Hệ thống HVAC" component={Checkbox} />
                                <InputField name="hasLighting" placeholder="Hệ thống chiếu sáng" component={Checkbox} />
                                <InputField
                                    name="hasWaterHeating"
                                    placeholder="Hệ thống cấp nước nóng"
                                    component={Checkbox}
                                />
                                <InputField name="otherSystems" placeholder="Hệ thống khác" component={Checkbox} />
                            </div>
                        </div>
                        <div>
                            <span> 7. Thông số cài đặt trong toà nhà </span>
                            <div className="mt-[20px] flex items-center gap-[20px]">
                                <InputField
                                    type="number"
                                    label="Nhiệt độ (°C):"
                                    name="setpointTemperature"
                                    placeholder="°C"
                                    size="sm"
                                />
                                <InputField
                                    type="number"
                                    name="setpointHumidity"
                                    label="Độ ẩm (%):"
                                    placeholder="%"
                                    size="sm"
                                />
                                <InputField
                                    name="setpointLightingLevel"
                                    label="Chiếu sáng (lx):"
                                    placeholder="lx"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div>
                            <span> 8. Giờ vận hành các hệ thống thiết bị tại các khu vực không gian </span>
                            <div className="mt-[20px]">
                                {buildingType === 1 && <GovernmentOffice />}
                                {buildingType === 2 && <CommercialOffice />}
                                {buildingType === undefined && (
                                    <p className="text-red-500"> * Vui lòng chọn loại văn phòng </p>
                                )}
                            </div>
                        </div>
                        <InputField
                            name="controlSystemType"
                            component={DropdownItems}
                            options={CONTROL_SYSTEM_OPTIONS}
                            placeholder="9. Loại kiểm soát hệ thống toà nhà"
                            size="xl"
                        />
                        <div>
                            <span> 10. Thông số diện tích</span>
                            <div className="mt-[10px] flex flex-col">
                                <div className="flex items-center gap-5">
                                    <InputField
                                        type="number"
                                        name="totalFloorArea"
                                        placeholder="(m²)"
                                        size="sm"
                                        label="Tổng diện tích sàn(m²)"
                                    />
                                    <span className="mb-6">Gồm:</span>
                                    <InputField
                                        type="number"
                                        name="aboveGroundFloorArea"
                                        label="Diện tích trên mặt đất (m²)"
                                        placeholder="(m²)"
                                        size="sm"
                                    />
                                    <InputField
                                        type="number"
                                        name="basementFloorArea"
                                        placeholder="(m²)"
                                        size="sm"
                                        label="Diện tích tầng hầm (m²)"
                                    />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <InputField
                                        type="number"
                                        name="outdoorParkingArea"
                                        placeholder="m²"
                                        label="Tổng diện tích sàn xây dựng không bao gồm diện tích khu đỗ xe bên ngoài toà nhà (nếu có) :
"
                                        size="sm"
                                    />

                                    <InputField
                                        type="number"
                                        label="Diện tích không cho thuê (m²):"
                                        name="nonRentableArea"
                                        placeholder="m²"
                                        size="sm"
                                    />

                                    <InputField
                                        type="number"
                                        label="Tổng diện tích cho thuê (m²):"
                                        name="totalRentableArea"
                                        placeholder="m²"
                                        size="sm"
                                    />

                                    <InputField
                                        type="number"
                                        label="Diện tích khu vực người thuê không có người thuê (còn trống):"
                                        name="vacantArea"
                                        placeholder="m²"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="submit"
                                className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
                            >
                                Tiếp theo →
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default GeneralInformation;
