import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetProductsQuery } from '@/entities/product/productApi'
import { addToCart } from '@/entities/cart/model/cartSlice'
import { CategoryFilter } from '@/features/filterByCategory/ui/CategoryFilter'
import { ProductCard } from '@/entities/product/ui/ProductCard'
import { Button } from '@/shared/ui/button'

export const CatalogPage = () => {
	const [searchParams] = useSearchParams()
	const currentCategory = searchParams.get('category') || 'all'
	const dispatch = useDispatch()

	const [searchTerm, setSearchTerm] = useState('')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('')

	// Запрашиваем товары по выбранной категории
	const {
		data: rawProducts,
		isLoading,
		isError,
	} = useGetProductsQuery({ category: currentCategory })

	// Клиентская фильтрация и сортировка
	const products = useMemo(() => {
		if (!rawProducts) return []

		let result = [...rawProducts]

		// 1. Поиск по названию (учитываем возможные поля name или title)
		if (searchTerm.trim()) {
			const query = searchTerm.toLowerCase().trim()
			result = result.filter(product => {
				const titleToSearch = (product.name || '').toLowerCase()
				return titleToSearch.includes(query)
			})
		}

		// 2. Сортировка по цене
		if (sortOrder === 'asc') {
			result.sort((a, b) => a.price - b.price)
		} else if (sortOrder === 'desc') {
			result.sort((a, b) => b.price - a.price)
		}

		return result
	}, [rawProducts, searchTerm, sortOrder])

	const inputClasses =
		'px-4 py-2 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#01CD1D]/30 focus:border-[#01CD1D] bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 shadow-sm'

	return (
		<div className='max-w-7xl mx-auto p-8'>
			<h1 className='text-4xl font-bold mb-8 text-white'>Каталог комплектующих</h1>

			<CategoryFilter />

			{/* Панель поиска и сортировки */}
			<div className='flex flex-col md:flex-row gap-4 mb-8 items-center justify-between'>
				<div className='w-full md:w-1/2'>
					<input
						type='text'
						placeholder='Поиск комплектующих...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className={`w-full ${inputClasses}`}
					/>
				</div>

				<div className='w-full md:w-auto'>
					<select
						value={sortOrder}
						onChange={e => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
						className={`w-full md:w-auto cursor-pointer ${inputClasses} [&>option]:bg-[#09090b]`}
					>
						<option value=''>По умолчанию</option>
						<option value='asc'>Сначала дешевые</option>
						<option value='desc'>Сначала дорогие</option>
					</select>
				</div>
			</div>

			{/* Скелетоны при загрузке */}
			{isLoading && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							className='h-[380px] bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-pulse'
						/>
					))}
				</div>
			)}

			{/* Состояние ошибки */}
			{isError && (
				<div className='text-red-400 text-center py-10 bg-red-500/10 border border-red-500/20 rounded-xl'>
					Ошибка при загрузке товаров. Проверьте подключение к базе.
				</div>
			)}

			{/* Состояние пустого поиска */}
			{!isLoading && !isError && products.length === 0 && (
				<div className='text-zinc-400 text-center py-10 bg-zinc-900/20 border border-zinc-800/50 rounded-xl'>
					Товары по вашему запросу не найдены.
				</div>
			)}

			{/* Сетка товаров */}
			{!isLoading && products.length > 0 && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							actionSlot={
								<Button onClick={() => dispatch(addToCart(product))} size='sm'>
									В корзину
								</Button>
							}
						/>
					))}
				</div>
			)}
		</div>
	)
}
