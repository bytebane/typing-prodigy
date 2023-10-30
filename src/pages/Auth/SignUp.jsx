import { toast } from 'react-toastify'
import { InputBox, StyledLabel, StyledForm, PasswordBox, AuthOptions } from '../../components'
import { auth } from '../../services/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { BaseContextData } from '../../services/contexts/Base'

const SignUp = () => {
	const { setIsLoading } = BaseContextData()

	const handleSignup = async (event) => {
		event.preventDefault()

		const name = event.target.name.value.trim()
		const email = event.target.email.value.trim()
		const password = event.target.password.value
		const confirmPassword = event.target.confirmPassword.value

		// Validate
		if (!name || !email || !password || !confirmPassword) return toast.error('All fields are Mandatory')
		if (password !== confirmPassword) return toast.error('Passwords do not match')
		if (password.length < 6) return toast.error('Password should be more than 6 characters')
		// if (name && name.split(' ').length < 2) return toast.error('Please enter full name')

		setIsLoading(true)

		await toast
			.promise(
				createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
					//* Set user name
					await updateProfile(userCredential.user, {
						displayName: name,
					})
					//* Send email verification
					sendEmailVerification(userCredential.user).then(() => {
						toast.success('Verification email sent!', {
							autoClose: 5000,
						})
					})
					return userCredential.user
				}),
				{
					pending: 'Creating account...',
					success: 'Successfully signed up!',
					error: {
						render({ data }) {
							// When the promise reject, "data"(only data will work) will contain the error
							return data.code.split('/')[1]
						},
					},
				}
			)
			.catch((error) => {
				toast.error(error.message, {
					autoClose: 5000,
				})
			})

		setIsLoading(false)

		// Clear the form
		event.target.reset()
	}

	return (
		<StyledForm onSubmit={handleSignup}>
			<StyledLabel>
				User Name :
				<InputBox type='text' name='name' placeholder='Enter User Name' />
			</StyledLabel>
			<StyledLabel>
				Email Id :
				<InputBox type='email' name='email' placeholder='Enter your email address' />
			</StyledLabel>
			<StyledLabel>
				Password :
				<PasswordBox placeholder='Create a password' autoComplete='new-password' id='new-password' aria-label='create-password' aria-describedby='create-password' />
			</StyledLabel>
			<StyledLabel>
				Confirm Password :
				<PasswordBox repeat placeholder='Re-enter the password' aria-label='repeat-new-password' aria-describedby='repeat-new-password' />
			</StyledLabel>
			<AuthOptions />
		</StyledForm>
	)
}

export default SignUp
