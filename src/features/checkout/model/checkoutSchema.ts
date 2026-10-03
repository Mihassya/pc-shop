import { z } from 'zod'

export const checkoutSchema = z.object({
	fullName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
	email: z.string().email('Введите корректный email адрес'),
	phone: z
		.string()
		.min(10, 'Введите минимум 10 цифр')
		.max(11, 'Не более 11 цифр')
		.regex(/^\d+$/, 'Номер телефона должен содержать только цифры'),
	address: z.string().min(5, 'Укажите полный адрес доставки'),
	paymentMethod: z.enum(['card', 'cash'], {
		message: 'Выберите способ оплаты',
	}),
	comment: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
