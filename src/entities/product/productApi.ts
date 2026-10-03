import { baseApi } from '@/shared/api/baseApi'

export interface Product {
	id: string
	name: string
	price: number
	image: string
	category: string
	description: string
	specs?: Record<string, string>
	inStock: boolean
	brand?: string
}

// Интерфейс параметров запроса
export interface GetProductsParams {
	category?: string
	search?: string
	sortOrder?: 'asc' | 'desc' | ''
}

export const productApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<Product[], GetProductsParams | void>({
			query: params => {
				const queryParams = new URLSearchParams()

				if (params?.category && params.category !== 'all') {
					queryParams.append('category', params.category)
				}

				if (params?.search && params.search.trim() !== '') {
					queryParams.append('q', params.search.trim())
				}

				if (params?.sortOrder) {
					queryParams.append('_sort', 'price')
					queryParams.append('_order', params.sortOrder)
				}

				const queryString = queryParams.toString()
				return queryString ? `products?${queryString}` : 'products'
			},
		}),
		getProductById: builder.query<Product, string>({
			query: id => `products/${id}`,
		}),
	}),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi
