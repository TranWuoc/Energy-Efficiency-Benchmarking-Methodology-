import { useState, useRef, useEffect } from 'react';
import Input from '../Input';

interface Option {
    label: string;
    value: string;
}

interface DropdownPickerTimeProps {
    value: string | null | undefined;
    onSelected: (val: string | null) => void;
    placeholder?: string;
}

// Tạo danh sách giờ từ 00:00 đến 23:45 (interval 15 phút)
const options: Option[] = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return { label, value: label };
});

function DropdownPickerTime({ value, onSelected, placeholder = 'HH:mm' }: DropdownPickerTimeProps) {
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

    // Xử lý clear value
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelected(null);
    };

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div className="relative flex flex-row items-center">
                <Input
                    readOnly
                    value={value || ''}
                    placeholder={placeholder}
                    onClick={() => setOpen((prev) => !prev)}
                    className="!w-[90px] cursor-pointer"
                />
                {value ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-gray-300 text-xs hover:bg-gray-400"
                    >
                        ✕
                    </button>
                ) : (
                    <img src="/timeLogo.svg" className="pointer-events-none absolute right-1 h-[19px] w-[19px]" />
                )}
            </div>

            {open && (
                <div className="absolute z-50 mt-2 rounded-md bg-white shadow-lg">
                    <div className="scrollbar-hidden h-[300px] overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onSelected(opt.value);
                                    setOpen(false);
                                }}
                                className={`flex h-[40px] w-[100px] items-center justify-center rounded-md hover:bg-[#94DD8B] ${
                                    value === opt.value ? 'bg-[#119C59] text-white' : ''
                                }`}
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
