import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart, Monitor, Search } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { RootState } from '@/app/store/store'

export const Header = () => {
	// Получаем количество товаров из Redux
	const cartItems = useSelector((state: RootState) => state.cart.items)

	// Считаем общее количество единиц товара
	const itemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

	return (
		<header className='sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
				{/* Логотип */}
				<Link to='/' className='flex items-center gap-2 text-xl font-black text-white group'>
					<Monitor className='w-8 h-8 text-[#01CD1D] group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(1,205,29,0.5)]' />
					<span>
						PC<span className='text-[#01CD1D]'>Store</span>
					</span>
				</Link>

				{/* Главная навигация */}
				<nav className='hidden md:flex gap-8 text-sm font-medium text-zinc-400'>
					<Link to='/catalog' className='hover:text-[#01CD1D] transition-colors'>
						Каталог комплектующих
					</Link>
					<Link to='/catalog?category=prebuilt' className='hover:text-[#01CD1D] transition-colors'>
						Готовые сборки
					</Link>
				</nav>

				{/* Пользовательские действия */}
				<div className='flex items-center gap-4'>
					<Button
						variant='ghost'
						size='icon'
						className='hidden sm:inline-flex text-zinc-400 hover:text-white hover:bg-zinc-800/50'
					>
						<Search className='w-5 h-5' />
					</Button>

					<Link to='/cart'>
						<Button
							variant='outline'
							className='relative h-10 px-4 flex gap-2 border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:border-[#01CD1D]/50 hover:text-[#01CD1D] hover:bg-zinc-900 transition-all'
						>
							<ShoppingCart className='w-5 h-5' />
							<span className='hidden sm:inline-block font-medium'>Корзина</span>

							{/* Бейдж со счетчиком */}
							{itemsCount > 0 && (
								<span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#01CD1D] text-[10px] font-black text-zinc-950 shadow-[0_0_10px_rgba(1,205,29,0.6)]'>
									{itemsCount}
								</span>
							)}
						</Button>
					</Link>
				</div>
			</div>
		</header>
	)
}
