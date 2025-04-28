'use client';

import { useEffect, useState, FormEvent } from 'react';
import CommonForm from '../common/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewAddress,
	deleteAddress,
	editAddress,
	fetchAllAddresses,
	AddressItem,
} from '@/store/shop/address-slice';

import { AppDispatch, RootState } from '@/store/store';
import { toast } from 'sonner';
import AddressCard from './address-cart';

export interface AddressProps {
	setCurrentSelectedAddress: (address: AddressItem) => void;
	selectedId: AddressItem | null;
}

export interface AddressFormData {
	address: string;
	city: string;
	phone: string;
	pincode: string;
	notes: string;
}

const initialAddressFormData: AddressFormData = {
	address: '',
	city: '',
	phone: '',
	pincode: '',
	notes: '',
};

const Address = ({ setCurrentSelectedAddress, selectedId }: AddressProps) => {
	const [formData, setFormData] = useState<AddressFormData>(
		initialAddressFormData,
	);
	const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

	const dispatch = useDispatch<AppDispatch>();
	const userId = useSelector((s: RootState) => s.auth.user?.id);
	const addressList = useSelector((s: RootState) => s.shopAddress.addressList);

	// form validation
	const isFormValid = () =>
		Object.values(formData).every((v) => v.trim() !== '');

	// load on mount & when userId changes
	useEffect(() => {
		if (userId) dispatch(fetchAllAddresses(userId));
	}, [dispatch, userId]);

	const handleManageAddress = (e: FormEvent) => {
		e.preventDefault();

		if (!userId) return toast.error('You must be logged in');
		if (!currentEditedId && addressList.length >= 3) {
			setFormData(initialAddressFormData);
			return toast.error('You can add max 3 addresses');
		}

		if (currentEditedId) {
			dispatch(
				editAddress({
					userId,
					addressId: currentEditedId,
					formData: {
						address: formData.address,
						city: formData.city,
						phone: formData.phone,
						pincode: formData.pincode,
						notes: formData.notes,
					},
				}),
			)
				.unwrap()
				.then((res) => {
					if (res.success) {
						toast.success('Address updated');
						setFormData(initialAddressFormData);
						setCurrentEditedId(null);
					}
				})
				.catch((error) => {
					console.log('Address update error', error);
					toast.error(`Edit failed with error: ${error || 'unknown'}`);
				});
		} else {
			dispatch(
				addNewAddress({
					userId,
					address: formData.address,
					city: formData.city,
					phone: formData.phone,
					pincode: formData.pincode,
					notes: formData.notes,
				}),
			)
				.unwrap()
				.then((res) => {
					if (res.success) {
						toast.success('Address added');
						setFormData(initialAddressFormData);
					}
				})
				.catch((error) => {
					console.log('Address add error:', error);
					toast.error(`Add failed with error: ${error || "unknown"}`);
				});
		}
	};

	const handleDeleteAddress = (address: AddressItem) => {
		if (!userId) return;
		dispatch(deleteAddress({ userId, addressId: address._id }))
			.unwrap()
			.then((res) => {
				if (res.success) toast.success('Address deleted');
			});
	};

	const handleEditAddress = (address: AddressItem) => {
		setCurrentEditedId(address._id);
		setFormData({
			address: address.address,
			city: address.city,
			phone: address.phone,
			pincode: address.pincode,
			notes: address.notes,
		});
	};

	return (
		<Card>
			<div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
				{addressList.map((addr) => (
					<AddressCard
						key={addr._id}
						addressInfo={addr}
						selectedId={selectedId}
						setCurrentSelectedAddress={setCurrentSelectedAddress}
						handleEditAddress={handleEditAddress}
						handleDeleteAddress={handleDeleteAddress}
					/>
				))}
			</div>
			<CardHeader>
				<CardTitle>
					{currentEditedId ? 'Edit Address' : 'Add New Address'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				<CommonForm
					formControls={addressFormControls}
					formData={formData}
					setFormData={setFormData}
					buttonText={currentEditedId ? 'Edit' : 'Add'}
					onSubmit={handleManageAddress}
					isBtnDisabled={!isFormValid()}
				/>
			</CardContent>
		</Card>
	);
};

export default Address;
