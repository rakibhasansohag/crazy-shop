'use client';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { AddressItem } from '@/store/shop/address-slice';

interface AddressCardProps {
	addressInfo: AddressItem;
	handleEditAddress: (address: AddressItem) => void;
	handleDeleteAddress: (address: AddressItem) => void;
	setCurrentSelectedAddress: (address: AddressItem) => void;
	selectedId: AddressItem | null;
}

const AddressCard = ({
	addressInfo,
	handleEditAddress,
	handleDeleteAddress,
	setCurrentSelectedAddress,
	selectedId,
}: AddressCardProps) => (
	<Card
		onClick={() => setCurrentSelectedAddress(addressInfo)}
		className={`cursor-pointer ${
			selectedId?._id === addressInfo._id
				? 'border-red-900 border-[4px]'
				: 'border-black'
		}`}
	>
		<CardContent className='grid p-4 gap-4'>
			<Label>Address: {addressInfo.address}</Label>
			<Label>City: {addressInfo.city}</Label>
			<Label>Pincode: {addressInfo.pincode}</Label>
			<Label>Phone: {addressInfo.phone}</Label>
			<Label>Notes: {addressInfo.notes}</Label>
		</CardContent>
		<CardFooter className='p-3 flex justify-between'>
			<Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
			<Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
		</CardFooter>
	</Card>
);

export default AddressCard;
