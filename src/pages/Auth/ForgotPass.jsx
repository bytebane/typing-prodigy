import { AuthOptions, InputBox, StyledForm, StyledLabel } from '../../components'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../services/firebase'

const ForgotPass = ({ handleGoBack }) => {
	const handleResetPassword = async (e) => {
		e.preventDefault()
		const email = event.target.email.value
		if (!email) return toast.error('Please enter email')

		// Send Email
		toast.loading('Sending Email...', {
			toastId: 'sendEmail',
		})
		try {
			await sendPasswordResetEmail(auth, email)
			toast.update('sendEmail', {
				render: 'Follow the link in your email to reset your password',
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				toastId: 'sendEmail',
				closeButton: true,
			})
			handleGoBack()
		} catch (error) {
			toast.update('sendEmail', {
				render: error.message,
				type: 'error',
				isLoading: false,
				autoClose: 2000,
				toastId: 'sendEmail',
				closeButton: true,
			})
		}
	}
	return (
		<>
			<Tooltip title='Go Back'>
				<IconButton sx={{ position: 'absolute', top: 15, left: 20 }} onClick={handleGoBack}>
					<ArrowBack />
				</IconButton>
			</Tooltip>
			<Typography align='center' variant='h4' sx={{ mt: 1 }}>
				Forgot Password
			</Typography>
			<StyledForm onSubmit={handleResetPassword}>
				<StyledLabel>
					<InputBox width='100%' type='email' name='email' placeholder='Enter your email address' />
				</StyledLabel>
				<AuthOptions resetPassword />
			</StyledForm>
		</>
	)
}

export default ForgotPass
