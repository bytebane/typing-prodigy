import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { toast } from 'react-toastify'
import { BaseContextData } from '../../services/contexts/Base'
import { useLocation, useNavigate } from 'react-router-dom'
import { routeList, routePath } from '../../utils'

const NavMenu = () => {
	const navigate = useNavigate()
	const theme = useTheme()

	const routeLocation = useLocation()

	const { setShowAuthModal, setIsLoading, isUserAuthenticated } = BaseContextData()

	const [anchorElMenu, setAnchorElMenu] = useState(null)

	const handleOpenMenu = (event) => {
		setAnchorElMenu(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorElMenu(null)
	}

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title='Open Menu'>
				<IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
					{isUserAuthenticated ? <Avatar sx={{ backgroundColor: theme.palette.mode === 'light' ? 'black' : 'white' }} alt='User-DP' src={'https://robohash.org/' + auth.currentUser.displayName} /> : <Avatar />}
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id='appbar-menu'
				anchorEl={anchorElMenu}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				// keepMounted
				open={Boolean(anchorElMenu)}
				onClose={handleCloseMenu}>
				{routeList
					.filter((item) => item.path !== routeLocation.pathname)
					.map((routeObj) => {
						return (
							routeObj.menuItem && (
								<MenuItem
									key={routeObj.label}
									onClick={() => {
										if (auth.currentUser || routeLocation.pathname === routePath.Home) {
											navigate(routeObj.path)
										} else {
											toast.warning(`Please sign in to see your ${routeObj.label.toLowerCase()}`)
										}

										handleCloseMenu()
									}}>
									<Typography textAlign='center'>{routeObj.label}</Typography>
								</MenuItem>
							)
						)
					})}

				{auth.currentUser ? (
					<MenuItem
						onClick={async () => {
							setIsLoading(true)
							await auth.signOut()
							handleCloseMenu()
							navigate(routePath.HOME)
							setIsLoading(false)
						}}>
						<Typography textAlign='center'>Sign Out</Typography>
					</MenuItem>
				) : (
					<MenuItem
						onClick={() => {
							setShowAuthModal(true)
							handleCloseMenu()
						}}>
						<Typography textAlign='center'>Sign In</Typography>
					</MenuItem>
				)}
			</Menu>
		</Box>
	)
}

export default NavMenu
