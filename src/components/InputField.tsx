import { Controller, useFormContext } from 'react-hook-form';
import Input from './Input';

type InputFieldProps = {
    name: string;
    component?: React.ComponentType<any>;
    [key: string]: any;
};

function InputField({ name, component: Componenet = Input, ...rest }: InputFieldProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const messageError = (errors[name]?.message as string) || '';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col">
                    <Componenet
                        {...field}
                        {...rest}
                        value={field.value ?? ''}
                        selected={field.value || []}
                        onChange={field.onChange}
                        className={`${rest.className}`}
                    />
                    <p style={{ color: 'red' }}>{messageError}</p>
                </div>
            )}
        ></Controller>
    );
}

export default InputField;
