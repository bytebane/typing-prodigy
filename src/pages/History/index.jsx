import { routePath } from '../../utils'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { addResultsToDatabase, getResultsFromDatabase } from './../../services/firebase/dbServices'
import { TypingResultData } from '../../services/contexts/TypingResultContext'
import { TimerContext } from '../../services/contexts/TimerContext/timerContext'
import { Box, Container, Typography } from '@mui/material'

import { HistoryChart } from '../../components'
import { FirestoreData } from '../../services/contexts/FirestoreContext'
import { format } from 'date-fns'
import { BaseContextData } from '../../services/contexts/Base'

const History = () => {
	const typingResData = TypingResultData()
	const timerConData = useContext(TimerContext)
	const routeLocation = useLocation()

	const isHistory = routeLocation.pathname === routePath.HISTORY

	const { wpmList, accuracyList, totalCharsList } = FirestoreData()
	const { isUserAuthenticated } = BaseContextData()

	//? Accuracy Calculation
	const getAccuracy = () => {
		const acc = Math.round((typingResData.correctCharsTyped / (typingResData.correctCharsTyped + typingResData.incorrectCharsTyped)) * 100)
		return isNaN(acc) ? 0 : acc
	}

	//? Words Per Minute Calculation
	const getWPM = () => {
		return Math.round(typingResData.correctCharsTyped / 5 / (timerConData.timerDuration / 60))
	}

	//? Get Results from Database
	const { setDatesList, setWpmList, setAccuracyList, setTotalCharsList } = FirestoreData()

	useEffect(() => {
		//? Add Results to Database
		routeLocation.pathname === routePath.RESULT && addResultsToDatabase({ wpm: getWPM(), accuracy: getAccuracy(), correctChars: typingResData.correctCharsTyped, totalChars: typingResData.totalCharsTyped, correctWords: typingResData.correctWordsTyped, totalWords: typingResData.totalWordsTyped, extraChars: typingResData.extraCharsTyped })

		//? Get Results from Database

		isUserAuthenticated &&
			getResultsFromDatabase().then((data) => {
				// setDatesList(data.map((item) => format(item.createdAt, 'Pp')))
				// setWpmList(data.map((item) => item.wpm))
				// setAccuracyList(data.map((item) => item.accuracy))
				// setTotalCharsList(data.map((item) => item.chars.split('/').pop()))
				setDatesList([])
				setWpmList([])
				setAccuracyList([])
				setTotalCharsList([])
				data.map((item) => {
					setDatesList((prev) => [...prev, format(item.createdAt, 'Pp')])
					setWpmList((prev) => [...prev, item.wpm])
					setAccuracyList((prev) => [...prev, item.accuracy])
					setTotalCharsList((prev) => [...prev, item.chars.split('/').pop()])
				})
			})
	}, [isUserAuthenticated])

	const TextComp = ({ label, value }) => {
		return (
			<Typography sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} variant='h6' component={'div'} color={'secondary'}>
				{label + ': '}
				<Typography component={'span'} variant='body' color={'primary'}>
					{value}
				</Typography>
			</Typography>
		)
	}

	const TypingData = ({ heading1, heading2, listItems1, listItems2 }) => {
		return (
			<Box sx={{ my: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', gap: { xs: 2, md: 15 } }}>
				{listItems1 && (
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: 1, width: '100%' }}>
						<Typography variant='h5' align='center' width={'100%'} color={'secondary'} fontWeight={500}>
							{heading1}
						</Typography>
						{listItems1.map((item) => (
							<TextComp key={item.label} label={item.label} value={item.value} />
						))}
					</Box>
				)}
				{listItems2 && (
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: 1, width: '100%' }}>
						<Typography variant='h5' align='center' width={'100%'} color={'secondary'} fontWeight={500}>
							{heading2}
						</Typography>
						{listItems2.map((item) => (
							<TextComp key={item.label} label={item.label} value={item.value} />
						))}
					</Box>
				)}
			</Box>
		)
	}

	return (
		isUserAuthenticated && (
			<Container sx={{ my: 2, width: '100%', height: 'calc(100% - 100px)', position: 'relative' }}>
				{/* <IconButton
				sx={{ position: 'absolute', top: 0, left: 10 }}
				onClick={() => {
					timerConData.setIsTypingFinished(false)
					window.history.back()
				}}>
				<ArrowBack />
			</IconButton> */}
				{isHistory ? (
					<Typography variant='h4' align='center' component='h1'>
						{' '}
						Typing Results History
					</Typography>
				) : (
					<Typography variant='h4' align='center' component='h1'>
						{'Typing test summary - ' + timerConData.timerDuration + ' seconds'}
					</Typography>
				)}

				{isHistory ? (
					<TypingData
						heading1={'Average Stats'}
						listItems1={[
							{ label: 'Top Speed', value: wpmList.length > 0 ? Math.max(...wpmList).toFixed(2) + ' wpm' : 'N/A' },
							{ label: 'Average Speed', value: wpmList.length > 0 ? (wpmList.reduce((a, b) => a + b, 0) / wpmList.length).toFixed(2) + ' wpm' : 'N/A' },
							{ label: 'Average Accuracy', value: accuracyList.length > 0 ? (accuracyList.reduce((a, b) => a + b, 0) / accuracyList.length).toFixed(2) + '%' : 'N/A' },
							{ label: 'Total Characters Typed', value: totalCharsList.length > 0 ? totalCharsList.reduce((a, b) => parseInt(a) + parseInt(b), 0) : 'N/A' },
						]}
					/>
				) : (
					<TypingData
						heading1={'Test Stats'}
						listItems1={[
							{ label: 'Speed', value: getWPM() + ' wpm' },
							{ label: 'Accuracy', value: getAccuracy() + '%' },
							{ label: 'Total Words', value: typingResData.totalWordsTyped },
							{ label: 'Total Characters', value: typingResData.totalCharsTyped },
						]}
						heading2={'More Stats'}
						listItems2={[
							{ label: 'Correct Words', value: typingResData.correctWordsTyped },
							{ label: 'Incorrect Words', value: typingResData.totalWordsTyped - typingResData.correctWordsTyped },
							{ label: 'Correct Characters', value: typingResData.correctCharsTyped },
							{ label: 'Incorrect Characters', value: typingResData.incorrectCharsTyped },
							{ label: 'Extra Characters Typed', value: typingResData.extraCharsTyped },
						]}
					/>
				)}

				{<HistoryChart />}
			</Container>
		)
	)
}

export default History
