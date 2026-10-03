import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[#01CD1D] focus-visible:ring-2 focus-visible:ring-[#01CD1D]/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					'bg-[#01CD1D] text-zinc-950 font-bold hover:bg-[#01CD1D]/80 shadow-[0_0_15px_rgba(1,205,29,0.25)] hover:shadow-[0_0_25px_rgba(1,205,29,0.45)]',
				outline:
					'border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:border-[#01CD1D]/50 hover:text-[#01CD1D] hover:bg-zinc-800/50',
				secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white',
				ghost: 'text-zinc-300 hover:bg-zinc-800/60 hover:text-[#01CD1D]',
				destructive: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
				link: 'text-[#01CD1D] underline-offset-4 hover:underline',
			},
			size: {
				default:
					'h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-11 gap-2 px-5 text-base',
				icon: 'size-9',
				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-7 rounded-[min(var(--radius-md),12px)]',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
