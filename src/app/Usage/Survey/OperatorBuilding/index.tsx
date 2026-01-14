import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import DropdownItems from '../../../../components/DropdownComponent/DropdownItems';
import DropdownTimeRange from '../../../../components/DropdownComponent/DropdownTimeRange';
import InputField from '../../../../components/InputField';
import { UTILISATION_LEVEL_OPTIONS } from '../../../../constants';
import { useSurvey } from '../../../../contexts/SurveyContext';
import type { FormOperatorBuilding, SpaceZoneOperation } from './type';
import { SPACE_ZONE_OPTIONS, getZoneLabelByCode } from './type';
import { generateDefaultSpaceZone, useGetOperatorBuildingSchema } from './useSchema';

function OperatorBuilding() {
    const navigate = useNavigate();
    const { updateOperatorBuilding, surveyData } = useSurvey();
    const schema = useGetOperatorBuildingSchema();

    const methods = useForm<FormOperatorBuilding>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormOperatorBuilding>),
        defaultValues: surveyData.operatorBuilding.spaceZones ? surveyData.operatorBuilding : { spaceZones: [] },
    });

    const { control, watch, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'spaceZones',
    });

    const onSubmit = async (data: FormOperatorBuilding) => {
        console.log(data);
        updateOperatorBuilding(data);
        navigate('/home/monthly-electricity');
    };

    // Lấy danh sách zoneCode đã chọn
    const selectedZoneCodes = fields.map((f) => f.zoneCode);

    // Xử lý khi toggle checkbox
    const handleZoneToggle = (zoneCode: SpaceZoneOperation['zoneCode'], checked: boolean) => {
        if (checked) {
            append(generateDefaultSpaceZone(zoneCode));
        } else {
            const index = fields.findIndex((f) => f.zoneCode === zoneCode);
            if (index !== -1) {
                remove(index);
            }
        }
    };

    return (
        <div className="mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col">
                <span className="flex justify-center text-3xl font-bold uppercase">II. Vận hành toà nhà</span>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
                        {/* Phân vùng không gian - Checkbox selection */}
                        <div className="flex flex-col justify-start">
                            <span className="text-[20px] font-bold">Phân vùng không gian</span>
                            <div className="mt-4 flex flex-wrap gap-4">
                                {SPACE_ZONE_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-4 py-2 hover:bg-gray-50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedZoneCodes.includes(option.value)}
                                            onChange={(e) => handleZoneToggle(option.value, e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Giờ hoạt động theo phân vùng */}
                        <span className="text-[20px] font-bold">Giờ hoạt động (Theo phân vùng)</span>

                        {fields.length === 0 ? (
                            <div className="text-red-500">*Chưa có dữ liệu. Hãy chọn các phân vùng</div>
                        ) : (
                            fields.map((field, index) => (
                                <div
                                    className="my-[20px] flex flex-col gap-3 rounded-lg border bg-white p-4"
                                    key={field.id}
                                >
                                    <span className="text-lg font-bold">{getZoneLabelByCode(field.zoneCode)}</span>

                                    {/* Thời gian hoạt động */}
                                    <div className="flex items-center justify-between">
                                        {/* Ngày thường */}
                                        <DropdownTimeRange
                                            label="Ngày thường (T2-T6):"
                                            value={watch(`spaceZones.${index}.weekday`)}
                                            onChange={(val) => setValue(`spaceZones.${index}.weekday`, val)}
                                            placeholderFrom="Từ"
                                            placeholderTo="Đến"
                                        />

                                        {/* Thứ 7 */}
                                        <DropdownTimeRange
                                            label="Thứ 7:"
                                            value={watch(`spaceZones.${index}.saturday`)}
                                            onChange={(val) => setValue(`spaceZones.${index}.saturday`, val)}
                                            placeholderFrom="Từ"
                                            placeholderTo="Đến"
                                            className="ml-30"
                                        />

                                        {/* Chủ nhật */}
                                        <DropdownTimeRange
                                            label="Chủ nhật:"
                                            value={watch(`spaceZones.${index}.sunday`)}
                                            onChange={(val) => setValue(`spaceZones.${index}.sunday`, val)}
                                            placeholderFrom="Từ"
                                            placeholderTo="Đến"
                                        />
                                    </div>

                                    {/* Thông tin bổ sung */}
                                    <div className="flex flex-row gap-4">
                                        <InputField
                                            name={`spaceZones.${index}.utilisationLevel`}
                                            component={DropdownItems}
                                            options={UTILISATION_LEVEL_OPTIONS}
                                            placeholder="Mức độ sử dụng"
                                            size="md"
                                        />
                                        <InputField
                                            name={`spaceZones.${index}.averagePeople`}
                                            placeholder="Số người trung bình"
                                            size="md"
                                            type="number"
                                            className="ml-10"
                                        />
                                        <InputField
                                            name={`spaceZones.${index}.note`}
                                            placeholder="Ghi chú thêm"
                                            size="md"
                                        />
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/home/general')}
                                className="rounded border border-gray-400 px-6 py-3 hover:bg-gray-100"
                            >
                                ← Quay lại
                            </button>
                            <button
                                type="submit"
                                className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed"
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

export default OperatorBuilding;
