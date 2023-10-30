import History from '../pages/History'
import Profile from '../pages/Profile'
import HomePage from './../pages/Home/'

export const routePath = {
	HOME: '/',
	PROFILE: '/profile',
	HISTORY: '/history',
	RESULT: '/result',
}

export const routeList = [
	{
		label: 'Home',
		path: routePath.HOME,
		component: <HomePage />,
		menuItem: false,
	},
	{
		label: 'Profile',
		path: routePath.PROFILE,
		component: <Profile />,
		menuItem: true,
	},
	{
		label: 'History',
		path: routePath.HISTORY,
		component: <History />,
		menuItem: true,
	},
	{
		label: 'Result',
		path: routePath.RESULT,
		component: <History />,
		menuItem: false,
	},
]
