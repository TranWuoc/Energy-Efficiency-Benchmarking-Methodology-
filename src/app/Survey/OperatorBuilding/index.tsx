import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import type { FormOperatorBuilding, SpaceZoneOperation } from './type';
import { SPACE_ZONE_OPTIONS, getZoneLabelByCode } from './type';
import { useGetOperatorBuildingSchema, generateDefaultSpaceZone } from './useSchema';
import * as yup from 'yup';
import DropdownPickerTime from '../../../components/DropdownComponenets/DropdownPickerTime';

function OperatorBuilding() {
    const schema = useGetOperatorBuildingSchema();

    const methods = useForm<FormOperatorBuilding>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormOperatorBuilding>),
        defaultValues: {
            spaceZones: [],
        },
    });

    const { control, watch, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'spaceZones',
    });

    const onSubmit = async (data: FormOperatorBuilding) => {
        console.log('Form Data:', data);
        // TODO: Call API to save data
    };

    // Lấy danh sách zoneCode đã chọn
    const selectedZoneCodes = fields.map((f) => f.zoneCode);

    // Xử lý khi toggle checkbox
    const handleZoneToggle = (zoneCode: SpaceZoneOperation['zoneCode'], checked: boolean) => {
        if (checked) {
            // Thêm zone mới
            append(generateDefaultSpaceZone(zoneCode));
        } else {
            // Xóa zone
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
                                    <div className="flex flex-wrap justify-between gap-4">
                                        {/* Ngày thường */}
                                        <div className="flex items-center gap-4">
                                            <span>Ngày thường (T2-T6):</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.weekday.from`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.weekday.from`, val)}
                                                placeholder="Từ"
                                            />
                                            <span>Đến</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.weekday.to`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.weekday.to`, val)}
                                                placeholder="Đến"
                                            />
                                        </div>

                                        {/* Thứ 7 */}
                                        <div className="flex items-center gap-4">
                                            <span>Thứ 7:</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.saturday.from`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.saturday.from`, val)}
                                                placeholder="Từ"
                                            />
                                            <span>Đến</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.saturday.to`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.saturday.to`, val)}
                                                placeholder="Đến"
                                            />
                                        </div>

                                        {/* Chủ nhật */}
                                        <div className="flex items-center gap-4">
                                            <span>Chủ nhật:</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.sunday.from`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.sunday.from`, val)}
                                                placeholder="Từ"
                                            />
                                            <span>Đến</span>
                                            <DropdownPickerTime
                                                value={watch(`spaceZones.${index}.sunday.to`)}
                                                onSelected={(val) => setValue(`spaceZones.${index}.sunday.to`, val)}
                                                placeholder="Đến"
                                            />
                                        </div>
                                    </div>

                                    {/* Thông tin bổ sung */}
                                    <div className="flex flex-row gap-4">
                                        <InputField
                                            name={`spaceZones.${index}.utilisationLevel`}
                                            placeholder="Mức độ sử dụng"
                                            className="!w-[200px]"
                                        />
                                        <InputField
                                            name={`spaceZones.${index}.averagePeople`}
                                            placeholder="Số người trung bình"
                                            className="!w-[200px]"
                                            type="number"
                                        />
                                        <InputField
                                            name={`spaceZones.${index}.note`}
                                            placeholder="Ghi chú thêm"
                                            className="!w-[200px]"
                                        />
                                    </div>
                                </div>
                            ))
                        )}

                        <button
                            type="submit"
                            className="mt-4 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
                        >
                            Lưu thông tin
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default OperatorBuilding;
