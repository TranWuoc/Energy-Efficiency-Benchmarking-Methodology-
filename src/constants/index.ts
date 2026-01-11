import type { DropdownOption } from '../components/DropdownComponent/DropdownItems';

// Loại tòa nhà
export const BUILDING_TYPE_OPTIONS: DropdownOption<number>[] = [
    { label: 'Văn phòng công sở nhà nước', value: 1 },
    { label: 'Văn phòng thương mại', value: 2 },
];

// Mức độ sử dụng
export const UTILISATION_LEVEL_OPTIONS: DropdownOption<string>[] = [
    { label: 'Thấp (< 30%)', value: 'Thấp' },
    { label: 'Trung bình (30-70%)', value: 'Trung bình' },
    { label: 'Cao (> 70%)', value: 'Cao' },
];

// Loại kiểm soát hệ thống
export const CONTROL_SYSTEM_OPTIONS: DropdownOption<string>[] = [
    { label: 'Thủ công', value: 'manual' },
    { label: 'Bán tự động', value: 'semi-auto' },
    { label: 'Tự động hoàn toàn (BMS)', value: 'full-auto' },
];

// Năm vận hành (từ 1990 đến hiện tại)
export const YEAR_OPTIONS: DropdownOption<number>[] = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => ({
        label: `${1990 + i}`,
        value: 1990 + i,
    }),
).reverse();
