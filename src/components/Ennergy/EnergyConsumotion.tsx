import DropdownPickerYear from '../DropdownComponenets/DropdownYear';

function EnergyConsumption({ methods }: any) {
    const year = methods.watch('year') || '';
    const sourceType = methods.watch('sourceType') || '';

    return (
        <div className=" flex flex-col items-center gap-3">
            <DropdownPickerYear onSelected={(val) => methods.setValue('year', val)} value={year} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="border-r px-6 py-3">
                                Tháng
                            </th>
                            <th scope="col" className="border-r px-6 py-3">
                                Điện năng tiêu thụ (kWh)
                            </th>
                            <th scope="col" className="border-b px-6 py-3" colSpan={2} style={{ textAlign: 'center' }}>
                                Nguồn dữ liệu
                            </th>
                        </tr>
                        <tr>
                            <th className="border-r"></th>
                            <th className="border-r"></th>
                            <th className=" w-[250px] border-r px-6 py-3">
                                <div className="flex flex-col">
                                    <span className=" flex items-center justify-center">Hoá đơn điện hàng tháng</span>
                                    <input
                                        readOnly
                                        type="radio"
                                        value="bill"
                                        {...methods.register('sourceType')}
                                        checked={sourceType === 'bill'}
                                        onChange={() => methods.setValue('sourceType', 'bill')}
                                    />
                                </div>
                            </th>
                            <th className=" px-4 py-3">
                                <div className=" flex flex-col ">
                                    <span className=" flex items-center justify-center">
                                        Công tơ điện/ Báo cáo kiểm toán
                                    </span>
                                    <input
                                        readOnly
                                        type="radio"
                                        value="meter"
                                        {...methods.register('sourceType')}
                                        checked={sourceType === 'meter'}
                                        onChange={() => methods.setValue('sourceType', 'meter')}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 12 }, (_, i) => (
                            <tr key={i} className="border-b bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                                <th
                                    scope="row"
                                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    Tháng {i + 1}
                                </th>
                                <td className="border-r px-6 py-4">
                                    <input
                                        type="number"
                                        placeholder="Nhập số liệu"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-400 focus:outline-none"
                                        {...methods.register(`consumptionMonth${i + 1}`)}
                                    />
                                </td>
                                <td className="border-r px-6 py-4">
                                    <input
                                        type="number"
                                        placeholder="Nhập số liệu"
                                        className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-400 focus:outline-none ${sourceType === 'bill' ? '' : 'cursor-not-allowed opacity-50'}`}
                                        {...methods.register(`billMonth${i + 1}`)}
                                        disabled={sourceType !== 'bill'}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        placeholder="Nhập số liệu"
                                        className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-400 focus:outline-none ${sourceType === 'meter' ? '' : 'cursor-not-allowed opacity-50'}`}
                                        {...methods.register(`meterMonth${i + 1}`)}
                                        disabled={sourceType !== 'meter'}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EnergyConsumption;
