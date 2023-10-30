import { Button, Typography } from '@mui/material'
import { InputBox, StyledLabel, StyledForm, PasswordBox, AuthOptions } from '../../components'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { BaseContextData } from '../../services/contexts/Base'

const SignIn = ({ handleForgotPassword }) => {
	const { setIsLoading } = BaseContextData()

	const handleSignin = async (e) => {
		e.preventDefault()
		const email = event.target.email.value
		const password = event.target.password.value

		// Validate email and password
		if (!email || !password) return toast.error('Please enter email and password')
		if (password.length < 6) return toast.error('Password should be more than 6 characters')

		setIsLoading(true)

		await toast.promise(signInWithEmailAndPassword(auth, email, password), {
			pending: 'Signing in...',
			success: 'Successfully signed in!',
			error: {
				render({ data }) {
					return data.code.split('/')[1]
				},
			},
		})
		setIsLoading(false)
	}

	return (
		<StyledForm onSubmit={handleSignin}>
			<StyledLabel>
				Email Id :
				<InputBox type='email' name='email' placeholder='Enter your email address' />
			</StyledLabel>
			<StyledLabel>
				Password :
				<PasswordBox signin />
			</StyledLabel>
			<Typography sx={{ mb: -2, mt: -2, width: '100%', textAlign: 'right' }}>
				Forgot Password?
				<Button variant='text' onClick={handleForgotPassword} sx={{ textDecoration: 'underline', color: 'text.secondary', textTransform: 'none' }}>
					Click Here
				</Button>
			</Typography>
			<AuthOptions signin />
		</StyledForm>
	)
}

export default SignIn
