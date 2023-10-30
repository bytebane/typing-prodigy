import { createContext, useContext, useEffect, useState } from 'react'

const BaseContext = createContext()

export const BaseContextProvider = ({ children }) => {
	const [showAuthModal, setShowAuthModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
	const [isDataUploaded, setIsDataUploaded] = useState(false)

	const [themeMode, setThemeMode] = useState('dark')
	const [themeColorId, setThemeColorId] = useState(20)

	const value = {
		showAuthModal,
		setShowAuthModal,
		isLoading,
		setIsLoading,
		isUserAuthenticated,
		setIsUserAuthenticated,
		isDataUploaded,
		setIsDataUploaded,
		themeMode,
		toggleThemeMode: () => {
			setThemeMode(themeMode === 'light' ? 'dark' : 'light')
			localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')
		},
		themeColorId,
		setThemeColorId,
	}

	useEffect(() => {
		if (localStorage.getItem('themeMode')) {
			setThemeMode(localStorage.getItem('themeMode'))
		} else {
			localStorage.setItem('themeMode', themeMode)
		}
		if (localStorage.getItem('themeColorId')) {
			setThemeColorId(localStorage.getItem('themeColorId'))
		} else {
			localStorage.setItem('themeColorId', themeColorId)
		}
	}, [])
	useEffect(() => {
		localStorage.setItem('themeColorId', themeColorId)
	}, [themeColorId])

	return <BaseContext.Provider value={value}>{children}</BaseContext.Provider>
}

export const BaseContextData = () => useContext(BaseContext)
