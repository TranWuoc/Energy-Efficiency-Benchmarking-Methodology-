import { useFormContext, useFieldArray } from 'react-hook-form';
import DropdownPickerYear from '../DropdownComponenets/DropdownYear';
import type { FormMonthlyElectricity } from '../../app/Survey/MonthlyElectricity/type';
import { generateDefaultYearConsumption } from '../../app/Survey/MonthlyElectricity/useSchema';

function EnergyConsumption() {
    const { watch, setValue, register, control } = useFormContext<FormMonthlyElectricity>();

    const {
        fields: yearFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'consumedElectricity',
    });

    // Nếu chưa có năm nào, thêm năm hiện tại
    const handleAddYear = () => {
        const currentYear = new Date().getFullYear();
        const existingYears = yearFields.map((f) => f.year);
        let newYear = currentYear;

        while (existingYears.includes(newYear)) {
            newYear--;
        }

        append(generateDefaultYearConsumption(newYear));
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Button thêm năm */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleAddYear}
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    + Thêm năm
                </button>
            </div>

            {yearFields.map((yearField, yearIndex) => {
                const dataSource = watch(`consumedElectricity.${yearIndex}.dataSource`);

                return (
                    <div key={yearField.id} className="w-full rounded-lg border bg-white p-4">
                        {/* Header: Chọn năm và nút xóa */}
                        <div className="mb-4 flex items-center justify-between">
                            <DropdownPickerYear
                                onSelected={(val) => setValue(`consumedElectricity.${yearIndex}.year`, val)}
                                value={watch(`consumedElectricity.${yearIndex}.year`)}
                            />

                            {yearFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(yearIndex)}
                                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                >
                                    Xóa năm
                                </button>
                            )}
                        </div>

                        {/* Bảng nhập liệu */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full bg-white text-left text-sm text-gray-500 rtl:text-right">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                    <tr>
                                        <th scope="col" className="border-r px-6 py-3">
                                            Tháng
                                        </th>
                                        <th scope="col" className="border-r px-6 py-3">
                                            Điện năng tiêu thụ (kWh)
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-b px-6 py-3"
                                            colSpan={2}
                                            style={{ textAlign: 'center' }}
                                        >
                                            Nguồn dữ liệu
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="border-b border-r"></th>
                                        <th className="border-b border-r"></th>
                                        <th className="border-b border-r px-6 py-3">
                                            <div className="flex flex-col gap-2">
                                                <span className="flex items-center justify-center">
                                                    Hoá đơn điện hàng tháng
                                                </span>
                                                <input
                                                    type="radio"
                                                    value={1}
                                                    checked={dataSource === 1}
                                                    onChange={() =>
                                                        setValue(`consumedElectricity.${yearIndex}.dataSource`, 1)
                                                    }
                                                />
                                            </div>
                                        </th>
                                        <th className="border-b px-4 py-3">
                                            <div className="flex flex-col gap-2">
                                                <span className="flex items-center justify-center">
                                                    Công tơ điện/ Báo cáo kiểm toán
                                                </span>
                                                <input
                                                    type="radio"
                                                    value={2}
                                                    checked={dataSource === 2}
                                                    onChange={() =>
                                                        setValue(`consumedElectricity.${yearIndex}.dataSource`, 2)
                                                    }
                                                />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {Array.from({ length: 12 }, (_, monthIndex) => (
                                        <tr key={monthIndex} className="border-b">
                                            <th
                                                scope="row"
                                                className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900"
                                            >
                                                Tháng {monthIndex + 1}
                                            </th>
                                            <td className="border-r px-6 py-4">
                                                <input
                                                    type="number"
                                                    placeholder="Nhập số liệu"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-400 focus:outline-none"
                                                    {...register(
                                                        `consumedElectricity.${yearIndex}.monthlyData.${monthIndex}.energyConsumption` as const,
                                                        { valueAsNumber: true },
                                                    )}
                                                />
                                                {/* Hidden field for month */}
                                                <input
                                                    type="hidden"
                                                    value={monthIndex + 1}
                                                    {...register(
                                                        `consumedElectricity.${yearIndex}.monthlyData.${monthIndex}.month` as const,
                                                        { valueAsNumber: true },
                                                    )}
                                                />
                                            </td>
                                            <td
                                                className={`border-r px-6 py-4 ${
                                                    dataSource !== 1 ? 'cursor-not-allowed bg-gray-400 opacity-50' : ''
                                                }`}
                                            >
                                                {dataSource === 1 && (
                                                    <span className="text-green-600">✓ Đang sử dụng</span>
                                                )}
                                            </td>
                                            <td
                                                className={`px-6 py-4 ${
                                                    dataSource !== 2 ? 'cursor-not-allowed bg-gray-400 opacity-50' : ''
                                                }`}
                                            >
                                                {dataSource === 2 && (
                                                    <span className="text-green-600">✓ Đang sử dụng</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}

            {yearFields.length === 0 && (
                <p className="text-gray-500">Chưa có dữ liệu. Nhấn "Thêm năm" để bắt đầu nhập liệu.</p>
            )}
        </div>
    );
}

export default EnergyConsumption;
