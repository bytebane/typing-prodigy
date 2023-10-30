import { IconButton, Modal, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { ModalBox } from '../../components'
import ForgotPass from './ForgotPass'
import { Close } from '@mui/icons-material'
import { BaseContextData } from '../../services/contexts/Base'

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div role='tabpanel' hidden={value !== index} {...other}>
			{value === index && <>{children}</>}
		</div>
	)
}

const AuthModal = () => {
	const { showAuthModal, setShowAuthModal } = BaseContextData()

	const [tabIndex, setTabIndex] = useState(0)

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue)
	}

	const [showFPassword, setShowFPassWord] = useState(false)

	const fPasswordTabChange = () => {
		setShowFPassWord((show) => !show)
	}

	return (
		<Modal tabIndex={0} open={showAuthModal} onClose={() => setShowAuthModal(false)} aria-labelledby='Authentication Box'>
			<ModalBox paddingTop={'.5rem'}>
				{showFPassword ? (
					<ForgotPass handleGoBack={fPasswordTabChange} />
				) : (
					<>
						<Tabs value={tabIndex} onChange={handleTabChange} textColor='primary' indicatorColor='secondary' variant='fullWidth'>
							<Tab sx={{ fontSize: 15 }} label='Sign In' tabIndex={0} />
							<Tab sx={{ fontSize: 15 }} label='Sign Up' tabIndex={1} />
						</Tabs>
						<CustomTabPanel value={tabIndex} index={0}>
							<SignIn handleForgotPassword={fPasswordTabChange} />
						</CustomTabPanel>
						<CustomTabPanel value={tabIndex} index={1}>
							<SignUp />
						</CustomTabPanel>
					</>
				)}
				<IconButton sx={{ position: 'absolute', top: '0', right: '0' }} onClick={() => setShowAuthModal(false)}>
					<Close />
				</IconButton>
			</ModalBox>
		</Modal>
	)
}

export default AuthModal
