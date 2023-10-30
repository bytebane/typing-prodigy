import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Line } from 'react-chartjs-2'
import { FirestoreData } from '../../services/contexts/FirestoreContext'
import { Typography, useTheme } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin, Title, Tooltip, Legend)

// TODO start from 0 (add an extra input to array)

const HistoryChart = () => {
	const theme = useTheme()
	const { datesList, wpmList, accuracyList, totalCharsList } = FirestoreData()

	const data = {
		labels: ['--/--/----, --:-- --', ...datesList],
		datasets: [
			{
				label: 'Accuracy',
				backgroundColor: '#004000',
				borderColor: '#00FF89',
				// pointBorderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
				// pointBackgroundColor: '#ff4000',
				pointStyle: 'rectRounded',
				radius: 4,
				hitRadius: 2,
				data: [0, ...accuracyList],
			},
			{
				label: 'Total Characters',
				backgroundColor: '#580067',
				borderColor: '#9B63E8',
				pointStyle: 'rectRounded',
				radius: 4,
				hitRadius: 2,
				data: [0, ...totalCharsList],
			},
			{
				label: 'Words Per Minute',
				backgroundColor: '#003600',
				borderColor: '#97CC04',
				borderJoin: 'miter',
				pointStyle: 'rectRounded',
				radius: 4,
				hitRadius: 2,
				data: [0, ...wpmList],
			},
		],
	}
	return (
		<div style={{ marginBottom: '10rem', minHeight: '400px', height: '40vh' }}>
			{/* <Typography variant='h5' align='center' component='div' color={'secondary'}>
				History Chart
			</Typography> */}
			<Line
				style={{ margin: '1rem 0' }}
				data={data}
				about='History Chart'
				onError={(e) => console.log(e)}
				prefix='Chart 1'
				fallbackContent={
					<Typography variant='caption' align='center' component='div'>
						Historical Typing Data Still Loading
					</Typography>
				}
				options={{
					responsive: true,
					maintainAspectRatio: false,

					plugins: {
						title: {
							display: true,
							text: 'History Chart',
							color: theme.palette.secondary.main,
							font: {
								size: 20,
							},
						},

						zoom: {
							pan: {
								enabled: true,
								mode: 'x',
							},
							zoom: {
								pinch: {
									enabled: true, // Enable pinch zooming
								},
								wheel: {
									enabled: true, // Enable wheel zooming
									// modifierKey: 'ctrl',
								},
								mode: 'x',
							},
						},
					},
				}}
			/>
			<Typography variant='caption' align='center' component='div'>
				Fig: Historical Typing Data
			</Typography>
		</div>
	)
}

export default HistoryChart
