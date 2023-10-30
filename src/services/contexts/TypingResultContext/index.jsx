import { createContext, useContext, useState } from 'react'

const TypingResultContext = createContext()

export const TypingDataContextProvider = ({ children }) => {
	const [correctCharsTyped, setCorrectCharsTyped] = useState(0)
	const [incorrectCharsTyped, setIncorrectCharsTyped] = useState(0)
	const [totalCharsTyped, setTotalCharsTyped] = useState(0)
	const [correctWordsTyped, setCorrectWordsTyped] = useState(0)
	const [totalWordsTyped, setTotalWordsTyped] = useState(0)
	const [extraCharsTyped, setExtraCharsTyped] = useState(0)

	const value = {
		correctCharsTyped,
		incorrectCharsTyped,
		correctWordsTyped,
		setCorrectCharsTyped,
		setIncorrectCharsTyped,
		setCorrectWordsTyped,
		totalCharsTyped,
		setTotalCharsTyped,
		totalWordsTyped,
		setTotalWordsTyped,
		extraCharsTyped,
		setExtraCharsTyped,
	}
	return <TypingResultContext.Provider value={value}>{children}</TypingResultContext.Provider>
}

export const TypingResultData = () => useContext(TypingResultContext)
