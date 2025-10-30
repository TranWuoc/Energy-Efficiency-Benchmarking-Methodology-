import { useEffect, useRef, useState } from 'react';
import CheckboxGroup from '../CheckboxGroup';
import InputField from '../InputField';
import { useFormContext } from 'react-hook-form';

const options = [
    { label: '☀️ Điện mặt trời (Solar PV)', value: '☀️ Điện mặt trời (Solar PV)' },
    { label: '💨 Điện gió (Wind)', value: '💨 Điện gió (Wind)' },
    { label: '🌋 Địa nhiệt (Geothermal)', value: '🌋 Địa nhiệt (Geothermal)' },
];

function EnergyProduction() {
    const { watch } = useFormContext();
    const [selected, setSelected] = useState<string[]>([]);
    const [item, setItem] = useState('');
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const optionsEnergy = watch('energy') as [];

    return (
        <div className="flex w-full flex-col items-center gap-3 bg-[white] px-[30px] py-[30px]">
            <span className="font-bold">Nguồn năng lượng tái tạo</span>
            <div className="flex justify-around">
                <InputField
                    name="energy"
                    component={CheckboxGroup}
                    options={options}
                    selected={selected}
                    onChange={setSelected}
                />
            </div>
            <div className="flex h-[500px] w-[900px] flex-col items-center rounded-2xl bg-[#D9D9D9] px-[10px] py-[10px]">
                <div className=" relative inline-block justify-center text-left" ref={menuRef}>
                    <button
                        className=" flex w-[300px] justify-center  rounded-lg bg-[white] px-4 py-2 font-bold text-black hover:bg-[#119C59] hover:text-[white]"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {item || 'Chọn nguồn năng lượng'}
                    </button>
                    {open && (
                        <div className="absolute z-50 mt-2 rounded-2xl bg-white py-4 shadow-lg">
                            <div className="flex flex-col">
                                {(optionsEnergy || []).map((optionEnergy) => (
                                    <button
                                        key={optionEnergy}
                                        className={`px-4 py-2 text-left hover:bg-[#119C59] hover:text-white `}
                                        onClick={() => {
                                            setItem(optionEnergy);
                                            setOpen(false);
                                            console.log('Selected energy sources:', selected);
                                        }}
                                    >
                                        {optionEnergy}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {item === '☀️ Điện mặt trời (Solar PV)' && (
                    <div className="mt-10 flex flex-col">
                        <div className=" flex flex-row items-center justify-between">
                            <span> Diện tích lắp đặt</span>
                            <InputField name="installationArea" placeholder="m²" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Công suất lắp đặt</span>
                            <InputField name="installationCapacity" placeholder="kWp" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Hiệu suất trung bình của hệ thống </span>
                            <InputField name="systemEfficiency" placeholder="%" className="ml-[50px] !w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Số giờ nắng trung bình/ năm</span>
                            <InputField name="averageSunlightHours" placeholder="giờ/ năm" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between ">
                            <span>Tổn thất hệ thống </span>
                            <InputField name="systemLoss" placeholder="%" className="!w-[100px]" />
                        </div>
                    </div>
                )}
                {item === '💨 Điện gió (Wind)' && (
                    <div className="mt-10 flex flex-col">
                        <div className=" flex flex-row items-center justify-between">
                            <span>Số lượng turbine gió</span>
                            <InputField name="numberOfTurbines" placeholder="Cái" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Công suất mỗi turbine</span>
                            <InputField name="turbineCapacity" placeholder="kWp" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Vận tốc gió trung bình khu vực</span>
                            <InputField name="averageWindSpeed" placeholder="m/s" className="ml-[50px] !w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Thời gian vận hành</span>
                            <InputField name="operatingTimeTurbine" placeholder="giờ/ năm" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between ">
                            <span>Hệ số công suất</span>
                            <InputField name="powerCoefficientTTurbine" placeholder="%" className="!w-[100px]" />
                        </div>
                    </div>
                )}
                {item === '🌋 Địa nhiệt (Geothermal)' && (
                    <div className="mt-10 flex flex-col">
                        <div className=" flex flex-row items-center justify-between">
                            <span>Công suất lắp đặt </span>
                            <InputField
                                name="installationCapacityGeothermal"
                                placeholder="kWp"
                                className="!w-[100px]"
                            />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Nhiệt độ nguồn đại nhiệt</span>
                            <InputField
                                name="geothermalSourceTemperature"
                                placeholder="°C"
                                className="ml-[50px] !w-[100px]"
                            />
                        </div>
                        <div className=" flex flex-row items-center justify-between">
                            <span>Thời gian vận hành</span>
                            <InputField name="operatingTimeGeothermal" placeholder="giờ/ năm" className="!w-[100px]" />
                        </div>
                        <div className=" flex flex-row items-center justify-between ">
                            <span>Hiệu suất hệ thống (COP)</span>
                            <InputField name="systemEfficiencyGeothermal" placeholder="%" className="!w-[100px]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EnergyProduction;
