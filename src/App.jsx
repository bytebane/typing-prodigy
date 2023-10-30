import { useEffect } from 'react'
import { auth } from './services/firebase'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import { red, yellow } from '@mui/material/colors'
import AnimatedCursor from 'react-animated-cursor'
import { CircleLoader, TopNav } from './components'
import { Box, ThemeProvider, createTheme, responsiveFontSizes, useTheme } from '@mui/material'
import 'react-toastify/dist/ReactToastify.min.css'

import { routeList } from './utils'
import { BaseContextData } from './services/contexts/Base'
import { colorThemes } from './theme/index'

import { FavIconBlack, FavIconWhite } from './assets'

function App() {
	const { themeMode, themeColorId, isLoading, setIsLoading, setIsUserAuthenticated } = BaseContextData()

	const themeData = responsiveFontSizes(
		createTheme({
			palette: {
				mode: themeMode,
				...colorThemes[themeColorId],
				warning: yellow,
				error: red,
			},
			components: {
				MuiTooltip: {
					defaultProps: {
						arrow: true,
					},
				},
				MuiAppBar: {
					defaultProps: {
						color: 'transparent',
					},
				},
			},
			shape: {
				borderRadius: 4,
			},
			typography: {
				fontFamily: ['Playpen Sans', 'cursive'].join(','),
				fontSize: 14,
				fontWeightLight: 300,
				fontWeightRegular: 400,
				fontWeightMedium: 500,
				fontWeightBold: 800,
			},
		})
	)

	const theme = useTheme()

	useEffect(() => {
		let link = document.querySelector("link[rel~='icon']")
		if (!link) {
			link = document.createElement('link')
			link.rel = 'icon'
			document.getElementsByTagName('head')[0].appendChild(link)
		}
		link.href = theme.palette.mode === 'dark' ? FavIconBlack : FavIconWhite
	}, [])

	// ? Listen to authentication changes
	useEffect(() => {
		setIsLoading(true)
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsUserAuthenticated(true)
				setIsLoading(false)
			} else {
				setIsUserAuthenticated(false)
				setIsLoading(false)
			}
		})

		return unsubscribe
	}, [auth])

	return (
		<ThemeProvider theme={themeData}>
			{/* Cursor */}

			<AnimatedCursor innerSize={8} outerSize={35} innerScale={0.7} outerScale={1.5} innerStyle={{ zIndex: 99999, backgroundColor: theme.palette.primary.contrastText }} outerStyle={{ zIndex: 99999, backgroundColor: 'transparent', border: `3px solid ${theme.palette.primary.contrastText}`, mixBlendMode: 'exclusion' }} clickables={['a', 'img', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="password"]', 'input[type="submit"]', 'input[type="image"]', 'label', 'select', 'textarea', 'button', '.link', '.custom']} />

			{/*  */}
			<Box sx={{ height: '100vh', width: '100vw', bgcolor: 'background.default', color: 'text.primary', overflowY: 'auto', overflowX: 'hidden' }}>
				{isLoading && <CircleLoader />}

				<TopNav />

				<Routes>
					{routeList.map((route) => (
						<Route key={route.label} path={route.path} element={route.component} />
					))}
				</Routes>
			</Box>

			<ToastContainer position='top-right' autoClose={1500} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' />
		</ThemeProvider>
	)
}

export default App
