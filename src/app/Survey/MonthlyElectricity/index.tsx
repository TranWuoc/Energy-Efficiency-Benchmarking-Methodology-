import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import EnergyProduction from '../../../components/EnergyType/EnergyProduction';
import EnergyConsumption from '../../../components/EnergyType/EnergyConsumption';
import { useGetMonthlyElectricitySchema } from './useSchema';
import type { FormMonthlyElectricity } from './type';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../../../contexts/SurveyContext';

function MonthlyElectricity() {
    const [activeTab, setActiveTab] = useState('consumed');
    const navigate = useNavigate();
    const { updateMonthlyElectricity, surveyData, submitAllData, isComplete } = useSurvey();
    const schema = useGetMonthlyElectricitySchema();
    const methods = useForm<FormMonthlyElectricity>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormMonthlyElectricity>),
        defaultValues: surveyData.monthlyElectricity,
    });

    const onSubmit = async (data: FormMonthlyElectricity) => {
        console.log(data);
        updateMonthlyElectricity(data);
    };
    const handleSubmit = async () => {
        const isValid = await methods.trigger();
        if (!isValid) return;

        const currentData = methods.getValues();
        updateMonthlyElectricity(currentData);

        await submitAllData();

        console.log();
    };

    return (
        <div className=" mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col items-center justify-center">
                <span className="flex justify-center text-3xl font-bold uppercase">
                    III. Năng lượng điện hàng tháng
                </span>
                <div className="rounded-4xl mt-10 flex h-[70px] w-[500px] bg-[white] px-[10px] py-[10px] ">
                    <button
                        className={`rounded-l-4xl flex-1 py-2 text-center text-[20px] ${
                            activeTab === 'consumed'
                                ? 'bg-[#119C59] font-bold text-white'
                                : 'hover:bg-[#119C59] hover:text-[white]'
                        }`}
                        onClick={() => setActiveTab('consumed')}
                    >
                        Năng lượng tiêu thụ
                    </button>
                    <div className="mx-[3px] w-0.5 bg-[black]"></div>
                    <button
                        className={`rounded-r-4xl flex-1 py-2 text-center text-[20px] ${
                            activeTab === 'produced'
                                ? 'bg-[#119C59] font-bold text-white'
                                : 'hover:bg-[#119C59] hover:text-[white]'
                        }`}
                        onClick={() => setActiveTab('produced')}
                    >
                        Năng lượng sản xuất
                    </button>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-[20px] flex flex-col gap-[20px]">
                        {activeTab === 'consumed' && <EnergyConsumption />}
                        {activeTab === 'produced' && <EnergyProduction />}
                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/home/operator')}
                                className="rounded border border-gray-400 px-6 py-3 hover:bg-gray-100"
                            >
                                ← Quay lại
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                            >
                                ✓ Hoàn thành & Gửi
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default MonthlyElectricity;
