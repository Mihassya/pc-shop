import { useSearchParams } from 'react-router-dom'
import { Button } from '@/shared/ui/button'

// В идеале этот список мы бы тоже получали с бэкенда,
// но для MVP зашьем базовые категории ПК-комплектующих хардкодом.
const CATEGORIES = [
	{ id: 'all', name: 'Все товары' },
	{ id: 'gpu', name: 'Видеокарты' },
	{ id: 'cpu', name: 'Процессоры' },
	{ id: 'ram', name: 'Оперативная память' },
	{ id: 'prebuilt', name: 'Готовые сборки ПК' },
]

export const CategoryFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentCategory = searchParams.get('category') || 'all'

	const handleCategoryChange = (categoryId: string) => {
		if (categoryId === 'all') {
			searchParams.delete('category') // Убираем параметр из URL, если выбрано "Все"
		} else {
			searchParams.set('category', categoryId)
		}
		setSearchParams(searchParams)
	}

	return (
		<div className='flex flex-wrap gap-2 mb-8'>
			{CATEGORIES.map(cat => (
				<Button
					key={cat.id}
					variant={currentCategory === cat.id ? 'default' : 'outline'}
					onClick={() => handleCategoryChange(cat.id)}
					className='rounded-full'
				>
					{cat.name}
				</Button>
			))}
		</div>
	)
}
