import { createContext, useContext, useState } from 'react'

const FirestoreContext = createContext()

export const FirestoreContextProvider = ({ children }) => {
	const [datesList, setDatesList] = useState([])
	const [wpmList, setWpmList] = useState([])
	const [accuracyList, setAccuracyList] = useState([])
	const [totalCharsList, setTotalCharsList] = useState([])

	const value = {
		datesList,
		setDatesList,
		wpmList,
		setWpmList,
		accuracyList,
		setAccuracyList,
		totalCharsList,
		setTotalCharsList,
	}

	return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>
}

export const FirestoreData = () => useContext(FirestoreContext)
