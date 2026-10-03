import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/providers/RouterProvider'

export const App = () => {
	return <RouterProvider router={router} />
}

export default App
