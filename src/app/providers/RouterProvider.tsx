import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout } from '../layouts/BaseLayout'
import { CatalogPage } from '@/pages/catalog/ui/CatalogPage'
import { ProductDetailsPage } from '@/pages/product/ui/ProductDetailsPage'
import { CartPage } from '@/pages/cart/ui/CartPage'
import { HomePage } from '@/pages/home/ui/HomePage' // Импортируем корзину

export const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{
				index: true, // Этот компонент откроется точно по адресу '/'
				element: <HomePage />,
			},
			{
				path: 'catalog',
				element: <CatalogPage />,
			},
			{
				path: 'product/:id',
				element: <ProductDetailsPage />,
			},
			{
				path: 'cart',
				element: <CartPage />, // Подключаем роут корзины
			},
		],
	},
])
