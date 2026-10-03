import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Инициализация базового API
export const baseApi = createApi({
	reducerPath: 'api', // Уникальный ключ для Redux Store
	baseQuery: fetchBaseQuery({ baseUrl: 'https://6ac0a2ab309c92da039c019e.mockapi.io/' }),
	endpoints: () => ({}),
})
