import { useState, useRef, useEffect } from 'react';

interface Option {
    label: string;
    value: string;
}

interface DropdownPickerYearProps {
    value: string;
    onSelected: (val: string) => void;
}

const options: Option[] = Array.from({ length: 3 }, (_, i) => {
    const year = 2023 + i;
    const label = `Năm ${year}`;
    return { label, value: year.toString() };
});

function DropdownPickerYear({ value, onSelected }: DropdownPickerYearProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div className="flex flex-row items-center">
                <button
                    type="button"
                    value={value}
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex w-[150px] items-center rounded-md border border-gray-300 bg-[white] px-3 py-2 text-left hover:border-green-400 "
                >
                    <span>{value ? `Năm ${value}` : ' Chọn năm'}</span>
                    <img src="/calenderLogo.svg" className="absolute right-1 h-[19px] w-[19px]" />
                </button>
            </div>
            {open && (
                <div className="absolute z-50 mt-2 w-[100px] rounded-md bg-white shadow-lg">
                    <div className=" scrollbar-hidden h-[100px] overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onSelected(opt.value);
                                    setOpen(false);
                                }}
                                className="h-[50px] w-[100px] rounded-md hover:bg-[#94DD8B]"
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownPickerYear;
