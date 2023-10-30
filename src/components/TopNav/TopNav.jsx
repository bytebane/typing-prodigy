import { AppBar, Box, Container, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import React, { Suspense, useContext } from 'react'
import { AppIconBlack, AppIconWhite } from '../../assets'
import CircleLoader from '../Styled/CircleLoader'

import NavMenu from '../Menu/Menu'
import { auth } from '../../services/firebase'
import { useLocation } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { routePath } from '../../utils'
import { TimerContext } from '../../services/contexts/TimerContext/timerContext'

const AuthModal = React.lazy(() => import('./../../pages/Auth/'))

const TopNav = () => {
	const routeLocation = useLocation()

	const theme = useTheme()

	const timerConData = useContext(TimerContext)

	return (
		<>
			<Suspense fallback={<CircleLoader />}>{!auth.currentUser && <AuthModal />}</Suspense>
			<AppBar component={'nav'} sx={{ position: 'sticky', top: 0, height: '64px' }}>
				<Container>
					<Toolbar disableGutters>
						{routeLocation.pathname !== routePath.HOME && (
							<IconButton
								onClick={() => {
									// ? To reset Typing if for any reason it was running
									timerConData.setIsTypingFinished(false)

									window.history.back()
								}}>
								<ArrowBack />
							</IconButton>
						)}
						<Box
							component={'a'}
							href='/'
							sx={{
								mr: 2,
								// flexGrow: 1,
								marginRight: 'auto',
								display: 'flex',
								alignItems: 'center',
								color: 'inherit',
								textDecoration: 'none',
							}}>
							<img src={theme.palette.mode === 'light' ? AppIconBlack : AppIconWhite} alt='App Icon' height={62} width={62} />
							<Typography
								variant='h4'
								component={'h1'}
								sx={{
									display: { xs: 'none', md: 'block' },
									fontFamily: ['Fira Code', 'monospace'].join(','),
									fontWeight: 700,
									letterSpacing: '.2rem',
									color: 'inherit',
								}}>
								{'<Typing Prodigy/>'}
							</Typography>
						</Box>
						<NavMenu />
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}

export default TopNav
