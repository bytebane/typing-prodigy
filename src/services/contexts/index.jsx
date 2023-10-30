// import { BaseContextProvider } from './Base'
import { BaseContextProvider } from './Base'
import { FirestoreContextProvider } from './FirestoreContext'
import TimerContextProvider from './TimerContext/timerContextProvider'
import { TypingDataContextProvider } from './TypingResultContext'

/**
 * Condensing multiple context providers as one.
 *
 * @param {Object} children - The child components to be rendered.
 * @return {JSX.Element} The rendered component.
 */
const MyContextsProvider = ({ children }) => {
	return (
		<BaseContextProvider>
			<TimerContextProvider>
				<TypingDataContextProvider>
					<FirestoreContextProvider>{children}</FirestoreContextProvider>
				</TypingDataContextProvider>
			</TimerContextProvider>
		</BaseContextProvider>
	)
}

export default MyContextsProvider
