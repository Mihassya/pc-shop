import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import type { RootState } from '@/app/store/store'
import { clearCart, deleteItem } from '@/entities/cart/model/cartSlice'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/shared/ui/dialog'
import { CheckoutForm } from '@/features/checkout/ui/CheckoutForm'
import type { CheckoutFormData } from '@/features/checkout/model/checkoutSchema'

export const CartPage = () => {
	const cartItems = useSelector((state: RootState) => state.cart.items)
	const dispatch = useDispatch()

	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
	const [isSuccessOpen, setIsSuccessOpen] = useState(false)

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

	const handleFormSubmitSuccess = (data: CheckoutFormData) => {
		console.log('Данные заказа:', data, 'Товары:', cartItems)
		setIsCheckoutOpen(false)
		setIsSuccessOpen(true)
		dispatch(clearCart())
	}

	if (cartItems.length === 0 && !isSuccessOpen) {
		return (
			<div className='max-w-4xl mx-auto py-12 text-center text-white'>
				<h2 className='text-2xl font-bold mb-4'>Ваша корзина пуста</h2>
				<p className='text-zinc-400 mb-6'>Добавьте нужные комплектующие из каталога</p>
				<Link to='/catalog'>
					<Button>Перейти в каталог</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto py-8 px-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-white'>Корзина</h1>
				<Button
					variant='ghost'
					className='text-red-400 hover:text-red-300 hover:bg-red-500/10'
					onClick={() => dispatch(clearCart())}
				>
					Очистить корзину
				</Button>
			</div>

			<div className='space-y-4 mb-8'>
				{cartItems.map(item => (
					<div
						key={item.id}
						className='flex items-center p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl gap-4'
					>
						<img
							src={item.image}
							alt={item.name}
							className='w-20 h-20 object-contain rounded-xl bg-[#09090b]'
						/>

						<div className='flex-1'>
							<Link
								to={`/product/${item.id}`}
								className='text-lg font-semibold text-zinc-100 hover:text-[#01CD1D] transition block'
							>
								{item.name}
							</Link>
							<span className='text-sm text-zinc-500 uppercase tracking-wider font-semibold'>
								{item.category}
							</span>
						</div>

						<div className='text-xl font-bold w-32 text-right text-white'>
							{(item.price * item.quantity).toLocaleString('ru-RU')} ₽
						</div>

						<Button
							variant='destructive'
							className='ml-2'
							onClick={() => dispatch(deleteItem(item.id))}
						>
							Удалить
						</Button>
					</div>
				))}
			</div>

			<div className='flex justify-between items-center p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl'>
				<div>
					<span className='text-sm text-zinc-400'>Итого:</span>
					<div className='text-2xl font-bold text-white'>
						{totalPrice.toLocaleString('ru-RU')} ₽
					</div>
				</div>
				<Button size='lg' onClick={() => setIsCheckoutOpen(true)}>
					Оформить заказ
				</Button>
			</div>

			{/* Диалог формы оформления */}
			<Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
				<DialogContent className='sm:max-w-[500px] bg-[#09090b] border-zinc-800 text-white'>
					<DialogHeader>
						<DialogTitle className='text-white'>Оформление заказа</DialogTitle>
						<DialogDescription className='text-zinc-400'>
							Заполните контактные данные для доставки заказа.
						</DialogDescription>
					</DialogHeader>
					<CheckoutForm totalPrice={totalPrice} onSubmitSuccess={handleFormSubmitSuccess} />
				</DialogContent>
			</Dialog>

			{/* Диалог успешного оформления */}
			<Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
				<DialogContent className='sm:max-w-[400px] text-center bg-[#09090b] border-zinc-800'>
					<DialogHeader>
						<DialogTitle className='text-xl text-[#01CD1D] drop-shadow-[0_0_8px_rgba(1,205,29,0.5)]'>
							Заказ успешно оформлен! 🎉
						</DialogTitle>
						<DialogDescription className='pt-2 text-zinc-300'>
							Спасибо за покупку. Мы свяжемся с вами в ближайшее время для подтверждения.
						</DialogDescription>
					</DialogHeader>
					<div className='pt-4'>
						<Link to='/'>
							<Button className='w-full' onClick={() => setIsSuccessOpen(false)}>
								Вернуться на главную
							</Button>
						</Link>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
