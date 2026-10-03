import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/entities/cart/model/cartSlice'
import { baseApi } from '@/shared/api/baseApi'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		// Добавляем редьюсер RTK Query
		[baseApi.reducerPath]: baseApi.reducer,
	},
	// Обязательно добавляем middleware от RTK Query для работы кэширования и инвалидации
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
