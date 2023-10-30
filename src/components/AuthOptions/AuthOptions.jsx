import { FacebookOutlined, GitHub, Google } from '@mui/icons-material'
import { Box, IconButton, useTheme } from '@mui/material'
import { StyledButton } from '../Styled/InputStuffs'
import { BaseContextData } from '../../services/contexts/Base'

const AuthOptions = ({ signin, resetPassword, handleGithub, handleFacebook, handleGoogle }) => {
	const { isAuthLoading } = BaseContextData()
	const theme = useTheme()
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
			{resetPassword ? (
				<>
					<StyledButton variant='outlined' width='50%' type='reset'>
						Reset
					</StyledButton>
					<StyledButton variant='contained' width='50%' type='submit'>
						Submit
					</StyledButton>
				</>
			) : (
				<>
					<Box sx={{ width: '50%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderRadius: '4px', border: `1px solid ${theme.palette.secondary.main}` }}>
						<IconButton onClick={handleFacebook}>
							<FacebookOutlined color='secondary' />
						</IconButton>
						<IconButton onClick={handleGithub}>
							<GitHub color='secondary' />
						</IconButton>
						<IconButton onClick={handleGoogle}>
							<Google color='secondary' />
						</IconButton>
					</Box>
					{signin ? (
						<StyledButton variant='contained' width='50%' type='submit'>
							{isAuthLoading ? 'Signing In' : 'Sign In'}
						</StyledButton>
					) : (
						<StyledButton variant='contained' width='50%' type='submit'>
							{isAuthLoading ? 'Signing Up' : 'Sign Up'}
						</StyledButton>
					)}
				</>
			)}
		</div>
	)
}

export default AuthOptions
