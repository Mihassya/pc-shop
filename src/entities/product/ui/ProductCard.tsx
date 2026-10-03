import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Product } from '../productApi'

interface ProductCardProps {
	product: Product
	actionSlot?: ReactNode // Слот для проброса любых кнопок снаружи
}

export const ProductCard = ({ product, actionSlot }: ProductCardProps) => {
	return (
		<div className='group flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#01CD1D]/50 hover:shadow-[0_0_25px_rgba(1,205,29,0.12)] transition-all duration-300'>
			{/* Ссылка и контейнер для изображения */}
			<Link
				to={`/product/${product.id}`}
				className='relative aspect-square p-6 bg-[#09090b]/80 flex items-center justify-center overflow-hidden border-b border-zinc-800/50'
			>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out'
				/>
				{/* Градиентный блик при наведении */}
				<div className='absolute inset-0 bg-gradient-to-t from-[#01CD1D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
			</Link>

			{/* Информационный блок */}
			<div className='flex-1 flex flex-col p-5'>
				<span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5'>
					{product.category}
				</span>

				<Link to={`/product/${product.id}`} className='block mb-4'>
					<h3
						className='font-semibold text-base text-zinc-100 line-clamp-2 leading-snug hover:text-[#01CD1D] transition-colors'
						title={product.name}
					>
						{product.name}
					</h3>
				</Link>

				{/* Нижняя панель: цена и кнопка */}
				<div className='mt-auto pt-4 flex items-center justify-between gap-3 border-t border-zinc-800/50'>
					<div className='flex flex-col'>
						<span className='text-xs text-zinc-500 font-medium'>Цена</span>
						<span className='text-xl font-bold text-white whitespace-nowrap'>
							{product.price.toLocaleString('ru-RU')} ₽
						</span>
					</div>

					{/* Место для кнопки "В корзину" */}
					{actionSlot}
				</div>
			</div>
		</div>
	)
}
