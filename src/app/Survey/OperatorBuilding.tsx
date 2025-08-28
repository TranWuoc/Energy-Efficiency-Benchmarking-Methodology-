import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxGroup from '../../components/CheckboxGroup';
import { useState } from 'react';
import InputField from '../../components/InputField';
import DropdownPickerTime from '../../components/DropdownComponenets/DropdownPickerTime';

const schema = yup.object({
    space: yup.array().of(yup.string()).required(),
});

type FormData = yup.InferType<typeof schema>;

const options = [
    { label: 'Khu vực làm việc hành chính', value: 'Khu vực làm việc hành chính' },
    { label: 'Hội trường/ phòng họp lớn', value: 'Hội trường/ phòng họp lớn' },
    { label: 'Sảnh chính & lễ tân', value: 'Sảnh chính & lễ tân' },
    { label: 'Hành lang, cầu thang, khu vệ sinh', value: 'Hành lang, cầu thang, khu vệ sinh' },
    { label: 'Khu bảo vệ/ an ninh', value: 'Khu bảo vệ/ an ninh' },
    { label: 'Khu vực khác', value: 'Khu vực khác' },
];
function OperatorBuilding() {
    const [selected, setSelected] = useState<string[]>([]);
    const methods = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
    };

    const optionsSelected = methods.watch('space');

    return (
        <div className=" mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col ">
                <span className="flex justify-center text-3xl font-bold uppercase"> II. Vận hành toà nhà </span>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
                        <div className=" flex flex-col justify-start">
                            <span className="text-[20px] font-bold"> Phân vùng không gian </span>
                            <InputField
                                name="space"
                                component={CheckboxGroup}
                                options={options}
                                selected={selected}
                                onChange={setSelected}
                            />
                        </div>
                        <span className="text-[20px] font-bold"> Giờ hoạt động ( Theo phân vùng )</span>
                        {optionsSelected === undefined ? (
                            <div className="text-red-500">*Chưa có dữ liệu. Hãy chọn các phân vùng </div>
                        ) : (
                            optionsSelected.map((item, idx) => (
                                <div className=" my-[20px] flex flex-col gap-3" key={idx}>
                                    <span className="font-bold">{item}</span>
                                    <div className="flex justify-between">
                                        <div className=" flex items-center gap-4">
                                            <span> Ngày thường (T2-T6): </span>
                                            <InputField
                                                name={`optionDetail_${item}Open`}
                                                component={DropdownPickerTime}
                                            />
                                            <span>Đến</span>
                                            <InputField
                                                name={`optionDetail_${item}Close`}
                                                component={DropdownPickerTime}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span> Thứ 7:</span>
                                            <InputField
                                                name={`optionDetail_${item}1Open`}
                                                component={DropdownPickerTime}
                                            />
                                            <span>Đến</span>
                                            <InputField
                                                name={`optionDetail_${item}1Close`}
                                                component={DropdownPickerTime}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span> Chủ nhật:</span>
                                            <InputField
                                                name={`optionDetail_${item}2Open`}
                                                component={DropdownPickerTime}
                                            />
                                            <span>Đến</span>
                                            <InputField
                                                name={`optionDetail_${item}2Close`}
                                                component={DropdownPickerTime}
                                            />
                                        </div>
                                    </div>
                                    <div className=" gap-15 flex flex-row">
                                        <InputField
                                            name={`optionDetail_${item}Note`}
                                            placeholder="Mức độ sử dụng"
                                            className="!w-[200px]"
                                        />
                                        <InputField
                                            name={`optionDetail_${item}Note1`}
                                            placeholder="Số người trung bình"
                                            className="!w-[200px]"
                                        />
                                        <InputField
                                            name={`optionDetail_${item}Note2`}
                                            placeholder="Ghi chú thêm"
                                            className="!w-[200px]"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default OperatorBuilding;
