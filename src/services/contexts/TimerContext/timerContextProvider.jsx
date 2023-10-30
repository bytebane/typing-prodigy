import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TimerContext } from './timerContext'

const TimerContextProvider = ({ children }) => {
	const [timerDuration, setTimerDuration] = useState(15)
	const [timeleft, setTimeleft] = useState(0)
	const [isTypingFinished, setIsTypingFinished] = useState(false)
	const [isTypingStarted, setIsTypingStarted] = useState(false)

	const timerRef = useRef()

	const startTimer = useCallback(() => {
		if (timerDuration > 0) {
			setIsTypingFinished(false)
			setIsTypingStarted(true)
			setTimeleft(timerDuration)

			timerRef.current = setInterval(() => {
				setTimeleft((prev) => prev - 1)
			}, 1000)
		}
	}, [timerDuration])

	const stopTimer = useCallback(() => {
		setIsTypingStarted(false)
		setIsTypingFinished(true)
		clearInterval(timerRef.current)
	})

	useEffect(() => {
		if (timeleft <= 0 && isTypingStarted && !isTypingFinished) {
			stopTimer()
		}
	}, [timeleft, isTypingFinished])

	const value = useMemo(() => {
		return {
			timeleft,
			timerDuration,
			isTypingFinished,
			setIsTypingFinished,
			startTimer,
			stopTimer,
			setTimerDuration,
		}
	}, [timerDuration, timeleft, isTypingFinished])

	return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export default TimerContextProvider
