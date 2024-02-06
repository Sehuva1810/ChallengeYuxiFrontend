import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSearchInput from "../components/SearchInput";

describe('CustomSearchInput', () => {
    it('renders correctly with given placeholder', () => {
        render(<CustomSearchInput value="" onChange={() => {}} placeholder="Type here..." />);
        const inputElement = screen.getByPlaceholderText("Type here...");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass("form-control");
    });

    it('calls onChange handler with the new value on change', () => {
        const handleChange = jest.fn();
        render(<CustomSearchInput value="" onChange={handleChange} placeholder="Search..." />);
        const inputElement = screen.getByPlaceholderText("Search...");
        fireEvent.change(inputElement, { target: { value: 'new query' } });
        expect(handleChange).toHaveBeenCalledWith('new query');
    });

    it('forwards the ref to the underlying input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<CustomSearchInput ref={ref} value="" onChange={() => {}} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
