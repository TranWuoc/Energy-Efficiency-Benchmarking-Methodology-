import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useCreateBuilding } from '../../../api/buildings/buidlings.api';
import type { Building } from '../../../api/buildings/building.type';
import { getEPByBuildingId } from '../../../api/EP/ep.api';
import { useSurvey } from '../../../contexts/SurveyContext';
import { toastAction, toastError } from '../../../utils/toast';
import EnergyConsumption from './EnergyType/EnergyConsumption';
import EnergyProduction from './EnergyType/EnergyProduction';
import type { FormMonthlyElectricity } from './type';
import { useGetMonthlyElectricitySchema } from './useSchema';

function MonthlyElectricity() {
    const [activeTab, setActiveTab] = useState('consumed');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { updateMonthlyElectricity, surveyData } = useSurvey();
    const schema = useGetMonthlyElectricitySchema();
    const methods = useForm<FormMonthlyElectricity>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormMonthlyElectricity>),
        defaultValues: surveyData.monthlyElectricity,
    });

    const createBuilding = useCreateBuilding();

    const onSubmit = async (data: FormMonthlyElectricity) => {
        console.log(data);
        updateMonthlyElectricity(data);
    };
    const handleSubmit = async () => {
        const isValid = await methods.trigger();
        if (!isValid) return;

        const currentData = methods.getValues();
        updateMonthlyElectricity(currentData);

        const allData = {
            generalInfo: surveyData.generalInformation,
            operation: surveyData.operatorBuilding,
            consumedElectricity: currentData.consumedElectricity || [],
            producedElectricity: currentData.producedElectricity || [],
        } as Omit<Building, 'buildingId'>;

        const toastId = toast.loading('Đang gửi khảo sát...', {
            position: 'top-right',
        });

        try {
            const result = await createBuilding.mutateAsync(allData);
            console.log('🚀 ~ handleSubmit ~ result:', result);
            toastAction('Gửi khảo sát thành công!', {
                label: 'Xem chỉ số EP',
                onClick: () => getEPByBuildingId(result.building.buildingId),
            });
        } catch (error) {
            toastError('Gửi khảo sát thất bại. Vui lòng thử lại.');
            console.error('Lỗi khi tạo building:', error);
        }
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
                                disabled={isSubmitting}
                                className="flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="h-5 w-5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        <span>Đang gửi...</span>
                                    </>
                                ) : (
                                    'Xem chỉ số năng lượng toà nhà →'
                                )}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default MonthlyElectricity;
