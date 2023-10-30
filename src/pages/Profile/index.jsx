import { Avatar, Box, Container, Typography, IconButton, Button } from '@mui/material'
import { useState } from 'react'
import { Edit } from '@mui/icons-material'
import { auth } from '../../services/firebase'
import { AuthOptions, InputBox, PasswordBox, StyledForm, StyledLabel } from '../../components'

import { updatePassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { BaseContextData } from '../../services/contexts/Base'

const Profile = () => {
	const [editMode, setEditMode] = useState(false)

	const { isUserAuthenticated, setIsLoading } = BaseContextData()

	const handleSubmitForm = async (event) => {
		event.preventDefault()

		if (!editMode) {
			setEditMode(true)
		} else {
			setIsLoading(true)
			const name = event.target.name.value.trim()
			// const email = event.target.email.value.trim()
			const password = event.target.password.value
			const confirmPassword = event.target.confirmPassword.value

			if (name !== auth.currentUser.displayName && name !== '') {
				await updateProfile(auth.currentUser, {
					displayName: name,
				})
					.then(() => {
						toast.success('User Name Updated')
					})
					.catch(() => {
						toast.error('Something went wrong')
					})
			}
			// if (email !== auth.currentUser.email && email !== '') {
			// 	await updateEmail(auth.currentUser, email)
			// 		.then(() => {
			// 			toast.success('User Email Updated')
			// 		})
			// 		.catch((e) => {
			// 			toast.error(e.code ?? e.message ?? 'Something went wrong')
			// 		})
			// }
			if (password !== '') {
				if (confirmPassword === '') return toast.error('Please Re-Enter password')
				if (password.length < 6) return toast.error('Password should be more than 6 characters')
				if (password !== confirmPassword) return toast.error('Passwords do not match')

				await updatePassword(auth.currentUser, password)
					.then(() => {
						toast.success('New Password Updated')
					})
					.catch((e) => {
						toast.error(e.code ?? e.message ?? 'Something went wrong')
					})
			}

			setIsLoading(false)
			setEditMode(false)
		}
	}

	return (
		isUserAuthenticated && (
			<Container sx={{ my: 2, width: '100%', height: 'calc(100% - 100px)', overflow: 'auto' }}>
				<StyledForm onSubmit={handleSubmitForm}>
					<div style={{ position: 'relative' }}>
						<Avatar src={'https://robohash.org/' + auth.currentUser.displayName} sx={{ width: { xs: 200, md: 300 }, height: { xs: 200, md: 300 }, my: 2 }} />
						{editMode && (
							<IconButton sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '90%' }} onClick={() => toast.info('Whats the rush? You already got a cool Robo DP !')}>
								<Edit sx={{ width: '30%', height: '30' }} />
							</IconButton>
						)}
					</div>
					{!editMode ? (
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 1, width: '100%' }}>
							<Typography variant='h4' align='center' component='h4'>
								{auth.currentUser.displayName}
							</Typography>
							<Typography variant='h5' align='center' component='h5'>
								{auth.currentUser.email}
							</Typography>
							<Typography variant='body1' align='center' component='h6'>
								{'Joined On - '}
								<Typography component={'span'} variant='body1' color={'secondary'}>
									{format(new Date(auth.currentUser.metadata.creationTime), 'Pp')}
								</Typography>
							</Typography>
							<Typography variant='body1' align='center' component='h6'>
								{'Last Signed In - '}
								<Typography component={'span'} variant='body1' color={'secondary'}>
									{format(new Date(auth.currentUser.metadata.lastSignInTime), 'Pp')}
								</Typography>
							</Typography>
						</Box>
					) : (
						<>
							<StyledLabel>
								User Name :
								<InputBox type='text' name='name' defaultValue={auth.currentUser.displayName} placeholder='Enter new User Name' />
							</StyledLabel>
							<StyledLabel>
								Email Id :
								<InputBox disabled type='email' name='email' defaultValue={auth.currentUser.email} placeholder='Enter new email address' />
							</StyledLabel>
							<StyledLabel>
								New Password :
								<PasswordBox placeholder='Enter new password ' />
							</StyledLabel>
							<StyledLabel>
								Confirm Password :
								<PasswordBox repeat placeholder='Re-enter the password' />
							</StyledLabel>
						</>
					)}

					{!editMode ? (
						<Button type='submit' variant='outlined' fullWidth={editMode}>
							{editMode ? 'Update' : 'Edit Profile'}
						</Button>
					) : (
						<AuthOptions resetPassword />
					)}
				</StyledForm>
			</Container>
		)
	)
}

export default Profile
