import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Инициализация базового API
export const baseApi = createApi({
	reducerPath: 'api', // Уникальный ключ для Redux Store
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
	endpoints: () => ({}), // Эндпоинты будем инжектить (добавлять) в других файлах по FSD
})
