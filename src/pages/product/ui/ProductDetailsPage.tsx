import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/entities/cart/model/cartSlice'
import { useGetProductByIdQuery } from '@/entities/product/productApi'
import { Button } from '@/shared/ui/button'

// Перевод категорий
const categoryNames: Record<string, string> = {
	gpu: 'Видеокарта',
	cpu: 'Процессор',
	ram: 'Оперативная память',
	prebuilt: 'Готовая сборка ПК',
}

// Расширенный словарь характеристик для всех категорий
const specNames: Record<string, string> = {
	memory: 'Объем памяти',
	coreClock: 'Тактовая частота',
	boostClock: 'Частота в Boost',
	cores: 'Количество ядер',
	threads: 'Количество потоков',
	socket: 'Сокет',
	type: 'Тип памяти',
	frequency: 'Частота',
	length: 'Длина видеокарты',
	powerConnector: 'Разъемы питания',
	recommendedPsu: 'Рекомендуемый БП',
	busWidth: 'Шина памяти',
	tdp: 'Тепловыделение (TDP)',
	formFactor: 'Форм-фактор',
	timings: 'Тайминги',
	voltage: 'Напряжение',
	gpuModel: 'Видеокарта',
	cpuModel: 'Процессор',
	storage: 'Накопитель (SSD/HDD)',
	powerSupply: 'Блок питания',
}

