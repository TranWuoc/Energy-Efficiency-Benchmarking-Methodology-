import { Checkbox, FormControlLabel, type FormControlLabelProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = Omit<FormControlLabelProps, 'control' | 'labelPlacement'> & {
    name: string;
    fontWeight?: number | string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
};

export default function RHFCheckbox({ name, label, fontWeight, labelPlacement = 'end', ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name as any}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                    label={<span style={fontWeight ? { fontWeight } : undefined}>{label}</span>}
                    labelPlacement={labelPlacement}
                    {...other}
                />
            )}
        />
    );
}
