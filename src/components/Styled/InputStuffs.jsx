import styled from '@emotion/styled'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, InputAdornment, OutlinedInput, Tooltip } from '@mui/material'
import { useState } from 'react'

export const InputBox = styled(OutlinedInput)(({ width }) => ({
	display: 'flex',
	width: width ?? '74%',
	height: '40px',
}))

export const StyledLabel = styled('label')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(2),
	fontSize: theme.typography.body1.fontSize,
	fontWeight: 700,
	whiteSpace: 'nowrap',
	justifyContent: 'space-between',
}))

export const StyledForm = styled('form')(() => ({
	width: '100%',
	maxWidth: '600px',
	marginLeft: 'auto',
	marginRight: 'auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '20px',
	gap: '20px',
}))

export const StyledButton = styled(Button)(({ width }) => ({
	width: width ?? '100%',
	height: '40px',
}))

export const PasswordBox = ({ repeat = false, signin = false, placeholder }) => {
	const [isPassVisible, setIsPassVisible] = useState(false)

	const handleClickShowPassword = () => setIsPassVisible((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	return (
		<InputBox
			type={isPassVisible ? 'text' : 'password'}
			name={repeat ? 'confirmPassword' : 'password'}
			placeholder={placeholder ?? 'Enter your password'}
			autoComplete={signin ? 'current-password' : 'new-password'}
			id={signin ? 'current-password' : 'new-password'}
			aria-label={repeat ? 'repeat-password' : 'new-password'}
			aria-describedby={repeat ? 'repeat-password' : 'new-password'}
			endAdornment={
				<InputAdornment position='end'>
					<Tooltip title={isPassVisible ? 'Hide Password' : 'Show Password'}>
						<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
							{isPassVisible ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</Tooltip>
				</InputAdornment>
			}
		/>
	)
}
