import { InputHTMLAttributes, JSX, Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export interface FormControls {
	name: string;
	label: string;
	placeholder?: string;
	componentType: 'input' | 'select' | 'textarea';
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	id?: string;
	options?: { id: string; label: string }[];
}

export interface CommonFormProps<T> {
	formControls: FormControls[];
	formData: T;
	// use the React setter type
	setFormData: Dispatch<SetStateAction<T>>;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	buttonText?: string;
	isBtnDisabled?: boolean;
}

export default function CommonForm<T>({
	formControls,
	formData,
	setFormData,
	onSubmit,
	buttonText,
	isBtnDisabled,
}: CommonFormProps<T>) {
	const renderInputsByComponentType = (ctrl: FormControls): JSX.Element => {
		// cast so TS lets us index into T
		const key = ctrl.name as keyof T;
		const value = (formData[key] ?? '') as unknown as string;

		const update = (newVal: string) => {
			setFormData({
				...formData,
				[ctrl.name]: newVal,
			} as unknown as T);
		};

		switch (ctrl.componentType) {
			case 'input':
				return (
					<Input
						name={ctrl.name}
						placeholder={ctrl.placeholder}
						id={ctrl.name}
						type={ctrl.type}
						value={value}
						onChange={(e) => update(e.target.value)}
					/>
				);

			case 'select':
				return (
					<Select value={value} onValueChange={(v) => update(v)}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={ctrl.label} />
						</SelectTrigger>
						<SelectContent>
							{ctrl.options?.map((opt) => (
								<SelectItem key={opt.id} value={opt.id}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);

			case 'textarea':
				return (
					<Textarea
						name={ctrl.name}
						placeholder={ctrl.placeholder}
						id={ctrl.id}
						value={value}
						onChange={(e) => update(e.target.value)}
					/>
				);

			default:
				return (
					<Input
						name={ctrl.name}
						placeholder={ctrl.placeholder}
						id={ctrl.name}
						type={ctrl.type}
						value={value}
						onChange={(e) => update(e.target.value)}
					/>
				);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='flex flex-col gap-5'>
				{formControls.map((ctrl) => (
					<div className='grid w-full gap-1.5' key={ctrl.name}>
						<Label className='mb-1'>{ctrl.label}</Label>
						{renderInputsByComponentType(ctrl)}
					</div>
				))}
			</div>
			<Button
				disabled={isBtnDisabled}
				type='submit'
				className='mt-2 w-full cursor-pointer hover:bg-amber-600'
			>
				{buttonText || 'Submit'}
			</Button>
		</form>
	);
}
