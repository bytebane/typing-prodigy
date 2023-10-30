import { Box, Typography } from '@mui/material'
import { Suspense, lazy, useContext, useEffect, useState } from 'react'
import { TimerContext } from '../../services/contexts/TimerContext/timerContext'
import { TBtnGroup, TypingBoxSkeleton } from '../../components'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../utils'

const TypingBox = lazy(() => import('../../components/TypingBox/TypingBox'))

const HomePage = () => {
	const [startTyping, setStartTyping] = useState(false)
	const navigate = useNavigate()

	//? Timer Context
	const { timerDuration, timeleft, isTypingFinished, setTimerDuration, startTimer } = useContext(TimerContext)

	useEffect(() => {
		if (isTypingFinished) {
			navigate(routePath.RESULT)
		}
	}, [isTypingFinished])

	//? Timer Duration Toggle
	const toggleDuration = (event, value) => {
		if (value !== null) setTimerDuration(value)
	}

	//? To start the test
	const handleKeyPress = (e) => {
		// if (e.keyCode === 32 && !startTyping) { //32==Space
		//18==Alt
		if (e.keyCode === 18 && e.ctrlKey && !startTyping) {
			setStartTyping(true)
			// closeModal()
		}
	}

	useEffect(() => {
		if (startTyping && timeleft <= 0) {
			startTimer()
		}
	}, [startTyping])

	//? To Stop the test
	useEffect(() => {
		if (timeleft <= 0 && startTyping) {
			setStartTyping(false)
		}
	}, [timeleft])

	useEffect(() => {
		document.addEventListener('keyup', handleKeyPress)

		return () => {
			document.removeEventListener('keyup', handleKeyPress)
		}
	}, [])

	return (
		<Box component={'main'} sx={{ height: 'calc(100% - 80px)', width: '100%' }}>
			<TBtnGroup toggleDuration={toggleDuration} timerDuration={timerDuration} startTyping={startTyping} />
			{startTyping && (
				<Typography variant='h6' sx={{ position: 'fixed', top: '10%', right: '3%', zIndex: 100 }}>
					{timeleft}
				</Typography>
			)}
			{startTyping ? (
				<Suspense fallback={<TypingBoxSkeleton />}>
					<TypingBox />
				</Suspense>
			) : (
				<TypingBoxSkeleton animate={false} />
			)}
		</Box>
	)
}

export default HomePage
