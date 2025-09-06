import { useState, useRef, useEffect } from 'react';
import Input from '../Input';

interface Option {
    label: string;
    value: string;
}

interface DropdownPickerTimeProps {
    value: string;
    onChange: (val: string) => void;
}

const options: Option[] = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const label = `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : minute}`;
    return { label, value: label };
});

function DropdownPickerTime({ value, onChange }: DropdownPickerTimeProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    console.log(menuRef);

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
            <div className="relative flex flex-row items-center">
                <Input
                    readOnly
                    value={value}
                    placeholder=""
                    onClick={() => setOpen((prev) => !prev)}
                    className="!w-[70px]"
                />
                <img src="/timeLogo.svg" className="absolute right-0 h-[19px] w-[19px]" />
            </div>
            {open && (
                <div className="absolute z-50 mt-2 rounded-md bg-white shadow-lg">
                    <div className=" scrollbar-hidden h-[300px] overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
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

export default DropdownPickerTime;
