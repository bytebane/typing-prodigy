import { Box, CircularProgress, alpha, styled } from '@mui/material'

const StyledProgress = styled(CircularProgress)(() => ({
	position: 'fixed',
	top: '50%',
	left: '50%',
}))

const CircleLoader = () => {
	return (
		<Box sx={{ width: '100%', height: '100%', position: 'absolute', zIndex: 99999, background: alpha('#000', 0.6) }}>
			<StyledProgress size={60} />
		</Box>
	)
}

export default CircleLoader
