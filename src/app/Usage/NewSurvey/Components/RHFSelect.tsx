import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Option = { label: string; value: string | number };

type Props = Omit<SelectProps, 'name'> & {
    name: string;
    label: string;
    options: Option[];
};

export default function RHFSelect({ name, label, options, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name as any}
            control={control}
            render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>{label}</InputLabel>
                    <Select {...field} label={label} value={field.value ?? ''} {...other}>
                        {options.map((opt) => (
                            <MenuItem key={`${opt.value}`} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
}
