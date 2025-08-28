function Input({ className, type, placeholder, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <>
            <input
                className={`h-[40px] w-[300px] border-b-2 border-[#14B86E] px-1  ${className ?? ''}`}
                placeholder={placeholder}
                type={type}
                {...props}
            />
        </>
    );
}

export default Input;
