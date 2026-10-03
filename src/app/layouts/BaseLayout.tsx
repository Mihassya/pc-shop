import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header/ui/Header'

export const BaseLayout = () => {
	return (
		<div className='min-h-screen flex flex-col bg-[#09090b] text-white relative overflow-hidden'>
			{/* Декоративные фоновые свечения (Neon Glow) */}
			<div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#01CD1D]/10 blur-[140px] rounded-full -z-0' />
			<div className='pointer-events-none absolute top-[600px] -right-40 w-[500px] h-[500px] bg-[#01CD1D]/5 blur-[160px] rounded-full -z-0' />

			<Header />

			{/* Основной контент */}
			<main className='flex-1 relative z-10'>
				<Outlet />
			</main>
		</div>
	)
}
