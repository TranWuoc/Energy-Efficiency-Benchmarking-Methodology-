import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import EnergyConsumption from '../../components/EnergyType/EnergyConsumotion';
import EnergyProduction from '../../components/EnergyType/EnergyProduction';

const schema = yup.object({});

type FormData = yup.InferType<typeof schema>;

function MonthlyElectricity() {
    const [activeTab, setActiveTab] = useState('consumed');
    const methods = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
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
                        {activeTab === 'consumed' && <EnergyConsumption methods={methods} />}
                        {activeTab === 'produced' && <EnergyProduction methods={methods} />}
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default MonthlyElectricity;
