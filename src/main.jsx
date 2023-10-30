import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import MyContextsProvider from './services/contexts/'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
	<MyContextsProvider>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MyContextsProvider>
)
