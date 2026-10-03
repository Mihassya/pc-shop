import { createSlice, current, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/entities/product/productApi'

export interface CartItem extends Product {
	quantity: number
}

interface CartState {
	items: CartItem[]
}

const CART_STORAGE_KEY = 'pc_shop_cart'

// Загрузка начального состояния из localStorage
const loadCartFromStorage = (): CartItem[] => {
	try {
		const data = localStorage.getItem(CART_STORAGE_KEY)
		return data ? JSON.parse(data) : []
	} catch (error) {
		console.error('Ошибка чтения корзины из localStorage:', error)
		return []
	}
}

// Вспомогательная функция сохранения
const saveCartToStorage = (items: CartItem[]) => {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
	} catch (error) {
		console.error('Ошибка сохранения корзины в localStorage:', error)
	}
}

const initialState: CartState = {
	items: loadCartFromStorage(),
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id)
			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
			saveCartToStorage(current(state.items))
		},
		deleteItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload)
			// state.items теперь обычный массив, current() вызовет ошибку
			saveCartToStorage(state.items)
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			const existingItem = state.items.find(item => item.id === action.payload)
			if (existingItem) {
				if (existingItem.quantity > 1) {
					existingItem.quantity -= 1
					saveCartToStorage(current(state.items)) // Здесь остался draft
				} else {
					state.items = state.items.filter(item => item.id !== action.payload)
					saveCartToStorage(state.items) // Здесь стал обычный массив
				}
			}
		},
		clearCart: state => {
			state.items = []
			// state.items теперь обычный пустой массив
			saveCartToStorage(state.items)
		},
	},
})

export const { addToCart, removeFromCart, clearCart, deleteItem } = cartSlice.actions
export default cartSlice.reducer
