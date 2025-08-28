import { useState, useRef, useEffect } from 'react';
import Input from '../Input';

interface Option {
    label: string;
    value: string;
}

interface DropdownItemsProps {
    value: string;
    onChange: (val: string) => void;
}

const options: Option[] = [
    { label: ' Văn phòng công sở nhà nước ', value: ' Văn phòng công sở nhà nước ' },
    { label: ' Văn phòng thương mại ', value: ' Văn phòng thương mại ' },
];

function DropdownItems({ value, onChange }: DropdownItemsProps) {
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
            <div className="relative flex flex-row items-center">
                <Input
                    readOnly
                    value={value}
                    placeholder=" 4. Loại tòa nhà/ chức năng tòa nhà"
                    onClick={() => setOpen((prev) => !prev)}
                />
                <img src="/arrowDown.svg" className="absolute right-0 h-[20px] w-[20px]" />
            </div>
            {open && (
                <div className="absolute z-50 mt-2 rounded-md bg-white shadow-lg">
                    <div className=" ">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className="h-[50px] w-[300px] rounded-md hover:bg-[#94DD8B]"
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

export default DropdownItems;
