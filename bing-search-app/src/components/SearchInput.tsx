import React from 'react';

interface CustomSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const CustomSearchInput = React.forwardRef<HTMLInputElement, CustomSearchInputProps>(
    ({ value, onChange, placeholder = "Search..." }, ref) => {
        return (
            <input
                ref={ref}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="form-control"
            />
        );
    }
);

export default CustomSearchInput;
