import { useEffect, useRef, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import InputField from '../InputField';
import {
    ENERGY_SOURCE_OPTIONS,
    type EnergySourceType,
    type FormMonthlyElectricity,
} from '../../app/Survey/MonthlyElectricity/type';
import DropdownPickerYear from '../DropdownComponenets/DropdownYear';
import { generateDefaultRenewableProduction } from '../../app/Survey/MonthlyElectricity/useSchema';

function EnergyProduction() {
    const { watch, setValue, control, register } = useFormContext<FormMonthlyElectricity>();

    // State lưu selectedEnergyView theo yearIndex
    const [selectedEnergyViewByYear, setSelectedEnergyViewByYear] = useState<Record<number, EnergySourceType | ''>>({});
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const {
        fields: yearFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'producedElectricity',
    });

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenDropdownIndex(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Thêm năm mới
    const handleAddYear = () => {
        const currentYear = new Date().getFullYear();
        const existingYears = yearFields.map((f) => f.year);
        let newYear = currentYear;

        while (existingYears.includes(newYear)) {
            newYear--;
        }

        append(generateDefaultRenewableProduction(newYear));
    };

    // Xóa năm và cleanup state
    const handleRemoveYear = (yearIndex: number) => {
        remove(yearIndex);
        // Cleanup selectedEnergyView cho năm đã xóa
        setSelectedEnergyViewByYear((prev) => {
            const newState = { ...prev };
            delete newState[yearIndex];
            // Re-index các năm phía sau
            const reindexed: Record<number, EnergySourceType | ''> = {};
            Object.keys(newState).forEach((key) => {
                const idx = parseInt(key);
                if (idx > yearIndex) {
                    reindexed[idx - 1] = newState[idx];
                } else {
                    reindexed[idx] = newState[idx];
                }
            });
            return reindexed;
        });
    };

    // Lấy selectedEnergyView cho năm cụ thể
    const getSelectedEnergyView = (yearIndex: number): EnergySourceType | '' => {
        return selectedEnergyViewByYear[yearIndex] || '';
    };

    // Set selectedEnergyView cho năm cụ thể
    const setSelectedEnergyView = (yearIndex: number, value: EnergySourceType | '') => {
        setSelectedEnergyViewByYear((prev) => ({
            ...prev,
            [yearIndex]: value,
        }));
    };

    // Lấy danh sách nguồn năng lượng đã chọn trong năm hiện tại
    const getSelectedSources = (yearIndex: number): EnergySourceType[] => {
        const sources: EnergySourceType[] = [];
        if (watch(`producedElectricity.${yearIndex}.solar.isSelected`)) sources.push('solar');
        if (watch(`producedElectricity.${yearIndex}.wind.isSelected`)) sources.push('wind');
        if (watch(`producedElectricity.${yearIndex}.geothermal.isSelected`)) sources.push('geothermal');
        return sources;
    };

    // Lấy label của nguồn năng lượng
    const getSourceLabel = (source: EnergySourceType): string => {
        return ENERGY_SOURCE_OPTIONS.find((opt) => opt.value === source)?.label || source;
    };

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Nguồn năng lượng tái tạo sản xuất</span>
                <button
                    type="button"
                    onClick={handleAddYear}
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    + Thêm năm
                </button>
            </div>

            {yearFields.length === 0 && (
                <p className="text-gray-500">Chưa có dữ liệu năng lượng tái tạo. Nhấn "Thêm năm" để bắt đầu.</p>
            )}

            {yearFields.map((yearField, yearIndex) => {
                const selectedSources = getSelectedSources(yearIndex);
                const currentSelectedView = getSelectedEnergyView(yearIndex);
                const isDropdownOpen = openDropdownIndex === yearIndex;

                return (
                    <div key={yearField.id} className="rounded-lg border bg-white p-6">
                        {/* Header: Năm và nút xóa */}
                        <div className="mb-4 flex items-center justify-between">
                            <DropdownPickerYear
                                value={watch(`producedElectricity.${yearIndex}.year`)}
                                onSelected={(val) => setValue(`producedElectricity.${yearIndex}.year`, val)}
                            />

                            <button
                                type="button"
                                onClick={() => handleRemoveYear(yearIndex)}
                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                            >
                                Xóa năm
                            </button>
                        </div>

                        {/* Checkbox chọn nguồn năng lượng */}
                        <div className="mb-4">
                            <span className="font-semibold">Chọn nguồn năng lượng:</span>
                            <div className="mt-2 flex flex-wrap gap-4">
                                {ENERGY_SOURCE_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 rounded-md border bg-gray-50 px-4 py-2 hover:bg-gray-100"
                                    >
                                        <input
                                            type="checkbox"
                                            {...register(`producedElectricity.${yearIndex}.${option.value}.isSelected`)}
                                            className="h-4 w-4"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Dropdown chọn nguồn để xem chi tiết */}
                        <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#D9D9D9] p-4">
                            {selectedSources.length === 0 ? (
                                <p className="text-gray-500">Vui lòng chọn ít nhất 1 nguồn năng lượng</p>
                            ) : (
                                <>
                                    <div
                                        className="relative inline-block text-left"
                                        ref={isDropdownOpen ? menuRef : null}
                                    >
                                        <button
                                            type="button"
                                            className="flex w-[300px] justify-center rounded-lg bg-white px-4 py-2 font-bold text-black hover:bg-[#119C59] hover:text-white"
                                            onClick={() => setOpenDropdownIndex(isDropdownOpen ? null : yearIndex)}
                                        >
                                            {currentSelectedView
                                                ? getSourceLabel(currentSelectedView)
                                                : 'Chọn nguồn năng lượng để nhập'}
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute z-50 mt-2 w-[300px] rounded-2xl bg-white py-2 shadow-lg">
                                                {selectedSources.map((source) => (
                                                    <button
                                                        key={source}
                                                        type="button"
                                                        className={`w-full px-4 py-2 text-left hover:bg-[#119C59] hover:text-white ${
                                                            currentSelectedView === source
                                                                ? 'bg-[#119C59] text-white'
                                                                : ''
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedEnergyView(yearIndex, source);
                                                            setOpenDropdownIndex(null);
                                                        }}
                                                    >
                                                        {getSourceLabel(source)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Solar Form */}
                                    {currentSelectedView === 'solar' &&
                                        watch(`producedElectricity.${yearIndex}.solar.isSelected`) && (
                                            <div className="mt-4 flex w-full max-w-md flex-col gap-3">
                                                <h4 className="font-bold">☀️ Điện mặt trời (Solar PV)</h4>
                                                <div className="flex items-center justify-between">
                                                    <span>Diện tích lắp đặt</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.solar.installedArea`}
                                                        placeholder="m²"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Công suất lắp đặt</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.solar.installedCapacity`}
                                                        placeholder="kWp"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Hiệu suất trung bình của hệ thống</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.solar.averageEfficiency`}
                                                        placeholder="%"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Số giờ nắng trung bình/ năm</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.solar.averageSunHoursPerYear`}
                                                        placeholder="giờ/năm"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Tổn thất hệ thống</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.solar.systemLosses`}
                                                        placeholder="%"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                    {/* Wind Form */}
                                    {currentSelectedView === 'wind' &&
                                        watch(`producedElectricity.${yearIndex}.wind.isSelected`) && (
                                            <div className="mt-4 flex w-full max-w-md flex-col gap-3">
                                                <h4 className="font-bold">💨 Điện gió (Wind)</h4>
                                                <div className="flex items-center justify-between">
                                                    <span>Số lượng turbine gió</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.wind.turbineCount`}
                                                        placeholder="Cái"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Công suất mỗi turbine</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.wind.turbineCapacity`}
                                                        placeholder="kW"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Vận tốc gió trung bình khu vực</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.wind.averageWindSpeed`}
                                                        placeholder="m/s"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Thời gian vận hành</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.wind.operatingHoursPerYear`}
                                                        placeholder="giờ/năm"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Hệ số công suất</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.wind.capacityFactor`}
                                                        placeholder="%"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                    {/* Geothermal Form */}
                                    {currentSelectedView === 'geothermal' &&
                                        watch(`producedElectricity.${yearIndex}.geothermal.isSelected`) && (
                                            <div className="mt-4 flex w-full max-w-md flex-col gap-3">
                                                <h4 className="font-bold">🌋 Địa nhiệt (Geothermal)</h4>
                                                <div className="flex items-center justify-between">
                                                    <span>Công suất lắp đặt</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.geothermal.installedCapacity`}
                                                        placeholder="kW"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Nhiệt độ nguồn địa nhiệt</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.geothermal.sourceTemperature`}
                                                        placeholder="°C"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Thời gian vận hành</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.geothermal.operatingHoursPerYear`}
                                                        placeholder="giờ/năm"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Hiệu suất hệ thống (COP)</span>
                                                    <InputField
                                                        name={`producedElectricity.${yearIndex}.geothermal.systemCOP`}
                                                        placeholder="COP"
                                                        className="!w-[120px]"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default EnergyProduction;
