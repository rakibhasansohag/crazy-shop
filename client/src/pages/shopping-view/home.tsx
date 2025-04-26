import { useEffect, useState } from 'react';
import {
	Airplay,
	BabyIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CloudLightning,
	Heater,
	Images,
	Shirt,
	ShirtIcon,
	ShoppingBasket,
	UmbrellaIcon,
	WashingMachine,
	WatchIcon,
} from 'lucide-react';

import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

export const CategoriesWithIcon = [
	{ id: 'men', label: 'Men', icon: ShirtIcon },
	{ id: 'women', label: 'Women', icon: CloudLightning },
	{ id: 'kids', label: 'Kids', icon: BabyIcon },
	{ id: 'accessories', label: 'Accessories', icon: WatchIcon },
	{ id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

export const BrandsWithIcon = [
	{ id: 'nike', label: 'Nike', icon: Shirt },
	{ id: 'adidas', label: 'Adidas', icon: WashingMachine },
	{ id: 'puma', label: 'Puma', icon: ShoppingBasket },
	{ id: 'levi', label: "Levi's", icon: Airplay },
	{ id: 'zara', label: 'Zara', icon: Images },
	{ id: 'h&m', label: 'H&M', icon: Heater },
];

const ShoppingHome = () => {
	const slides = [bannerOne, bannerTwo, bannerThree];
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
		}, 5000);

		return () => {
			clearInterval(timer);
		};
	}, [slides.length]);

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='relative w-full h-[600px] overflow-hidden '>
				{slides.map((slide, index) => (
					<img
						src={slide}
						key={index}
						className={` ${
							index === currentSlide ? 'opacity-100' : 'opacity-0'
						} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
						alt={`banner-${index + 1}`}
					/>
				))}
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide(
							(prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
						)
					}
					className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
				>
					<ChevronLeftIcon className='w-4 h-4' />
				</Button>
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
					}
					className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
				>
					<ChevronRightIcon className='w-4 h-4' />
				</Button>
			</div>
			<section className='py-12 bg-gray-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Shop By Category
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
						{CategoriesWithIcon.map((categoryItem) => (
							<Card
								onClick={() =>
									console.log('category clicked', categoryItem.label)
								}
								className='cursor-pointer hover:shadow-lg transition-shadow'
							>
								<CardContent className='flex flex-col items-center justify-center p-6'>
									<categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
									<span className='font-bold'>{categoryItem.label}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ShoppingHome;
