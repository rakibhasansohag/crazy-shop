import { CartItem } from '../../store/shop/cart-slice';

const UserCartItemsContent = ({ cartItem }: { cartItem: CartItem }) => {
	console.log(cartItem);

	return <div>usercatr contens</div>;
};

export default UserCartItemsContent;
