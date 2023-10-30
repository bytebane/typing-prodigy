import { ArrowDropUp, DarkMode, FormatColorFill, LightMode } from '@mui/icons-material'
import { Divider, Menu, MenuItem, Paper, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { useState } from 'react'
import Fade from '@mui/material/Fade'
import { useTheme } from '@emotion/react'
import { colorThemes } from '../../theme'
import { BaseContextData } from '../../services/contexts/Base'

const TBtnGroup = ({ toggleDuration, timerDuration, startTyping }) => {
	const theme = useTheme()

	const { toggleThemeMode, themeColorId, setThemeColorId } = BaseContextData()

	const [anchorEl, setAnchorEl] = useState(null)
	const menuOpen = Boolean(anchorEl)
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	return (
		<Paper sx={{ position: 'fixed', bottom: '2%', right: '2.6%', zIndex: 100, display: 'flex', alignItems: 'center' }}>
			{!startTyping && (
				<>
					<Tooltip title='Test Duration: ' placement='left'>
						<ToggleButtonGroup exclusive color='primary' onChange={toggleDuration} value={timerDuration} aria-label='Timer Duration' disabled={startTyping}>
							<ToggleButton value={15}>
								<Tooltip title='15 seconds'>
									<span>15s</span>
								</Tooltip>
							</ToggleButton>
							<ToggleButton value={30}>
								<Tooltip title='30 seconds'>
									<span>30s</span>
								</Tooltip>
							</ToggleButton>
							<ToggleButton value={60}>
								<Tooltip title='1 minute'>
									<span>60s</span>
								</Tooltip>
							</ToggleButton>
							<ToggleButton value={180}>
								<Tooltip title='3 minutes'>
									<span>180s</span>
								</Tooltip>
							</ToggleButton>
						</ToggleButtonGroup>
					</Tooltip>
					<Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />
				</>
			)}

			<Tooltip title='Pick a Theme'>
				<ToggleButton value={1} aria-label='select theme' aria-controls={menuOpen ? 'fade-menu' : undefined} aria-haspopup='true' aria-expanded={menuOpen ? 'true' : undefined} onClick={handleMenuOpen}>
					<FormatColorFill color='secondary' />
					<ArrowDropUp color='secondary' />
				</ToggleButton>
			</Tooltip>
			<Menu
				id='fade-menu'
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleMenuClose}
				TransitionComponent={Fade}
				sx={{ marginTop: '-3.75rem', marginLeft: '0.75rem' }}>
				{colorThemes.map((cPalette, index) => {
					return (
						<MenuItem
							key={index}
							onClick={() => {
								setThemeColorId(index)
								handleMenuClose()
							}}>
							<FormatColorFill sx={{ color: cPalette.secondary[500] }} />
						</MenuItem>
					)
				})}
				<MenuItem
					onClick={() => {
						if (themeColorId === colorThemes.length - 1) return handleMenuClose()

						toggleThemeMode()
						handleMenuClose()
					}}>
					{theme.palette.mode === 'light' ? <DarkMode color='secondary' /> : <LightMode color='secondary' />}
				</MenuItem>
			</Menu>
		</Paper>
	)
}

export default TBtnGroup
