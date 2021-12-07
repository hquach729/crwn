import React, { InputHTMLAttributes } from 'react';
import './form-input.styles.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: React.ReactNode;
}

export const FormInput = ({
	handleChange,
	label,
	...otherInputProps
}: FormInputProps) => (
	<div className='group'>
		<input
			className='form-input'
			onChange={handleChange}
			{...otherInputProps}
		/>
		{label ? (
			<label
				className={`${
					otherInputProps.value?.toString().length ? 'shrink' : ''
				} form-input-label`}
			>
				{label}
			</label>
		) : null}
	</div>
);

export default FormInput;
