import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import WireTerrain from '@/shared/ui/WireTerrain'

export const HomePage = () => {
	return (
		<div className='relative min-h-[calc(100vh-64px)] bg-[#09090b] flex flex-col items-center justify-center overflow-hidden'>
			{/* 1. Интерактивный Canvas-фон */}
			<div className='absolute inset-0 z-0'>
				<WireTerrain
					background='#09090b'
					lineColor='#01CD1D' // Новая кислотно-зеленая сетка
					accent='#FF0000' // Солнце в тон сетке
					density={80}
					speed={45}
				/>
			</div>

			{/* 2. Декоративное фоновое свечение */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#01CD1D]/15 rounded-full blur-[120px] pointer-events-none z-0' />

			{/* 3. Основной контент страницы */}
			<main className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
				<h1 className='text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg'>
					Эволюция твоего <span className='text-[#01CD1D]'>ПК</span>
				</h1>
				<p className='text-lg text-zinc-300 mb-10 max-w-2xl mx-auto drop-shadow-md font-medium'>
					Топовые комплектующие, периферия и готовые сборки для максимального FPS и рабочих задач.
				</p>
				<div className='flex gap-4 justify-center'>
					<Link to='/catalog'>
						<Button className='bg-[#01CD1D] hover:bg-[#01CD1D]/80 text-zinc-950 font-bold px-8 py-6 text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(1,205,29,0.3)] hover:shadow-[0_0_40px_rgba(1,205,29,0.6)]'>
							Открыть каталог
						</Button>
					</Link>
				</div>
			</main>
		</div>
	)
}