export const ProductDetailsPage = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs')

	const { data: product, isLoading, isError } = useGetProductByIdQuery(id || '')

	if (isLoading) {
		return (
			<div className='max-w-6xl mx-auto p-8 animate-pulse'>
				<div className='h-8 w-24 bg-zinc-800 rounded mb-8' />
				<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
					<div className='h-[480px] bg-zinc-900/50 rounded-3xl' />
					<div className='space-y-6 mt-4'>
						<div className='h-6 w-32 bg-zinc-800 rounded' />
						<div className='h-12 w-3/4 bg-zinc-800 rounded' />
						<div className='h-24 w-full bg-zinc-900/50 rounded-2xl' />
						<div className='h-64 w-full bg-zinc-900/50 rounded-2xl mt-8' />
					</div>
				</div>
			</div>
		)
	}

	if (isError || !product) {
		return (
			<div className='p-20 text-center flex flex-col items-center gap-6'>
				<h1 className='text-3xl font-bold text-white'>Деталь не найдена</h1>
				<p className='text-zinc-400'>Возможно, товар был удален или ссылка устарела.</p>
				<Button
					variant='outline'
					className='border-zinc-700 hover:bg-zinc-800 text-white'
					onClick={() => navigate('/')}
				>
					Вернуться в каталог
				</Button>
			</div>
		)
	}

	const specsEntries = Object.entries(product.specs || {})

	return (
		<div className='max-w-6xl mx-auto p-6 md:p-8'>
			{/* Навигация назад */}
			<button
				className='mb-8 flex items-center text-sm font-medium text-zinc-500 hover:text-[#01CD1D] transition-colors group'
				onClick={() => navigate(-1)}
			>
				<span className='mr-2 transition-transform group-hover:-translate-x-1'>&larr;</span>{' '}
				Вернуться назад
			</button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-12'>
				{/* Левая колонка: Изображение и гарантийные плашки */}
				<div className='flex flex-col gap-4'>
					<div className='group relative bg-zinc-900/40 border border-zinc-800/80 p-10 rounded-3xl flex items-center justify-center overflow-hidden aspect-square'>
						<div className='absolute inset-0 bg-gradient-to-tr from-[#01CD1D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />

						<img
							src={product.image}
							alt={product.name}
							className='max-w-full h-auto object-contain max-h-[380px] drop-shadow-2xl z-10 group-hover:scale-105 transition-transform duration-500 ease-out'
						/>
					</div>

					{/* Плашки доверия */}
					<div className='grid grid-cols-3 gap-3 text-center'>
						<div className='p-3 bg-zinc-900/30 border border-zinc-800/60 rounded-xl'>
							<div className='text-xs text-zinc-500 font-medium mb-1'>Гарантия</div>
							<div className='text-sm font-semibold text-white'>12–36 мес.</div>
						</div>
						<div className='p-3 bg-zinc-900/30 border border-zinc-800/60 rounded-xl'>
							<div className='text-xs text-zinc-500 font-medium mb-1'>Доставка</div>
							<div className='text-sm font-semibold text-white'>От 1 дня</div>
						</div>
						<div className='p-3 bg-zinc-900/30 border border-zinc-800/60 rounded-xl'>
							<div className='text-xs text-zinc-500 font-medium mb-1'>Состояние</div>
							<div className='text-sm font-semibold text-white'>Новое</div>
						</div>
					</div>
				</div>

				{/* Правая колонка: инфо, ключевые параметры, панель покупки */}
				<div className='flex flex-col justify-between'>
					<div>
						{/* Мета-информация */}
						<div className='flex items-center gap-3 mb-3'>
							<span className='text-xs font-bold text-[#01CD1D] uppercase tracking-widest'>
								{categoryNames[product.category] || product.category}
							</span>
							{product.brand && (
								<>
									<span className='w-1 h-1 rounded-full bg-zinc-700' />
									<span className='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>
										{product.brand}
									</span>
								</>
							)}
							<span className='w-1 h-1 rounded-full bg-zinc-700' />
							<span
								className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
									product.inStock
										? 'bg-[#01CD1D]/10 text-[#01CD1D] border border-[#01CD1D]/20'
										: 'bg-red-500/10 text-red-400 border border-red-500/20'
								}`}
							>
								{product.inStock ? 'В наличии' : 'Нет в наличии'}
							</span>
						</div>

						<h1 className='text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight'>
							{product.name}
						</h1>

						{/* Быстрые чипы характеристик (Quick Specs) */}
						{specsEntries.length > 0 && (
							<div className='flex flex-wrap gap-2 mb-8'>
								{specsEntries.slice(0, 4).map(([key, value]) => (
									<div
										key={key}
										className='px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300'
									>
										<span className='text-zinc-500 mr-1.5'>{specNames[key] || key}:</span>
										<span className='text-white font-semibold'>{value as string}</span>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Панель покупки */}
					<div className='p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl relative overflow-hidden my-4'>
						<div className='absolute left-0 top-0 w-1 h-full bg-[#01CD1D]' />

						<div className='flex items-center justify-between flex-wrap gap-4'>
							<div className='flex flex-col'>
								<span className='text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1'>
									Итоговая цена
								</span>
								<div className='text-4xl font-black text-white tracking-tight'>
									{product.price.toLocaleString('ru-RU')}{' '}
									<span className='text-[#01CD1D] text-3xl font-bold'>₽</span>
								</div>
							</div>

							<Button
								size='lg'
								className='h-14 px-8 bg-[#01CD1D] hover:bg-[#01CD1D]/80 text-black font-bold text-base shadow-[0_0_20px_rgba(1,205,29,0.2)] hover:shadow-[0_0_25px_rgba(1,205,29,0.4)] transition-all'
								onClick={() => dispatch(addToCart(product))}
								disabled={!product.inStock}
							>
								{product.inStock ? 'В корзину' : 'Нет в наличии'}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Табы: Характеристики и Описание */}
			<div className='mt-12'>
				<div className='flex border-b border-zinc-800/80 mb-8 gap-8'>
					<button
						className={`pb-4 text-base font-semibold transition-all relative ${
							activeTab === 'specs' ? 'text-[#01CD1D]' : 'text-zinc-400 hover:text-zinc-200'
						}`}
						onClick={() => setActiveTab('specs')}
					>
						Технические характеристики
						{activeTab === 'specs' && (
							<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#01CD1D] rounded-full' />
						)}
					</button>

					<button
						className={`pb-4 text-base font-semibold transition-all relative ${
							activeTab === 'description' ? 'text-[#01CD1D]' : 'text-zinc-400 hover:text-zinc-200'
						}`}
						onClick={() => setActiveTab('description')}
					>
						Описание товара
						{activeTab === 'description' && (
							<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#01CD1D] rounded-full' />
						)}
					</button>
				</div>

				{/* Таб 1: Таблица характеристик */}
				{activeTab === 'specs' && (
					<div className='bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden'>
						<div className='divide-y divide-zinc-800/60 text-sm'>
							{specsEntries.length > 0 ? (
								specsEntries.map(([key, value], index) => (
									<div
										key={key}
										className={`flex justify-between items-center p-4 md:p-5 ${
											index % 2 === 0 ? 'bg-zinc-900/40' : 'bg-transparent'
										} hover:bg-zinc-800/20 transition-colors`}
									>
										<span className='text-zinc-400 font-medium'>{specNames[key] || key}</span>
										<span className='font-semibold text-white text-right max-w-[60%]'>
											{value as string}
										</span>
									</div>
								))
							) : (
								<div className='p-8 text-center text-zinc-500'>Характеристики не указаны.</div>
							)}
						</div>
					</div>
				)}

				{/* Таб 2: Описание */}
				{activeTab === 'description' && (
					<div className='bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 md:p-8 text-zinc-300 leading-relaxed'>
						{product.description || (
							<p>
								Официальный продукт от {product.brand || 'производителя'}. Поставляется в
								оригинальной заводской упаковке с полной гарантией.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
