import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from '../model/checkoutSchema'
import { Button } from '@/shared/ui/button'

interface CheckoutFormProps {
	onSubmitSuccess: (data: CheckoutFormData) => void
	totalPrice: number
}

export const CheckoutForm = ({ onSubmitSuccess, totalPrice }: CheckoutFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			paymentMethod: 'card',
		},
	})

	const onSubmit = async (data: CheckoutFormData) => {
		// Имитируем отправку на бэкенд
		await new Promise(resolve => setTimeout(resolve, 1000))
		onSubmitSuccess(data)
	}

	// Общие классы для всех инпутов, чтобы не дублировать код
	const inputBaseClasses =
		'w-full px-3 py-2 border rounded-md text-sm text-white bg-zinc-900/50 border-zinc-700 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#01CD1D]/30 focus:border-[#01CD1D] transition-colors'

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 pt-2'>
			{/* ФИО */}
			<div>
				<label className='block text-sm font-medium text-zinc-300 mb-1'>ФИО получателя</label>
				<input
					{...register('fullName')}
					type='text'
					placeholder='Иванов Иван Иванович'
					className={inputBaseClasses}
				/>
				{errors.fullName && <p className='text-red-500 text-xs mt-1'>{errors.fullName.message}</p>}
			</div>

			{/* Контакты: Email и Телефон */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium text-zinc-300 mb-1'>Email</label>
					<input
						{...register('email')}
						type='email'
						placeholder='example@mail.com'
						className={inputBaseClasses}
					/>
					{errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
				</div>

				{/* Телефон */}
				<div>
					<label className='block text-sm font-medium text-zinc-300 mb-1'>Телефон</label>
					<input
						{...register('phone', {
							onChange: e => {
								e.target.value = e.target.value.replace(/\D/g, '')
							},
						})}
						type='tel'
						inputMode='numeric'
						maxLength={11}
						placeholder='79990000000'
						className={inputBaseClasses}
					/>
					{errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
				</div>
			</div>

			{/* Адрес доставки */}
			<div>
				<label className='block text-sm font-medium text-zinc-300 mb-1'>Адрес доставки</label>
				<input
					{...register('address')}
					type='text'
					placeholder='г. Москва, ул. Ленина, д. 10, кв. 5'
					className={inputBaseClasses}
				/>
				{errors.address && <p className='text-red-500 text-xs mt-1'>{errors.address.message}</p>}
			</div>

			{/* Способ оплаты */}
			<div>
				<label className='block text-sm font-medium text-zinc-300 mb-2'>Способ оплаты</label>
				<div className='flex gap-4'>
					<label className='flex items-center gap-2 cursor-pointer text-sm text-zinc-200 hover:text-white transition-colors'>
						<input
							{...register('paymentMethod')}
							type='radio'
							value='card'
							className='w-4 h-4 accent-[#01CD1D] bg-zinc-900 border-zinc-700 cursor-pointer'
						/>
						Банковской картой
					</label>
					<label className='flex items-center gap-2 cursor-pointer text-sm text-zinc-200 hover:text-white transition-colors'>
						<input
							{...register('paymentMethod')}
							type='radio'
							value='cash'
							className='w-4 h-4 accent-[#01CD1D] bg-zinc-900 border-zinc-700 cursor-pointer'
						/>
						При получении
					</label>
				</div>
				{errors.paymentMethod && (
					<p className='text-red-500 text-xs mt-1'>{errors.paymentMethod.message}</p>
				)}
			</div>

			{/* Комментарий */}
			<div>
				<label className='block text-sm font-medium text-zinc-300 mb-1'>Комментарий к заказу</label>
				<textarea
					{...register('comment')}
					rows={2}
					placeholder='Пожелания по доставке...'
					className={inputBaseClasses}
				/>
			</div>

			{/* Итоговая сумма и кнопка */}
			<div className='pt-4 border-t border-zinc-800 flex items-center justify-between'>
				<div>
					<span className='text-xs text-zinc-500 block'>К оплате:</span>
					<span className='text-lg font-bold text-white'>
						{totalPrice.toLocaleString('ru-RU')} ₽
					</span>
				</div>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
				</Button>
			</div>
		</form>
	)
}
